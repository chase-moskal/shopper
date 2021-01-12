import { ShopperState, ShopperModel } from "../interfaces.js";
import { LoadableComponent } from "../framework/loadable-component.js";
declare const ShopperCart_base: typeof LoadableComponent;
export declare class ShopperCart extends ShopperCart_base {
    static get styles(): (CSSStyleSheet | import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    ["checkout-in-same-window"]: boolean;
    onFirstAdd: () => void;
    private _lastQuantity;
    shopperUpdate(state: ShopperState, { getters }: ShopperModel): void;
    renderReady(): import("lit-element").TemplateResult;
    private _handleCheckoutButtonClick;
    private _renderCartTitle;
    private _renderCartLineItems;
    private _renderCartItem;
}
export {};
