import { ShopperState, ShopperModel } from "../interfaces.js";
import { ShopperComponent } from "../framework/shopper-component.js";
export declare class ShopperButton extends ShopperComponent {
    numeral: number;
    shopperUpdate(state: ShopperState, { getters }: ShopperModel): void;
    static get styles(): import("lit-element").CSSResult;
    render(): import("lit-element").TemplateResult;
}
