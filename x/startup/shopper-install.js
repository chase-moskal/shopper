var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { currencies as defaultCurrencies } from "crnc/x/ecommerce/currencies.js";
import { parseConfig } from "./parse-config.js";
import { assembleModel } from "./assemble-model.js";
import { wireCartToMenuDisplay } from "./wire-cart-to-menu-display.js";
import { installPriceDisplaySystem } from "./install-price-display-system.js";
import { ShopperCart } from "../components/shopper-cart.js";
import { ShopperButton } from "../components/shopper-button.js";
import { ShopperProduct } from "../components/shopper-product.js";
import { ShopperCollection } from "../components/shopper-collection.js";
import { QuantityInput } from "../components/quantity-input/quantity-input.js";
import { select } from "../toolbox/select.js";
import { SimpleDataStore } from "../toolbox/simple-data-store.js";
import { createCartStorage } from "../model/create-cart-storage.js";
import { createCurrencyStorage } from "../model/create-currency-storage.js";
import { dashify, registerComponents } from "../toolbox/register-components.js";
import { wireModelToComponents } from "../framework/wire-model-to-components.js";
export function shopperInstall({ 
// parse shopper config
config = parseConfig(select("shopper-config")), 
// cart storage mechanism
cartStorage = createCartStorage({
    key: "shopper-cart",
    dataStore: new SimpleDataStore({ storage: localStorage })
}), 
// currency preference storage
currencyStorage = createCurrencyStorage({
    key: "shopper-currency",
    dataStore: new SimpleDataStore({ storage: localStorage })
}), } = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ratesUrl, baseCurrency } = config;
        // assemble the shopper model
        const { model, loadCatalog } = assembleModel(Object.assign(Object.assign({}, config), { cartStorage }));
        // wire the model to the components, and register those components
        registerComponents(Object.assign({ QuantityInput }, wireModelToComponents(model, {
            ShopperCart,
            ShopperButton,
            ShopperProduct,
            ShopperCollection,
        })));
        // figure out which available currencies are configured
        const installCurrencyConversions = !!config.currencies
            ? () => __awaiter(this, void 0, void 0, function* () {
                const codes = config.currencies
                    .split(",")
                    .map(code => code.trim())
                    .map(code => code.toUpperCase());
                const currencies = {};
                for (const code of codes) {
                    const currency = defaultCurrencies[code];
                    if (!currency)
                        throw new Error(`unknown currency "${code}"`);
                    currencies[code] = defaultCurrencies[code];
                }
                yield installPriceDisplaySystem({
                    ratesUrl,
                    currencies,
                    baseCurrency,
                    currencyStorage,
                });
            })
            : () => __awaiter(this, void 0, void 0, function* () {
                yield installPriceDisplaySystem({
                    ratesUrl,
                    baseCurrency,
                    currencyStorage,
                });
            });
        // do a bunch of concurrent stuff
        yield Promise.all([
            // begin loading the catalog from shopify
            loadCatalog()
                // specify how the cart interacts with the menu system
                .then(() => wireCartToMenuDisplay({
                cartSelector: dashify(ShopperCart.name)
            })),
            // download exchange rates and set up currency conversions
            installCurrencyConversions()
        ]);
    });
}
//# sourceMappingURL=shopper-install.js.map