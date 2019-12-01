
import {ShopperModel} from "../interfaces.js"
import {provideModel} from "./provide-model.js"
import {ShopperComponent} from "./shopper-component.js"

export function wireModelToComponents(
	model: ShopperModel,
	components: {[key: string]: typeof ShopperComponent}
) {
	const newComponents = {}
	for (const [key, value] of Object.entries(components)) {
		newComponents[key] = provideModel(model, value)
	}
	return newComponents
}
