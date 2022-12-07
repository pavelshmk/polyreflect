import React from 'react';
import ProgressBar from "./ProgressBar";
import classNames from "classnames";
import { resolve } from "inversify-react";
import { WalletStore } from "../stores";
import { toBNJS } from "../utils/utilities";
import { PRESALE_ADDRESS, TOKENS_FOR_MATIC } from "../utils/const";
import { JsonRpcSigner } from "@ethersproject/providers/src.ts/json-rpc-provider";
import { toast } from "react-toastify";

interface IModalsProps {
    visibleModal?: 'connect' | 'presale';
    hideModals: () => any;
    permanentConnect?: boolean;
}

interface IModalsState {
    inValue: string;
    loading: boolean;
}

class Modals extends React.Component<IModalsProps, IModalsState> {
    @resolve(WalletStore)
    declare protected readonly walletStore: WalletStore;

    state: IModalsState = {
        inValue: '1',
        loading: false,
    }

    connect = async (provider: 'injected') => {
        await this.walletStore.connect(provider) && this.props.hideModals();
    }

    onSwap = async (e: React.FormEvent) => {
        e.preventDefault();
        this.setState({ loading: true });
        try {
            const tx = await this.walletStore.web3.eth.sendTransaction({
                to: PRESALE_ADDRESS,
                from: this.walletStore.account,
                value: `0x${toBNJS(this.state.inValue).times('1e18').toString(16)}`,
            });
            await this.walletStore.loadBalance();
            await this.walletStore.loadTokensLeft();
        } catch (e) {
            console.log(e);
            toast.error('An error has occurred while sending transaction');
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        const { visibleModal, hideModals, permanentConnect } = this.props;
        const { inValue, loading } = this.state;

        const inValueNum = toBNJS(inValue);

        return (
            <div className={classNames('mask', { active: !!visibleModal })} onClick={() => hideModals()}>
                <div className={classNames('modal', { active: visibleModal === 'presale' })} onClick={e => e.stopPropagation()}>
                    <div className="modal__wrap">
                        <div className="modal__head">
                            <div className="swap-wrap">
                                <div className="currency">
                                    <div className="currency__wrap">
                                        <div className="currency__icon">
                                            <img src={require('../images/currency.png')} alt="" />
                                        </div>
                                        <span className="currency__name">MATIC</span>
                                    </div>
                                </div>
                                <button className="swap-btn" type="button">
                                    <img src={require('../images/icon_change.svg')} alt="" />
                                </button>
                                <div className="currency">
                                    <div className="currency__wrap">
                                        <div className="currency__icon">
                                            <img src={require('../images/currency.png')} alt="" />
                                        </div>
                                        <span className="currency__name">PRF</span>
                                    </div>
                                </div>
                            </div>
                            <button className="modal__close" type="button" onClick={() => hideModals()}>
                                <img src={require('../images/close.svg')} alt="" />
                            </button>
                        </div>
                        <div className="modal__body">
                            <ProgressBar />
                            <form className="form" onSubmit={this.onSwap}>
                                <div className="form__wrap">
                                    <div className="form__field-wrap">
                                        <div className="form__field-head">
                                            <label className="form__label" htmlFor="">Payment MATIC</label>
                                            <div className="form__info">
                                                <span className="form__balance">Balance {this.walletStore.ethBalance?.toFixed(6)}</span>
                                            </div>
                                        </div>
                                        <div className="form__field">
                                            <input
                                                className="form__input"
                                                type="number"
                                                placeholder="0"
                                                value={inValue}
                                                onChange={e => this.setState({ inValue: e.target.value })}
                                                min={1}
                                                max={2500}
                                            />
                                            <button className="form__max-btn" type="button" onClick={() => this.setState({ inValue: this.walletStore.ethBalance.toString() })}>MAX</button>
                                        </div>
                                    </div>
                                    <div className="form__field-wrap">
                                        <div className="form__field-head">
                                            <label className="form__label" htmlFor="">You get PRF</label>
                                        </div>
                                        <div className="form__field">
                                            <input className="form__input" type="number" placeholder="0" readOnly value={toBNJS(inValue).times(TOKENS_FOR_MATIC).toString()} />
                                        </div>
                                    </div>
                                    <button
                                        className="form__btn btn primary"
                                        type="submit"
                                        disabled={inValueNum.lt(1) || inValueNum.gt(this.walletStore.ethBalance) || loading}
                                    >
                                        Swap
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={classNames('modal', { active: visibleModal === 'connect' })} onClick={e => e.stopPropagation()}>
                    <div className="modal__wrap">
                        <div className="modal__head">
                            <h3 className="modal__title">Connect Wallet</h3>
                            {!permanentConnect && <button className="modal__close js-modal-close" type="button" onClick={() => hideModals()}>
                                <img src={require('../images/close.svg')} alt="" />
                            </button>}
                        </div>
                        <div className="modal__wallet-wrap">
                            <button className="wallet" type="button" onClick={() => this.connect('injected')}>
                                <div className="wallet__wrap">
                                    <span className="wallet__name">MetaMask</span>
                                    <img src={require('../images/w1.png')} alt="" />
                                </div>
                            </button>
                        </div>
                        {!window.ethereum && (
                            <div className="modal__footer">
                                <span>Don’t have a wallet?</span>
                                <a href="https://metamask.io/" target='_blank'>Get a wallet!</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Modals;
