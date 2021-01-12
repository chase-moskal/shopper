
import {ShopperModel} from "../interfaces.js"
import {ShopperComponent} from "./shopper-component.js"

export function provideModel<T extends new(...args: any[]) => ShopperComponent>(
	model: ShopperModel,
	C: T
): T {
	return <T>class extends C {
		static model = model
	}
}
