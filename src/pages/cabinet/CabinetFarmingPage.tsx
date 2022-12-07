import React, { useState } from 'react';
import classNames from "classnames";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { WalletStore } from "../../stores";
import PastPool from "../../components/PastPool";
import FarmingForm from "../../components/FarmingForm";

const CabinetFarmingPage = observer(() => {
    const walletStore = useInjection(WalletStore);

    const [ activeTab, setActiveTab ] = useState<'live' | 'finished'>('live');

    if (!walletStore.poolsLoaded) {
        return (
            <div className="loader"><img src={require('../../images/preloader.png')} alt="" /></div>
        )
    }

    return (
        <>
            <div className="lk-content-header">
                <div className="lk-content-header-main">
                    <h1 className="lk-title">Farms</h1>
                    <h3 className="lk-subtitle">Stake Liquidity Pool (LP) tokens to earn.</h3>
                </div>
                <div className="lk-content-header-info">
                    <p>Polygon is a protocol and a framework for building and connecting Ethereum-compatible
                        blockchain networks</p>
                </div>
            </div>
            <div className="lk-content-body">
                <div className="tabs js-tabs">
                    <div className="tabs__nav-wrap">
                        <div className="tabs__scroll">
                            <ul className="tabs__nav">
                                <li className={classNames('tabs__btn', { active: activeTab === 'live' })} onClick={() => setActiveTab('live')}>Live</li>
                                <li className={classNames('tabs__btn', { active: activeTab === 'finished' })} onClick={() => setActiveTab('finished')}>Finished</li>
                            </ul>
                        </div>
                    </div>
                    <div className={classNames('tabs__content', { active: activeTab === 'live' })}>
                        {walletStore.currentPool ? (
                            <FarmingForm />
                        ) : (
                            <p className='tabs__nocontent'>There's no live pool</p>
                        )}
                    </div>
                    <div className={classNames('tabs__content', { active: activeTab === 'finished' })}>
                        {walletStore.pastPools ? (
                            <div className="withdraw-section">
                            <p className="error-text">
                                These pools are no longer distributing rewards. Please unstake your tokens!
                            </p>
                            <div className="withdraw-wrap">
                                {walletStore.pastPools.map((pool, i) => <PastPool key={i} pid={i} pool={pool} />)}
                            </div>
                        </div>
                        ) : (
                            <p className='tabs__nocontent'>There are no finished pools</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
});

export default CabinetFarmingPage;
