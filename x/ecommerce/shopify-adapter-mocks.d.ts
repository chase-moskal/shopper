import { ShopifyAdapter } from "./shopify-adapter.js";
import { ShopifyResults } from "../interfaces.js";
export declare class MockAdapter extends ShopifyAdapter {
    constructor();
}
export declare class MockPassingShopifyAdapter extends MockAdapter {
    fetchEverything(): Promise<ShopifyResults>;
    checkout(): Promise<string>;
}
export declare class MockFailingShopifyAdapter extends MockAdapter {
    fetchEverything(): Promise<ShopifyResults>;
    checkout(): Promise<string>;
}
export declare function prepSlowAdapter<T extends new (...args: any[]) => MockAdapter>({ ms, Adapter, }: {
    Adapter: T;
    ms: number;
}): T;
