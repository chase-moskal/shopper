import { EcommerceDetails, AscertainEcommerceDetailsParams } from "../interfaces.js";
/**
 * Establish some ecommerce-related currency details
 *  - attempt to download rates, and upon failure, avoid currency conversions
 */
export declare function ascertainEcommerceDetails({ currencies, storeBaseCurrency, userDisplayCurrency, cacheLifespan, cacheStorage, cacheStorageKey, }: AscertainEcommerceDetailsParams): Promise<EcommerceDetails>;
