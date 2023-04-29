import * as crnc from "crnc";
import { ShopperConfig } from "../interfaces.js";
export declare function setupCrnc(config: ShopperConfig): {
    currencyConverter: crnc.CurrencyConverter;
    components: {
        CrncPrice: import("crnc/x/framework/component-types.js").Mixin<typeof crnc.CrncPrice, import("crnc/x/framework/mixins/mixin-context.js").WithContext<crnc.PriceContext>>;
    };
};
