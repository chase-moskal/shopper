import { ShopperModel } from "../interfaces.js";
import { ShopperComponent } from "./shopper-component.js";
export declare function wireModelToComponents(model: ShopperModel, components: {
    [key: string]: typeof ShopperComponent;
}): {
    [key: string]: typeof ShopperComponent;
};
