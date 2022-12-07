import React, { useState } from 'react';
import CabinetSidebar from "../components/CabinetSidebar";
import classNames from "classnames";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import CabinetStakingPage from "./cabinet/CabinetStakingPage";
import CabinetFarmingPage from "./cabinet/CabinetFarmingPage";
import CabinetRoadmapPage from "./cabinet/CabinetRoadmapPage";
import { truncateAddress } from "../utils/utilities";
import { useInjection } from "inversify-react";
import { WalletStore } from "../stores";
import { observer } from "mobx-react";
import Modals from "../components/Modals";

const CabinetPage = observer(() => {
    const walletStore = useInjection(WalletStore);

    const [ showModal, setShowModal ] = useState<'connect'>('connect');

    return (
        <>
            <header className="header header_lk">
                <div className="container">
                    <img src={require('../images/logo.png')} alt="Logo" />
                    {walletStore.connected ? (
                        <div className="balance js-open-walet">
                            <div className="balance__body">
                                <div className="balance__btn" onClick={() => walletStore.resetWallet()}>
                                    <span/><span/>
                                </div>
                                <div className="balance__status">
                                    <div className="balance__img">
                                        <img src={require('../images/user-icon.png')} alt="" />
                                    </div>
                                    <span className="balance__id">{truncateAddress(walletStore.account)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='connect'>
                            <a className="btn primary" onClick={() => setShowModal('connect')}>Connect Wallet</a>
                        </div>
                    )}
                </div>
            </header>
            <main className="main">
                <section className="lk-section">
                    <CabinetSidebar />
                    <div className="lk-content">
                        <Switch>
                            <Route exact path='/cabinet'><Redirect to='/cabinet/stacking' /></Route>
                            <Route path='/cabinet/stacking' component={CabinetStakingPage} />
                            <Route path='/cabinet/farming' component={CabinetFarmingPage} />
                            <Route path='/cabinet/roadmap' component={CabinetRoadmapPage} />
                        </Switch>
                    </div>
                </section>
            </main>
            <Modals visibleModal={showModal} hideModals={() => walletStore.connected && setShowModal(undefined)} permanentConnect />
        </>
    )
});

export default CabinetPage;
