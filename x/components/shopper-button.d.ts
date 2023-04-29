import { ShopperState, ShopperModel } from "../interfaces.js";
import { ShopperComponent } from "../framework/shopper-component.js";
export declare class ShopperButton extends ShopperComponent {
    numeral: number;
    shopperUpdate(state: ShopperState, { getters }: ShopperModel): void;
    static get styles(): import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
