import React from 'react';
import { SWAP_URL } from "../utils/const";

interface IAfterPresaleProps {
}

interface IAfterPresaleState {
}

class AfterPresale extends React.Component<IAfterPresaleProps, IAfterPresaleState> {
    render() {
        return (
            <main className="main">
                <section className="intro-section">
                    <div className="container">
                        <div className="intro">
                            <div className="intro__wrap">
                                <h1 className="main-title">Yield Generation.<br />Hold and Earn.</h1>
                                <div className="intro__footer">
                                    <a className="btn secondary" target='_blank' href="https://t.me/polyreflect">Telegram</a>
                                    <a className="btn primary js-open-swap" target='_blank' href={SWAP_URL}>Swap</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default AfterPresale;