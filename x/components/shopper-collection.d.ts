import { ShopperState, CartItem } from "../interfaces.js";
import { LoadableComponent } from "../framework/loadable-component.js";
declare const ShopperCollection_base: typeof LoadableComponent;
export declare class ShopperCollection extends ShopperCollection_base {
    items: CartItem[];
    ["gid"]: string;
    ["uid"]: string;
    ["link"]: string;
    ["all"]: boolean;
    ["image-sizes"]: string;
    ["show-images"]: boolean;
    static get styles(): (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    get shopifyId(): string;
    shopperUpdate(state: ShopperState): void;
    renderReady(): import("lit-html").TemplateResult<1>;
}
export {};
