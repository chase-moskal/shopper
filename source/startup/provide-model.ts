
import {ShopperModel} from "../interfaces.js"
import {ShopperComponent} from "./shopper-component.js"

export function provideModel<T extends typeof ShopperComponent>(
	model: ShopperModel,
	C: T
): T {
	C.model = model
	return C
}
