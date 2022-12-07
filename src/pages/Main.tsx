import React from 'react';
import { observer } from "mobx-react";
import { resolve } from "inversify-react";
import { Clock, WalletStore } from "../stores";
import { DateTime } from "luxon";
import BeforePresale from "./01_BeforePresale";
import Presale from "./02_Presale";
import AfterPresale from "./03_AfterPresale";
import Layout from "../components/Layout";

interface IMainProps {
}

interface IMainState {
    loading: boolean;
    presaleStart?: DateTime;
    presaleEnd?: DateTime;
}

@observer
class Main extends React.Component<IMainProps, IMainState> {
    @resolve(Clock)
    declare protected readonly clock: Clock;
    @resolve(WalletStore)
    declare protected readonly walletStore: WalletStore;

    state: IMainState = {
        loading: true,
    }

    async componentDidMount() {
        const presaleContract = this.walletStore.presaleContract;
        this.setState({
            presaleStart: DateTime.fromSeconds(parseInt(await presaleContract.methods._startTime().call())),
            presaleEnd: DateTime.fromSeconds(parseInt(await presaleContract.methods._startTime().call()) + 60 * 60 * 24),
            loading: false,
        })
    }

    render() {
        const { loading, presaleStart, presaleEnd } = this.state;
        const time = this.clock.getTime();

        if (loading) {
            return (
                <Layout>
                    <section className="loader-section">
                        <div className="container">
                            <div className="whitepaper-wrap">
                                <div className="loader"><img src={require('../images/preloader.png')} alt="" /></div>
                            </div>
                        </div>
                    </section>
                </Layout>
            );
        }

        if (time < presaleStart) {
            return (
                <Layout>
                    <BeforePresale presaleStart={presaleStart} />
                </Layout>
            );
        } else if (time >= presaleStart && time < presaleEnd) {
            return (
                <Layout presale>
                    <Presale presaleEnd={presaleEnd} />
                </Layout>
            );
        } else {
            return (
                <Layout>
                    <AfterPresale />
                </Layout>
            );
        }
    }
}

export default Main;