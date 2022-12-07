import React from 'react';
import { Link } from 'react-router-dom';

interface IWhitepaperProps {
}

interface IWhitepaperState {
}

class Whitepaper extends React.Component<IWhitepaperProps, IWhitepaperState> {
    render() {
        return (
            <main className="main">
                <section className="whitepaper-section">
                    <div className="container">
                        <div className="whitepaper-wrap">
                            <div className="whitepaper-img"><img src={require('../images/logo-whitepaper.svg')} alt="" /></div>
                            <h1 className="whitepaper-title">TECHNICAL SPECIFICATION</h1><span
                            className="whitepaper-text">of the</span><Link className="whitepaper-name" to="/"
                                                                        target="_blank">Polyreflect</Link><span
                            className="whitepaper-text">token and pre-sale</span><span
                            className="whitepaper-text">contracts</span><span className="whitepaper-copyright">v.1.0.0 â€“ May, 2021</span>
                        </div>
                        <h2 className="whitepaper-item">Table of contents</h2>
                        <ul className="whitepaper-list">
                            <li><a className="scroll-link" href="#introduction"> <span>1. </span>Introduction</a>
                                <ul>
                                    <li><a className="scroll-link" href="#token-purpose"> <span>1.1.</span>Token purpose</a>
                                    </li>
                                    <li><a className="scroll-link" href="#motivation"> <span>1.2 </span>Motivation and
                                        principles</a></li>
                                </ul>
                            </li>
                            <li><a className="scroll-link" href="#pre-sale"> <span>2. </span>Pre-Sale contract
                                functionality</a>
                                <ul>
                                    <li><a className="scroll-link" href="#general-properties"> <span>2.1 </span>General
                                        properties</a></li>
                                    <li><a className="scroll-link" href="#constants"> <span>2.1.1 </span>Constants</a>
                                    </li>
                                    <li><a className="scroll-link" href="#quickSwap-provision"> <span>2.2 </span>QuickSwap
                                        provision</a></li>
                                    <li><a className="scroll-link" href="#token-minting-two"> <span>2.3 </span>Token
                                        minting</a></li>
                                </ul>
                            </li>
                            <li><a className="scroll-link" href="#token-contract"> <span>3. </span>Token contract
                                functionality</a>
                                <ul>
                                    <li><a className="scroll-link" href="#general-properties"> <span>3.1 </span>General
                                        properties</a></li>
                                    <li><a className="scroll-link" href="#token-minting"> <span>3.1.1</span>Token
                                        minting</a></li>
                                    <li><a className="scroll-link" href="#token-deployment"> <span>3.2 </span>Token
                                        deploymen</a></li>
                                    <li><a className="scroll-link" href="#yield-mechanism"> <span>3.3 </span>Token yield
                                        mechanism</a></li>
                                    <li><a className="scroll-link" href="#token-distribution"> <span>3.4 </span>Pre-sale
                                        token distribution</a></li>
                                </ul>
                            </li>
                            <li><a className="scroll-link" href="#functionality"><span>4.</span>ERC-20 functionality</a>
                            </li>
                            <li><a className="scroll-link" href="#conclusion"><span>5.</span>Conclusion</a></li>
                        </ul>
                        <div className="whitepaper-content typography">
                            <h2 id="introduction">1. Introduction</h2>
                            <p>PRF Token, hereinafter refereed to as Token, is an ERC-20 compliant smart contract
                                designed for deployment on any Ethereum-like blockchain.</p>
                            <p>Token is fairy launched with automatic liquid provision (via own degisned smart
                                contract)</p>
                            <h3 id="token-purpose">1.1. Token purpose</h3>
                            <p>The main purpose of the PRF Token -- passive yield generation: rewarding the holder by
                                splitting fee from every Token transaction.</p>
                            <p>The model of "farming" that used in Token Contract is more stable, much lower risk. There
                                is no minting function in contract so there is no emissions and related inflation, Token
                                amount is constant after pre-sale. No more worrying that someone can mint (or stake)
                                infinity token amount and pull all the liquidity.</p>
                            <p>Token smart contract code is immutable after deployment.</p>
                            <h3 id="motivation">1.2 Motivation and principles</h3>
                            <p>Trusting your money to other people is inherently risky. This glaring lack of traditional
                                financial instruments is the main motivation for blockchain developing. The PRF contract
                                aims to ensure that the user can always fully store and control their PRF tokens, even
                                during various economic activities.</p>
                            <p>The initial minting of PRF, earning interest from fees, and even swapping PRF for other
                                tokens can all be done continuously, without the user's PRF tokens ever being controlled
                                by another person or system. Compare that to the world of banks that you (not) trust and
                                traditional financial managers who are (not) guided by your interests.</p>
                            <p>One very important aspect of owning cryptocurrencies is the ability to trade them safely,
                                easily and quickly when the need arises. After a 24 hours of pre-sale initial liquidity
                                will be provided to QuickSwap (biggest Polygon network fork of <span
                                    className="uniswap">Uniswap <span className="tooltip">We believe Uniswap, the popular and highly regarded Ethereum decentralized exchange (DEX) smart contract.</span></span>),
                                the Pre-Sale contract will automatically, trustlessly and irrevocably upload its MATIC
                                balance to QuickSwap liquidity pool. At least 90% of all MATIC sent by PRF users during
                                Pre-Sale, in turn, will be automatically transferred to QuickSwap under the Pre-Sale
                                contract, along with the number of PRF supplied of equal value.</p>
                            <p>In exchange for this liquidity pool deposit and at the same time, QuickSwap transfers to
                                the PreSale contract the corresponding amount of UNI-V2 liquidity tokens, which have the
                                exclusive right to subsequently withdraw this liquidity pool. The Pre-Sale contract will
                                automatically, immediately and provably destroy these UNI-V2 tokens by transferring them
                                to, so called, the â€œburn addressâ€ <span className="code-blok">(0x0)</span>. In doing so,
                                the PRF contract guarantees that this initial pool of MATIC / PRF liquidity cannot be
                                withdrawn from pool by any person, party, contract or organization.</p>
                            <h2 id="pre-sale">2. Pre-Sale contract functionality</h2>
                            <p>The Pre-Sale contract has several key properties and core functions, outlined in detail
                                in the following sections. Some of the important mathematical calculations and data
                                structures are also presented here. Various example scenarios of user and multi-user
                                activity and contract state evolution are illustrated where appropriate.</p>
                            <h3 id="general-properties">2.1 General properties</h3>
                            <p><strong>Pre-sale contract </strong>at the same time is <strong>PRF token </strong>deployer
                                and owner. In future this type of contract with modifications will be used
                                in <strong>LaunchPad.</strong></p>
                            <p>The contract, once deployed, is immutable. No proxy or delegate contracts are
                                involved.</p>
                            <h3 id="constants">2.1.1 Constants</h3>
                            <p>The total initial supply minted during deployment of PRF Token, as itâ€™s desribed in <a
                                className="scroll-link" href="#token-minting">3.1.1 Section</a></p>
                            <p>This supply will be distributed in ratio:</p>
                            <div className="chart-wrap">
                                <div className="chart">
                                    <div className="chart-item"></div>
                                    <div className="chart-item"></div>
                                </div>
                                <div className="chart-descr">
                                    <div className="chart-row">
                                        <div className="chart-color liquidity"></div>
                                        <span className="chart-text">Pre-sale: 5 000 000 000</span>
                                    </div>
                                    <div className="chart-row">
                                        <div className="chart-color sale"></div>
                                        <span className="chart-text">Liquidity: 4 500 000 000</span>
                                    </div>
                                    <div className="chart-row">
                                        <div className="chart-color team"></div>
                                        <span className="chart-text">Team: 500 000 000</span>
                                    </div>
                                </div>
                            </div>
                            <p>As it described in smart contract constants block:</p>
                            <div className="code-blok one-block"><span>uint256 internal immutable TOKENS_FOR_PRESALE = 5_000_000_000 * 10**_tokenDecimals;</span><span>uint256 internal immutable TOKENS_FOR_LIQUIDITY = 4_500_000_000 * 10**_tokenDecimals;</span><span>uint256 internal immutable TEAM_TOKENS = 500_000_000 * 10**_tokenDecimals;</span>
                            </div>
                            <h3 id="quickSwap-provision">2.1.2 QuickSwap provision</h3>
                            <p>The Pre-Sale contract's <span className="code-blok">endPresale</span> function, executed
                                when pre-sale time is over or Hard Cap reached, will make a call to the QuickSwap
                                factory contract in order to create the QuickSwap PRF/MATIC exchange pair contract.</p>
                            <p>Itâ€™s provided with calling <span className="code-blok">addLiquidityETH</span>over <span
                                className="code-blok">IQuickSwap</span>interface of<span
                                className="code-blok">QUICKSWAP_ROUTER_ADDRESS</span></p>
                            <p>As part of sending the QuickSwap provision PRF and MATIC to the exchange pair contract,
                                a <span className="code-blok">UniswapV2Router</span>contract is used, which internally
                                wraps the MATIC into WMATIC (wrapped MATIC), as is standard in<a
                                    href="https://uniswap.org/docs/v2/" target="_blank">Uniswap V2</a></p>
                            <p>The <span className="code-blok">UniswapV2Router </span>contract returns an amount of
                                UNI-V2 liquidity tokens to the Pre-Sale contract as part of the QuickSwap provision
                                transaction. These UNI-V2 liquidity tokens represent ownership of the liquidity pool the
                                PRF contract just sent in, and carry the sole power to withdraw that liquidity. The PRF
                                contract nor Pre-sale contract has no code or function allowing such a liquidity
                                withdrawal. However, as a further show of the our team's commitment to making PRF a
                                totally trustless system, the Pre-Sale contract will automatically and irrevocably
                                destroy these UNIV2 liquidity tokens upon receipt. This is done by transferring them to
                                a known â€œburn addressâ€, such as <span className="code-blok">0x0</span>.</p>
                            <p>Once the QuickSwap provision is complete, users are free to use QuickSwap's front end to
                                swap PRF into MATIC, and vice-versa. They may also choose to deposit their own liquidity
                                pools of PRF/MATIC in order to earn even more fees from traders.</p>
                            <h3 id="token-minting-two">2.3 Token minting</h3>
                            <p>The minting of new tokens is foreseen and able only during deployment from Pre-Sale
                                contract constructor function as itâ€™s described in <a className="scroll-link"
                                                                                      href="#token-minting">3.1.1
                                    Section</a></p>
                            <h2 id="token-contract">3. Token contract functionality</h2>
                            <h3 id="general-properties">3.1 General properties</h3>
                            <div className="block-text">
                                <span>Token name: PolyReflect</span><span>Token symbol: PRF</span><span>Token decimals: 9</span>
                            </div>
                            <p>Token contract is deployed by <a className="scroll-link" href="#pre-sale">pre-sale
                                contract.</a></p>
                            <p>Maximal supply of token is 10 000 000 000 PRF as described in token contract <span
                                className="code-blok">uint256 private constant _tTotal = 10 * 10**9 * 10**9;</span></p>
                            <h3 id="token-minting">3.1.1 Token minting</h3>
                            <p>Token minted during deployment in constructor function and send to itâ€™s deployer, in this
                                case â€“ Pre-Sale contract. There is no other way to mint a new token.</p>
                            <h3 id="token-deployment">3.2 Token deployment</h3>
                            <p>Deployment process initiated by deployerâ€™s constructor function. During this action token
                                minted and transferred to deployer in order Pre-Sale initial liquidity event.</p>
                            <h3 id="yield-mechanism">3.3 Token yield mechanism</h3>
                            <p>Every transaction that involved PRF token (except burning and team token transfer in
                                pre-sale) taxed by 1% fee and that fee â€œreflectedâ€ to all holders of token depends of
                                their stack.</p>
                            <h3 id="token-distribution">3.4 Pre-sale token distribution</h3>
                            <p>According to previous article, tokens from pre-sale will be taxed and reflected during
                                distribution. Thereby, we provide a linear scale for the price of the token.</p>
                            <p>The first token holders will receive 1% of further pre-sale transactions,
                               the last participant receive only his stack â€“  <span className="uniswap">7920 PRF <span className="tooltip">8000 â€“ 1%</span></span>
                               for each MATIC</p>
                            <h2 id="functionality">4. ERC-20 Functionality</h2>
                            <p>The PRF contract conforms fully with the ERC-20 token standard, as proposed in <a
                                href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md"
                                target="_blank">IEP-20.</a>This is essentially a set of functions that a token contract
                                must implement in order to be an ERC-20 token.</p>
                            <h2 id="conclusion">5. Conclusion</h2>
                            <p>Our team sincerely hopes that our efforts to provide the general public with a trustless,
                                decentralized, interest-bearing instrument will bear fruit, and that PRF will be a great
                                success. But, we can't achieve these goals without the help of the community around
                                us.</p>
                            <p>The Polyreflect project was started not with the intention to profit, but from the desire
                                to create something incredibly useful for the world. We hope this document has made our
                                vision and intentions clear.</p>
                            <p>We welcome any questions, comments, or criticism you may have. We also have some need for
                                various types of contributors to the project.</p>
                            <p>Please join us in <a href="https://t.me/polyreflect" target="_blank">the official
                                Polyreflect Telegram group at t.me/polyreflect</a>and <a
                                href="https://discord.gg/UcPWXgJw" target="_blank">the official PRF Discord server </a>to
                                discuss the Polyreflect project with the founders, developers, supporters, critics, and
                                the rest of the community.</p>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default Whitepaper;
