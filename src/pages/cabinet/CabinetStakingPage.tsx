import React, { useState } from 'react';
import classNames from "classnames";
import StakingForm from "../../components/StakingForm";

const CabinetStakingPage = () => {
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
                <StakingForm />
            </div>
        </>
    )
}

export default CabinetStakingPage;
