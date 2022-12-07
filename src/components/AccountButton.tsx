import React, { useState } from 'react';
import { observer } from "mobx-react";
import { truncateAddress } from "../utils/utilities";
import { useInjection } from "inversify-react";
import { WalletStore } from "../stores";
import Modals from "./Modals";

const AccountButton = observer(() => {
    const walletStore = useInjection(WalletStore);

    const [ showModal, setShowModal ] = useState<'connect'>();

    return (
        <>
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
            <Modals visibleModal={showModal} hideModals={() => setShowModal(undefined)} />
        </>
    );
});

export default AccountButton;
