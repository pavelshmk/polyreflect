import React from 'react';
import { Link, Router } from "react-router-dom";
import { observer } from "mobx-react";
import { resolve } from "inversify-react";
import { WalletStore } from "../stores";
import classNames from "classnames";

interface ILayoutProps {
    presale?: boolean;
}

interface ILayoutState {
    burger: boolean;
}

@observer
class Layout extends React.Component<ILayoutProps, ILayoutState> {
    @resolve(WalletStore)
    declare protected readonly walletStore: WalletStore;

    state: ILayoutState = {
        burger: false,
    }

    render() {
        const { presale } = this.props;
        const { burger } = this.state;

        return (
            <>
                {!presale && (
                    <header className="header">
                        <div className="container">
                            <img src={require('../images/logo.png')} alt="Logo"/>
                            <nav className={classNames('nav', { active: burger })}>
                                <ul>
                                    <li><Link to="/whitepaper">Whitepaper</Link></li>
                                    <li><a href="https://discord.gg/UcPWXgJw" target='_blank'>Discord</a></li>
                                    <li><a href="https://twitter.com/polyreflect" target='_blank'>Twitter</a></li>
                                </ul>
                            </nav>
                            <div className={classNames('burger', { active: burger })}><span/><span/><span/></div>
                        </div>
                    </header>
                )}
                <main className="main">
                    {this.props.children}
                    <section className="tokenomics-section">
                        <div className="container">
                            <h2 className="section-title">Tokenomics</h2>
                            <p className="base-text">
                                Total: 10 000 000 000 PRF<br />
                                Presale: 5 000 000 000 PRF<br />
                                LP: 4 500 000 000 PRF<br />
                                Dev Tokens: 500 000 000 PRF<br />
                                Reflection Fee: 1% per transaction
                            </p>
                        </div>
                    </section>
                    <section className="yield-section">
                        <div className="container">
                            <h2 className="section-title">Passive Yield <br /> Generation</h2>
                            <p className="base-text">PRF takes 1% fee from every transaction and disperse it among all
                                tokenholders.</p>
                            <p className="base-text"> Holders don't even need to stake. Just HODL and GAIN</p>
                        </div>
                    </section>
                    <section className="rules-section">
                        <img className="abs-img" src={require('../images/bott-sect.svg')} alt="" />
                        <div className="container">
                            <h2 className="section-title">Presale rules</h2>
                            <p className="base-text">Presale will be issued by smart-contract, source code verified on blockexplorer</p>
                            <p className="base-text">Presale time is 24 hours after start</p>
                            <p className="base-text">Soft cap is 250 000 MATIC tokens</p>
                            <p className="base-text">Hard cap is 625 000 MATIC tokens overall and 2 500 MATIC per wallet</p>
                            <p className="base-text">Ratio: 8000 PRF per MATIC</p>
                            <p className="base-text">100% unsold tokens will be burn after presale</p>
                            <p className="base-text">Refund will be completed during token disperse</p>
                            <p className="base-text">More info in <Link to="/whitepaper">Whitepaper</Link></p>
                        </div>
                    </section>
                </main>
                <footer className="footer">
                    <div className="container">
                        <div className="footer-row">
                            <div className="footer-col">
                                <h3 className="footer-title">LINKS</h3>
                                <div className="footer-nav">
                                    <ul>
                                        <li><a target='_blank' href="https://polygon.technology/">Polygon</a></li>
                                        <li><a target='_blank' href="https://explorer-mainnet.maticvigil.com/">Blocks explorer</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-col">
                                <h3 className="footer-title">SOCIAL</h3>
                                <div className="footer-nav">
                                    <ul>
                                        <li><a target='_blank' href="https://github.com/polyref/polyreflect">Github</a></li>
                                        <li><a target='_blank' href="https://t.me/polyreflect">Telegram</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        )
    }
}

export default Layout;
