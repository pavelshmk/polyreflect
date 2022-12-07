import React from 'react';
import { DateTime } from "luxon";
import { resolve } from "inversify-react";
import { Clock, WalletStore } from "../stores";
import { observer } from "mobx-react";
import { padLeft, truncateAddress } from "../utils/utilities";
import Modals from "../components/Modals";
import ProgressBar from "../components/ProgressBar";
import classNames from "classnames";
import { Link } from "react-router-dom";

interface IPresaleProps {
    presaleEnd: DateTime;
}

interface IPresaleState {
    showModal?: 'connect' | 'presale';
    burger: boolean;
}

@observer
class Presale extends React.Component<IPresaleProps, IPresaleState> {
    @resolve(Clock)
    declare protected readonly clock: Clock;
    @resolve(WalletStore)
    declare protected readonly walletStore: WalletStore;

    state: IPresaleState = {
        burger: false,
    };

    render() {
        const { showModal, burger } = this.state;
        const diff = this.props.presaleEnd.diff(this.clock.getTime()).shiftTo('days', 'hours', 'minutes', 'seconds', 'milliseconds');

        return (
            <>
                <header className="header">
                    <div className="container">
                        <img src={require('../images/logo.png')} alt="Logo" />
                        <nav className={classNames('nav', { active: burger })}>
                            <ul>
                                <li><Link to="/whitepaper">Whitepaper</Link></li>
                                <li><a href="https://discord.gg/UcPWXgJw" target='_blank'>Discord</a></li>
                                <li><a href="https://twitter.com/polyreflect" target='_blank'>Twitter</a></li>
                            </ul>
                        </nav>
                        {this.walletStore.connected ? (
                            <div className="balance js-open-walet">
                                <div className="balance__body">
                                    <div className="balance__btn" onClick={() => this.walletStore.resetWallet()}>
                                        <span/><span/>
                                    </div>
                                    <div className="balance__status">
                                        <div className="balance__img">
                                            <img src={require('../images/user-icon.png')} alt="" />
                                        </div>
                                        <span className="balance__id">{truncateAddress(this.walletStore.account)}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='connect'>
                                <a className="btn primary" onClick={() => this.setState({ showModal: 'connect' })}>Connect Wallet</a>
                            </div>
                        )}
                        <div className={classNames('burger', { active: burger })} onClick={() => this.setState({ burger: !burger })}><span/><span/><span/></div>
                    </div>
                </header>
                <main className="main">
                    <section className="intro-section">
                        <div className="container">
                            <div className="intro">
                                <div className="intro__wrap">
                                    <p className="base-text">Until pre-sale end:</p>
                                    <h1 className="counter">
                                        {diff.days > 0 && `${padLeft(diff.days)}d `}
                                        {(diff.days > 0 || diff.hours > 0) && `${padLeft(diff.hours)}h `}
                                        {(diff.days > 0 || diff.hours > 0 || diff.minutes > 0) && `${padLeft(diff.minutes)}m `}
                                        {(diff.days > 0 || diff.hours > 0 || diff.minutes > 0 || diff.seconds > 0) && `${padLeft(diff.seconds)}s`}
                                    </h1>
                                    <ProgressBar />
                                    <p className="base-text">Polygon is a protocol and a framework for building and
                                        connecting Ethereum-compatible blockchain networks</p>
                                    <button disabled={!this.walletStore.connected} className="btn primary" onClick={() => this.setState({ showModal: 'presale' })}>Presale</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Modals visibleModal={showModal} hideModals={() => this.setState({ showModal: undefined })} />
            </>
        )
    }
}

export default Presale;