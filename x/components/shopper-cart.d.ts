import { ShopperState, ShopperModel } from "../interfaces.js";
import { LoadableComponent } from "../framework/loadable-component.js";
export declare class ShopperCart extends LoadableComponent {
    #private;
    static get styles(): (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    ["checkout-in-same-window"]: boolean;
    ["require-terms-checked"]: boolean;
    ["checkout-is-disabled"]: boolean;
    onFirstAdd: () => void;
    private _lastQuantity;
    removeIcon: import("lit-html").TemplateResult<2>;
    updated(): void;
    shopperUpdate(state: ShopperState, { getters }: ShopperModel): void;
    renderReady(): import("lit-html").TemplateResult<1>;
    private _handleCheckoutButtonClick;
    private _renderCartTitle;
    private _renderCartLineItems;
    private _renderCartItem;
}
