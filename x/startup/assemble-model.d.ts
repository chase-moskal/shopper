import { ShopperModel, ShopperAssemblyOptions } from "../interfaces.js";
export declare function assembleModel({ mock, cartStorage, shopifyDomain, defaultQuantityMax, shopifyStorefrontAccessToken, }: ShopperAssemblyOptions): {
    model: ShopperModel;
    loadCatalog(): Promise<void>;
    refreshCartStorage: () => Promise<void>;
};
