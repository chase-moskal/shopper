import { TemplateResult } from "lit";
import { ShopperState, CartItem, ShopperModel } from "../interfaces.js";
import { LoadableComponent } from "../framework/loadable-component.js";
declare const ShopperProduct_base: typeof LoadableComponent;
export declare class ShopperProduct extends ShopperProduct_base {
    cartItem: CartItem;
    ["gid"]: string;
    ["uid"]: string;
    ["link"]: string;
    ["href"]: string;
    ["sale"]: string;
    ["image-size"]: string;
    ["in-cart"]: boolean;
    ["show-image"]: boolean;
    ["out-of-stock"]: boolean;
    static get styles(): (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    get shopifyId(): string;
    shopperUpdate(state: ShopperState, { getters }: ShopperModel): void;
    private _handleAddToCart;
    renderReady(): TemplateResult<1>;
}
export {};
