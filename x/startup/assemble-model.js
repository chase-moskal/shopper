import { prepSlowAdapter, MockFailingShopifyAdapter, MockPassingShopifyAdapter, } from "../ecommerce/shopify-adapter-mocks.js";
import { ShopifyAdapter } from "../ecommerce/shopify-adapter.js";
import { asyncHitch } from "../toolbox/hitch.js";
import { makeReader } from "../toolbox/pubsub.js";
import { objectMap } from "../toolbox/object-map.js";
import { prepareActions } from "../model/prepare-actions.js";
import { prepareStateAndGetters } from "../model/prepare-state-and-getters.js";
export function assembleModel({ mock, cartStorage, shopifyDomain, defaultQuantityMax, shopifyStorefrontAccessToken, }) {
    //
    // setup shopify adapter, mock or real
    //
    const shopifyAdapter = mock !== null
        ? new (prepSlowAdapter({
            ms: 2 * 1000,
            Adapter: mock === "fail"
                ? MockFailingShopifyAdapter
                : MockPassingShopifyAdapter,
        }))
        : new ShopifyAdapter({
            domain: shopifyDomain,
            storefrontAccessToken: shopifyStorefrontAccessToken
        });
    const checkout = async (items) => shopifyAdapter.checkout(items);
    //
    // create shopper model
    //
    const { state, getters } = prepareStateAndGetters();
    const { reader, update } = makeReader(state);
    const model = {
        reader,
        getters,
        actions: objectMap(prepareActions({ state, checkout, getters, update, defaultQuantityMax }), value => asyncHitch(value, { after: async () => {
                await cartStorage.saveCart(state.catalog);
                update();
            } }))
    };
    //
    // return a function to begin loading the catalog
    //
    return {
        model,
        async loadCatalog() {
            try {
                const results = await shopifyAdapter.fetchEverything();
                await model.actions.setShopifyResults(results);
                await cartStorage.loadCart(state.catalog);
                update();
            }
            catch (error) {
                const message = "shopping cart error";
                model.actions.setError(message);
                error.message = `${message}: ${error.message}`;
                console.error(error);
            }
        },
        refreshCartStorage: async () => {
            await cartStorage.loadCart(state.catalog);
            update();
        },
    };
}
//# sourceMappingURL=assemble-model.js.map