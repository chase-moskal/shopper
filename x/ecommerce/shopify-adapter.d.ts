import { CartItem, ShopifyResults, ShopifyAdapterOptions } from "../interfaces.js";
export declare class ShopifyAdapter {
    private _shopifyClient;
    constructor({ domain, storefrontAccessToken }: ShopifyAdapterOptions);
    fetchEverything(): Promise<ShopifyResults>;
    checkout(items: CartItem[]): Promise<string>;
    private _shopifyProductToShopperProduct;
}
