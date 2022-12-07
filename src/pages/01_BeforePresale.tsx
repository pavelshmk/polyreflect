import React from 'react';
import { observer } from "mobx-react";
import { resolve } from "inversify-react";
import { Clock } from "../stores";
import { DateTime } from "luxon";
import { padLeft } from "../utils/utilities";

interface IBeforePresaleProps {
    presaleStart: DateTime;
}

interface IBeforePresaleState {
}

@observer
class BeforePresale extends React.Component<IBeforePresaleProps, IBeforePresaleState> {
    @resolve(Clock)
    declare protected readonly clock: Clock;

    state: IBeforePresaleState = {
    }

    render() {
        const diff = this.props.presaleStart.diff(this.clock.getTime()).shiftTo('days', 'hours', 'minutes', 'seconds', 'milliseconds');

        return (
            <section className="intro-section">
                <div className="container">
                    <div className="intro">
                        <div className="intro__wrap">
                            <p className="base-text">Until pre-sale start:</p>
                            <h1 className="counter">
                                {diff.days > 0 && `${padLeft(diff.days)}d `}
                                {(diff.days > 0 || diff.hours > 0) && `${padLeft(diff.hours)}h `}
                                {(diff.days > 0 || diff.hours > 0 || diff.minutes > 0) && `${padLeft(diff.minutes)}m `}
                                {(diff.days > 0 || diff.hours > 0 || diff.minutes > 0 || diff.seconds > 0) && `${padLeft(diff.seconds)}s`}
                            </h1>
                            <p className="base-text">Polygon is a protocol and a framework for building and
                                connecting Ethereum-compatible blockchain networks</p>
                            <a className="btn secondary" target='_blank' href="https://t.me/polyreflect">Telegram</a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default BeforePresale;