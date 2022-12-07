import { toBNJS } from "./utilities";

export const PRESALE_ADDRESS = '0xDD16c500f9199707dE6b914D0fF04c8EB4FE98D8';
export const TOKEN_ADDRESS = '0x42dd039590Db5739A2810c05cD1Cb5fAc3F34Ba6';
export const DEPLOYER_ADDRESS = '0x45BD24368B6cb4aA38f0740D0922B666594f51AE';
export const STAKING_ADDRESS = '0x563423DAdFa6216e86cC785cc9c1b126ecaC90Fe';
export const SWAP_URL = `https://quickswap.exchange/#/swap?outputCurrency=${TOKEN_ADDRESS}`
export const SOFT_CAP = toBNJS('250000')
export const HARD_CAP = toBNJS('625000');
export const TOKENS_FOR_MATIC = toBNJS('8000');
export const MATIC_CAP = toBNJS('5e9');
export const MAX_UINT256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export const CHAIN_ID = 137;
export const RPC_URL = 'https://rpc-mainnet.maticvigil.com';

export const WALLETS = {
    metamask: {
        color: '#F6851B',
        icon: require('../images/w1.png'),
        name: 'MetaMask',
    },
    walletconnect: {
        color: '#6db3fd',
        icon: require('../images/w2.png'),
        name: 'WalletConnect',
    },
    coinbase: {
        color: '#fff',
        icon: require('../images/w3.png'),
        name: 'CoinBase',
    }
}

export const CHAIN_PARAMETERS = {
    chainId: '0x89',
    chainName: 'Polygon',
    nativeCurrency: {
        name: 'MATIC Token',
        symbol: 'MATIC',
        decimals: 18,
    },
    rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
    blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com'],
};
