var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    const checkout = (items) => __awaiter(this, void 0, void 0, function* () { return shopifyAdapter.checkout(items); });
    //
    // create shopper model
    //
    const { state, getters } = prepareStateAndGetters();
    const { reader, update } = makeReader(state);
    const model = {
        reader,
        getters,
        actions: objectMap(prepareActions({ state, checkout, getters, update, defaultQuantityMax }), value => asyncHitch(value, { after: () => __awaiter(this, void 0, void 0, function* () {
                yield cartStorage.saveCart(state.catalog);
                update();
            }) }))
    };
    //
    // return a function to begin loading the catalog
    //
    return {
        model,
        loadCatalog() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const results = yield shopifyAdapter.fetchEverything();
                    yield model.actions.setShopifyResults(results);
                    yield cartStorage.loadCart(state.catalog);
                    update();
                }
                catch (error) {
                    const message = "shopping cart error";
                    model.actions.setError(message);
                    error.message = `${message}: ${error.message}`;
                    console.error(error);
                }
            });
        }
    };
}
//# sourceMappingURL=assemble-model.js.map