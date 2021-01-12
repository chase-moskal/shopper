import { LitElement } from "lit-element";
import { ShopperModel, ShopperState } from "../interfaces.js";
declare const _unsubscribe: unique symbol;
export declare class ShopperComponent extends LitElement {
    static model: ShopperModel;
    private [_unsubscribe];
    model: ShopperModel;
    shopperUpdate(state: ShopperState, model: ShopperModel): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export {};
