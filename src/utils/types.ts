import { JsonProperty, Serializable } from "typescript-json-serializer";
import { DateTime } from "luxon";

const DATETIME_PROPERTY = { onDeserialize: (val: string) => DateTime.fromISO(val) }
const DECIMAL_PROPERTY = { onDeserialize: (val: string) => parseFloat(val) }

export interface TokenInfo {
    idx: number;
    isLP: boolean;
    lpLink?: string;
    tokenAddress: string;
    tileIcon: string;
    primaryIcon: string;
    secondaryIcon?: string;
    symbol: string;
    primarySymbol: string;
    secondarySymbol?: string;
    grouped?: boolean;
}

@Serializable()
class TokenData {
    @JsonProperty(DECIMAL_PROPERTY) token_decimals: number;
    @JsonProperty(DECIMAL_PROPERTY) staked_total: number;
    @JsonProperty(DECIMAL_PROPERTY) vblock_reward: number;
    @JsonProperty(DECIMAL_PROPERTY) daily_roi: number;
    @JsonProperty(DECIMAL_PROPERTY) primary_price_divisor?: number;
    @JsonProperty(DECIMAL_PROPERTY) secondary_price_divisor?: number;
    @JsonProperty(DECIMAL_PROPERTY) part: number;
    @JsonProperty(DECIMAL_PROPERTY) daily_reward: number;
    @JsonProperty(DECIMAL_PROPERTY) token_bnb_price: number;
    @JsonProperty(DECIMAL_PROPERTY) pool_primary_reserve?: number;
    @JsonProperty(DECIMAL_PROPERTY) pool_secondary_reserve?: number;
}

@Serializable()
export class Info {
    @JsonProperty() daily_bnb_blocks: number;
    @JsonProperty(DECIMAL_PROPERTY) bnb_usdt_price: number;
    // @JsonProperty(DECIMAL_PROPERTY) eth_price: number;
    // @JsonProperty(DECIMAL_PROPERTY) btc_price: number;
    @JsonProperty() pool_decimals: number;
    @JsonProperty() daily_vblocks: number;
    @JsonProperty(DECIMAL_PROPERTY) moliq_bnb_price: number;
    @JsonProperty(DECIMAL_PROPERTY) moliq_supply: number;
    @JsonProperty(DECIMAL_PROPERTY) vblock_reward: number;
    @JsonProperty(DECIMAL_PROPERTY) locked_bnb_value: number;
    @JsonProperty({ type: TokenData }) token_data: TokenData[];
}
