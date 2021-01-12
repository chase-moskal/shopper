import { ShopperModel } from "../interfaces.js";
import { ShopperComponent } from "./shopper-component.js";
export declare function provideModel<T extends new (...args: any[]) => ShopperComponent>(model: ShopperModel, C: T): T;
