import { CartStorage, ShopperConfig } from "../interfaces.js";
export interface ShopperInstallOptions {
    config?: ShopperConfig;
    cartStorage?: CartStorage;
}
export declare function setupShopper({ config, cartStorage, }?: ShopperInstallOptions): Promise<void>;
