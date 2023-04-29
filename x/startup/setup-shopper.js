import { parseConfig } from "./parse-config.js";
import { assembleModel } from "./assemble-model.js";
import { wireCartToMenuDisplay } from "./wire-cart-to-menu-display.js";
import { ShopperCart } from "../components/shopper-cart.js";
import { ShopperButton } from "../components/shopper-button.js";
import { ShopperProduct } from "../components/shopper-product.js";
import { ShopperCollection } from "../components/shopper-collection.js";
import { QuantityInput } from "../components/quantity-input/quantity-input.js";
import { setupCrnc } from "./setup-crnc.js";
import { select } from "../toolbox/select.js";
import { SimpleDataStore } from "../toolbox/simple-data-store.js";
import { createCartStorage } from "../model/create-cart-storage.js";
import { dashify, registerComponents } from "../toolbox/register-components.js";
import { wireModelToComponents } from "../framework/wire-model-to-components.js";
export async function setupShopper({ 
// parse shopper config
config = parseConfig(select("shopper-config")), 
// cart storage mechanism
cartStorage = createCartStorage({
    key: "shopper-cart",
    dataStore: new SimpleDataStore({ storage: localStorage })
}), } = {}) {
    // assemble the shopper model
    const { model, loadCatalog, refreshCartStorage } = assembleModel({
        ...config,
        cartStorage
    });
    // listen for localstorage changes
    window.addEventListener("storage", refreshCartStorage);
    // prepare the crnc converter and components
    const crncSetup = setupCrnc(config);
    // wire the model to the components, and register those components
    registerComponents({
        QuantityInput,
        ...wireModelToComponents(model, {
            ShopperCart,
            ShopperButton,
            ShopperProduct,
            ShopperCollection,
        }),
        ...crncSetup.components,
    });
    // do a bunch of concurrent stuff
    await Promise.all([
        // begin loading the catalog from shopify
        loadCatalog()
            // specify how the cart interacts with the menu system
            .then(() => wireCartToMenuDisplay({
            cartSelector: dashify(ShopperCart.name)
        })),
        // wait for crnc exchange rates to download
        crncSetup.currencyConverter.exchangeRatesDownload,
    ]);
}
//# sourceMappingURL=setup-shopper.js.map