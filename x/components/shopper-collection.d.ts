import { ShopperState, CartItem } from "../interfaces.js";
import { LoadableComponent } from "../framework/loadable-component.js";
declare const ShopperCollection_base: typeof LoadableComponent;
export declare class ShopperCollection extends ShopperCollection_base {
    ["uid"]: string;
    ["all"]: boolean;
    ["show-images"]: boolean;
    items: CartItem[];
    static get styles(): (CSSStyleSheet | import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    shopperUpdate(state: ShopperState): void;
    renderReady(): import("lit-element").TemplateResult;
}
export {};
