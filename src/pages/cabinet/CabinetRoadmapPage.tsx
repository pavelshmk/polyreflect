import React from 'react';

const CabinetRoadmapPage = () => {
    return (
        <>
            <div className="lk-content-header">
                <div className="lk-content-header-main">
                    <h1 className="lk-title">Roadmap</h1>
                    <h3 className="lk-subtitle">Our plans for the future</h3>
                </div>
            </div>
            <div className="lk-content-body">
                <div className="lk-road-wrap">
                    <div className="lk-road-line">
                        <div className="lk-road-line-fill"/>
                    </div>
                    <div className="lk-road-content">
                        <div className="lk-road-block active">
                            {/*<div className="lk-road-img"/>*/}
                            <div className="lk-road-info">
                                <span className="lk-road-title">February 2021</span>
                                <p className="lk-road-desc">Concept and Idea - Development begins</p>
                            </div>
                        </div>
                        <div className="lk-road-block active">
                            <div className="lk-road-info">
                                <span className="lk-road-title">April 2021</span>
                                <p className="lk-road-desc">Smart Contract Development</p>
                            </div>
                        </div>
                        <div className="lk-road-block active">
                            <div className="lk-road-info">
                                <span className="lk-road-title">May 2021</span>
                                <p className="lk-road-desc">Pre-sale 1</p>
                            </div>
                        </div>
                        <div className="lk-road-block active">
                            <div className="lk-road-info">
                                <span className="lk-road-title">July 2021</span>
                                <p className="lk-road-desc">Farming update</p>
                            </div>
                        </div>
                        <div className="lk-road-block active">
                            <div className="lk-road-info">
                                <span className="lk-road-title">September 2021</span>
                                <p className="lk-road-desc">Pre-sale 2</p>
                            </div>
                        </div>
                        <div className="lk-road-block">
                            <div className="lk-road-info">
                                <span className="lk-road-title">October 2021</span>
                                <p className="lk-road-desc">Quickswap listing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CabinetRoadmapPage;
