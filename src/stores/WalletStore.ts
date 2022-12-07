import { injectable } from "inversify";
import Web3Modal from 'web3modal';
import { action, makeObservable, observable, runInAction } from "mobx";
import { RootStore } from "./RootStore";
import { toast } from "react-toastify";
import { Info } from "../utils/types";
import ERC20_ABI from "../contracts/erc20.abi.json";
import PRESALE_ABI from "../contracts/presale.abi.json";
import DEPLOYER_ABI from "../contracts/deployer.abi.json";
import STAKING_ABI from "../contracts/staking.abi.json";
import { toBNJS } from "../utils/utilities";
import BN from "bignumber.js";
import Web3 from 'web3';
import { ContractContext as ERC20ContractContext } from "../contracts/erc20";
import { ContractContext as PresaleContractContext } from "../contracts/presale";
import { ContractContext as DeployerContractContext } from "../contracts/deployer";
import { ContractContext as StakingContractContext, PoolInfoResponse } from "../contracts/staking";
import {
    CHAIN_ID,
    CHAIN_PARAMETERS,
    DEPLOYER_ADDRESS,
    PRESALE_ADDRESS,
    RPC_URL, STAKING_ADDRESS,
    TOKEN_ADDRESS,
    TOKENS_FOR_MATIC
} from "../utils/const";
import asyncPool from "tiny-async-pool";
import _ from "lodash";

const web3Modal = new Web3Modal({
    cacheProvider: true,
})

if (window.ethereum)
    window.ethereum.autoRefreshOnNetworkChange = false;

@injectable()
export class WalletStore {
    private rawProvider: any = new Web3.providers.HttpProvider(RPC_URL);
    private loadTokensLeftInterval;

    @observable connected: boolean = false;
    @observable account?: string;
    @observable info?: Info;
    @observable ethBalance?: BN;
    @observable tokensLeft?: string;

    @observable currentPool?: PoolInfoResponse & { pid: string };
    @observable pastPools?: (PoolInfoResponse & { pid: string })[];
    @observable poolsLoaded: boolean = false;

    @observable currentPoolStaking?: PoolInfoResponse & { pid: string };
    @observable pastPoolsStaking?: (PoolInfoResponse & { pid: string })[];
    @observable poolsLoadedStaking: boolean = false;

    public constructor(protected rootStore: RootStore) {
        makeObservable(this);
        this.loadTokensLeft();
        this.loadPools();
        this.loadPoolsStaking();
        this.loadTokensLeftInterval = setInterval(() => this.loadTokensLeft(), 10000);
    }

    loadTokensLeft = async () => {
        const presaleBalance = toBNJS(await this.web3.eth.getBalance(PRESALE_ADDRESS)).div('1e18');
        const soldTokens = presaleBalance.times(TOKENS_FOR_MATIC);
        let tokensLeft = toBNJS('5e9').minus(soldTokens);
        if (tokensLeft.lt(0))
            tokensLeft = toBNJS(0);
        runInAction(() => this.tokensLeft = tokensLeft.toString());
    }

    loadBalance = async () => {
        const balance = toBNJS(await this.web3.eth.getBalance(this.account)).div('1e18');
        runInAction(() => this.ethBalance = balance);
    }

    loadPools = async () => {
        const staking = this.stakingContract;
        const len = parseInt(await staking.methods.poolLength().call());
        const paidOut = parseInt(await staking.methods.paidOut().call());
        const pools = await asyncPool(10, _.range(len).map(i => i.toString()), async pid => ({ pid, ...await staking.methods.poolInfo(pid).call() }));
        const pastPools = [];
        let currentPool;
        for (const pool of pools) {
            if (parseInt(pool.allocPoint) > paidOut) {
                currentPool = pool;
                break;
            }
            pastPools.push(pool);
        }
        runInAction(() => { this.currentPool = currentPool; this.pastPools = pastPools; this.poolsLoaded = true });
    }

    loadPoolsStaking = async () => {
        const staking = this.stakingContract;
        const len = parseInt(await staking.methods.poolLength().call());
        const paidOut = parseInt(await staking.methods.paidOut().call());
        const pools = await asyncPool(10, _.range(len).map(i => i.toString()), async pid => ({ pid, ...await staking.methods.poolInfo(pid).call() }));
        const pastPools = [];
        let currentPool;
        for (const pool of pools) {
            if (parseInt(pool.allocPoint) > paidOut) {
                currentPool = pool;
                break;
            }
            pastPools.push(pool);
        }
        runInAction(() => { this.currentPoolStaking = currentPool; this.pastPoolsStaking = pastPools; this.poolsLoadedStaking = true });
    }

    @action resetWallet = async () => {
        web3Modal.clearCachedProvider();
        localStorage.clear();
        this.connected = false;
    }

    @action async connect(provider: 'injected') {
        if (this.connected)
            return true;

        await this.resetWallet();

        try {
            this.rawProvider = await web3Modal.connectTo(provider);
        } catch (e) {
            toast.error(e);
            console.log(e);
            return false;
        }
        await this.initProvider(provider);
        return true;
    }

    @action async initProvider(provider) {
        let chainId = await this.web3.eth.getChainId();
        if (chainId !== CHAIN_ID) {
            try {
                await this.rawProvider.request({ method: 'wallet_addEthereumChain', params: [CHAIN_PARAMETERS] });
                this.rawProvider = await web3Modal.connectTo(provider);
                chainId = await this.web3.eth.getChainId();
            } catch (e) {
                console.log(e);
            }
        }
        this.rawProvider.on?.('accountsChanged', () => this.resetWallet());
        this.rawProvider.on?.('chainChanged', () => this.resetWallet());

        if (chainId !== CHAIN_ID) {
            toast.error(`Please switch to the Matic network`);
            this.rawProvider = new Web3.providers.HttpProvider(RPC_URL);
            return false;
        }

        const account = (await this.web3.eth.getAccounts())[0];
        runInAction(() => { this.account = account; this.connected = true });
        this.loadBalance();
    }

    get web3(): Web3 {
        return new Web3(this.rawProvider);
    }

    erc20Contract = (address: string) => {
        return new this.web3.eth.Contract(ERC20_ABI as any, address) as unknown as ERC20ContractContext;
    }

    get tokenContract(): ERC20ContractContext {
        return this.erc20Contract(TOKEN_ADDRESS);
    }

    get presaleContract(): PresaleContractContext {
        return new this.web3.eth.Contract(PRESALE_ABI as any, PRESALE_ADDRESS) as unknown as PresaleContractContext;
    }

    get deployerContract(): DeployerContractContext {
        return new this.web3.eth.Contract(DEPLOYER_ABI as any, DEPLOYER_ADDRESS) as unknown as DeployerContractContext;
    }

    get stakingContract(): StakingContractContext {
        return new this.web3.eth.Contract(STAKING_ABI as any, STAKING_ADDRESS) as unknown as StakingContractContext;
    }
}
