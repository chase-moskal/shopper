import { TemplateResult } from "lit-element";
import { ShopperState, CartItem, ShopperModel } from "../interfaces.js";
import { LoadableComponent } from "../framework/loadable-component.js";
declare const ShopperProduct_base: typeof LoadableComponent;
export declare class ShopperProduct extends ShopperProduct_base {
    ["uid"]: string;
    cartItem: CartItem;
    ["href"]: string;
    ["in-cart"]: boolean;
    ["show-image"]: boolean;
    ["out-of-stock"]: boolean;
    static get styles(): (CSSStyleSheet | import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    shopperUpdate(state: ShopperState, { getters }: ShopperModel): void;
    private _handleAddToCart;
    renderReady(): TemplateResult;
}
export {};
