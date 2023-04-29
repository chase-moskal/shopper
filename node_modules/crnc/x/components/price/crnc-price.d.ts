import { CurrencyConverter } from "../../interfaces.js";
import { Component } from "../../framework/component.js";
export interface PriceContext {
    currencyConverter: CurrencyConverter;
}
declare const CrncPrice_base: import("../../framework/component-types.js").Mixin<typeof Component, import("../../framework/mixins/mixin-context.js").WithContext<PriceContext>>;
export declare class CrncPrice extends CrncPrice_base {
    #private;
    static withContext(context: PriceContext): import("../../framework/component-types.js").Mixin<typeof CrncPrice, import("../../framework/mixins/mixin-context.js").WithContext<PriceContext>>;
    value: number;
    currency: string;
    precision: number;
    comparison: number;
    right: boolean;
    "menu-is-open": boolean;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
