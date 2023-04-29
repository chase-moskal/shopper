import { CrncPrice } from "./price/crnc-price.js";
import { CurrencyConverter } from "../interfaces.js";
export declare function prepareComponents({ currencyConverter }: {
    currencyConverter: CurrencyConverter;
}): {
    CrncPrice: import("../framework/component-types.js").Mixin<typeof CrncPrice, import("../framework/mixins/mixin-context.js").WithContext<import("./price/crnc-price.js").PriceContext>>;
};
