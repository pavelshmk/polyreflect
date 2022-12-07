import React from 'react';
import { toBNJS } from "../utils/utilities";
import { observer } from "mobx-react";
import { resolve } from "inversify-react";
import { WalletStore } from "../stores";
import { HARD_CAP, MATIC_CAP, SOFT_CAP } from "../utils/const";

interface IProgressBarProps {
}

interface IProgressBarState {
}

@observer
class ProgressBar extends React.Component<IProgressBarProps, IProgressBarState> {
    @resolve(WalletStore)
    declare protected readonly walletStore: WalletStore;

    render() {
        const { tokensLeft } = this.walletStore;

        return (
            <>
                <p className="base-text">Tokens left: {tokensLeft}</p>
                <div className="progress">
                    <div className="progress__wrap">
                        <div className="progress__body"/>
                        <div className="progress__bar" style={{ width: typeof tokensLeft !== "undefined" ? `${100 - toBNJS(tokensLeft).div(MATIC_CAP).times(100).toNumber()}%` : '...' }}/>
                    </div>
                    <div className="progress__info" style={{ left: `${SOFT_CAP.div(HARD_CAP).times(100).toNumber()}%` }}>
                        <span className="progress__count">{SOFT_CAP.toString()} MATIC</span>
                        <span className="progress__cap">Soft Cap</span>
                    </div>
                </div>
            </>
        )
    }
}

export default ProgressBar;