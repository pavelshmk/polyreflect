import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import ReactMoment from "react-moment";
import { PoolInfoResponse } from "../contracts/staking";
import { useInjection } from "inversify-react";
import { WalletStore } from "../stores";
import moment, { Moment } from "moment";
import BN from "bignumber.js";
import { toBNJS } from "../utils/utilities";

const PastPool = observer(({ pid, pool }: { pid: number, pool: PoolInfoResponse }) => {
    const walletStore = useInjection(WalletStore);

    const [ endDate, setEndDate ] = useState<Moment>();
    const [ staked, setStaked ] = useState<BN>();
    const [ stakedRaw, setStakedRaw ] = useState<BN>();

    useEffect(() => {
        (async () => {
            const block = await walletStore.web3.eth.getBlock(pool.lastRewardBlock);
            const date = moment.unix(parseInt(block.timestamp as string));
            setEndDate(date);
        })();
    }, []);

    useEffect(() => {
        if (!walletStore.connected)
            return;
        (async () => {
            const staking = walletStore.stakingContract;
            const lp = walletStore.erc20Contract(pool.lpToken);
            const userInfo = await staking.methods.userInfo(pid.toString(), walletStore.account).call();
            const decimals = await lp.methods.decimals().call();
            const stakedRaw = toBNJS(userInfo.amount);
            setStakedRaw(stakedRaw);
            setStaked(stakedRaw.div(10**parseInt(decimals)));
        })();
    }, [walletStore.connected, walletStore.account]);

    const onWithdraw = async () => {
        if (!walletStore.account || !staked.gt(0))
            return;
        await walletStore.stakingContract.methods.withdraw(pid.toFixed(0), stakedRaw.toFixed(0)).send({ from: walletStore.account });
    };

    return (
        <div className="withdraw">
            <div className="withdraw__wrap">
                <div className="withdraw__col">
                    <div className="withdraw__icon">
                        <img src={require('../images/icon-wd-1.svg')} alt=""/>
                        <img src={require('../images/icon-wd-2.svg')} alt=""/>
                    </div>
                    <h6 className="withdraw__name">TOR-USDC</h6>
                </div>
                <div className="withdraw__col">
                    <span className="withdraw__category">Stacked</span>
                    <span className="withdraw__count">{staked?.toFixed(8).replace(/0+$/, '').replace(/\.$/, '')}</span>
                </div>
                <div className="withdraw__col">
                    <span className="withdraw__category">Ended</span>
                    <span className="withdraw__count"><ReactMoment date={endDate} format='L' /></span>
                </div>
                <div className="withdraw__col">
                    {stakedRaw?.gt(0) && <button className="btn primary" type="button" onClick={onWithdraw}>Withdraw</button>}
                </div>
            </div>
        </div>
    )
});

export default PastPool;