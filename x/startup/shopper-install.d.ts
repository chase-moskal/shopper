import { CartStorage, CurrencyStorage, ShopperConfig } from "../interfaces.js";
export interface ShopperInstallOptions {
    config?: ShopperConfig;
    cartStorage?: CartStorage;
    currencyStorage?: CurrencyStorage;
}
export declare function shopperInstall({ config, cartStorage, currencyStorage, }?: ShopperInstallOptions): Promise<void>;
