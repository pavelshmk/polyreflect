import React, { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { WalletStore } from "../stores";
import BN from "bignumber.js";
import { toBNJS } from "../utils/utilities";
import { MAX_UINT256, STAKING_ADDRESS } from "../utils/const";
import classNames from "classnames";
import clsx from "clsx";

const StakingForm = () => {
    const walletStore = useInjection(WalletStore);

    const [ totalInPool, setTotalInPool ] = useState<BN>();
    const [ staked, setStaked ] = useState<BN>();
    const [ pendingReward, setPendingReward ] = useState<BN>();
    const [ balance, setBalance ] = useState<BN>();
    const [ allowance, setAllowance ] = useState<BN>();
    const [ depositValue, setDepositValue ] = useState('');
    const [ refresh, setRefresh ] = useState(0);
    const [ loading, setLoading ] = useState(false);
    const [ complete, setComplete ] = useState(false);

    const currentPool = walletStore.currentPool;

    useEffect(() => {
        if (!walletStore.connected)
            return;
        (async () => {
            const staking = walletStore.stakingContract;
            const erc20 = walletStore.erc20Contract(currentPool.lpToken);
            const decimals = toBNJS(10).pow(await erc20.methods.decimals().call());

            const totalInPool = toBNJS(await erc20.methods.balanceOf(STAKING_ADDRESS).call());
            setTotalInPool(totalInPool.div(decimals));

            const userInfo = await staking.methods.userInfo(currentPool.pid, walletStore.account).call();
            const staked = toBNJS(userInfo.amount).div(decimals);
            setStaked(staked);

            const pendingReward = toBNJS(await staking.methods.pending(currentPool.pid, walletStore.account).call());
            setPendingReward(pendingReward);

            const balance = toBNJS(await erc20.methods.balanceOf(walletStore.account).call()).div(decimals);
            setBalance(balance);

            const allowance = toBNJS(await erc20.methods.allowance(walletStore.account, STAKING_ADDRESS).call()).div(decimals);
            setAllowance(allowance);
        })();
    }, [walletStore.account, walletStore.connected, refresh]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const erc20 = walletStore.erc20Contract(currentPool.lpToken);
            const decimals = toBNJS(10).pow(await erc20.methods.decimals().call());

            if (allowance.lt(depositValue)) {
                await erc20.methods.approve(STAKING_ADDRESS, MAX_UINT256).send({ from: walletStore.account });
                setAllowance(toBNJS(MAX_UINT256));
                return;
            }

            await walletStore.stakingContract.methods.deposit(currentPool.pid, toBNJS(depositValue).times(decimals).toString()).send({ from: walletStore.account });
            setRefresh(Math.random());
            setComplete(true);
            setTimeout(() => setComplete(false), 2000);
        } finally {
            setLoading(false);
        }
    }

    let buttonError;
    if (balance?.lt(depositValue))
        buttonError = 'Insufficient funds';
    else if (toBNJS(depositValue).lte(0))
        buttonError = 'Invalid amount';

    return (
        <div className="form-wrap">
            <form className="deposit-form" onSubmit={onSubmit}>
                <div className="deposit-form__wrap">
                    <div className="exchange-info">
                        <div className="exchange-info__board">
                            <div className="exchange-info__row">
                                <div className="exchange-info__col">
                                    <p className="exchange-info__count">
                                        {staked?.toFixed(6).replace(/\.?0+$/, '')}
                                        {/*<span className="exchange-info__text">≈ $754.00</span>*/}
                                    </p>
                                    <span className="exchange-info__text">PRF Stacked</span>
                                </div>
                                <div className="exchange-info__col">
                                    <span className="exchange-info__count">{totalInPool?.toFixed(6).replace(/\.?0+$/, '')}</span>
                                    <span className="exchange-info__text">Total PRF in pool</span>
                                </div>
                            </div>
                            <div className="exchange-info__row">
                                <div className="exchange-info__col">
                                    <span className="exchange-info__count">{pendingReward?.toFixed(6).replace(/\.?0+$/, '')}</span>
                                    <span className="exchange-info__text">Pending reward</span>
                                </div>
                                <div className="exchange-info__col">
                                    <span className="exchange-info__text">APY</span>
                                    <span className="exchange-info__apy">180%</span>
                                </div>
                            </div>
                        </div>
                        <div className="exchange-info__icon">
                            <img src={require('../images/icon-curr.svg')} alt=""/>
                        </div>
                    </div>
                    <div className="deposit-form__row">
                        <div className="deposit-form__col">
                            <div className="deposit-form__icon">
                                <img src={require('../images/icon-curr.svg')} alt=""/>
                            </div>
                            <h6 className="deposit-form__title">PRF</h6>
                            <button className="btn secondary" type="button" onClick={() => setDepositValue(balance?.toFixed(18).replace(/\.?0+$/, ''))}>max</button>
                        </div>
                        <div className="deposit-form__col">
                            <div className="deposit-form__field">
                                <label className="deposit-form__label" htmlFor="deposit">Balance {balance?.toFixed(6).replace(/\.?0+$/, '')}</label>
                                <input className="deposit-form__input" type="text" placeholder="0" name="deposit"  value={depositValue} onChange={e => setDepositValue(e.target.value)}/>
                                <span className="deposit-form__label">≈ $0.00</span>
                            </div>
                        </div>
                    </div>
                    {
                        buttonError ? (
                            <button className="btn primary" type="button" disabled>{buttonError}</button>
                        ) : (
                            <button className={classNames('btn primary', { complete, pending: loading })} type="submit" disabled={loading}>{complete ? 'Complete' : loading ? 'Pending' : allowance?.lt(depositValue) ? 'Approve' : 'Deposit'}</button>
                        )
                    }
                </div>
            </form>
        </div>
    )
};

export default StakingForm;
