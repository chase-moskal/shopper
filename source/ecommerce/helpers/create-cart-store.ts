
import {OmniStorage} from "omnistorage"
import {ProductEvaluator} from "../ecommerce-interfaces"
import {ProductStore, CurrencyControlStore, CartStore, CartItemStore} from "../../stores"

/**
 * Create a cart model populated by cart items
 */
export function createCartStore({productStores, evaluator, omniStorage, currencyControlStore}: {
	productStores: ProductStore[]
	omniStorage: OmniStorage
	evaluator: ProductEvaluator
	currencyControlStore: CurrencyControlStore
}) {
	return new CartStore({
		omniStorage,
		currencyControlStore,
		itemCatalog: productStores.map(productStore => {

			// run product evaluator
			const {
				quantityMin,
				quantityMax,
				precision,
				attributes
			} = evaluator(productStore)

			// set product properties
			productStore.setPrecision(precision)
			productStore.setAttributes(attributes)

			// create the cart item
			return new CartItemStore({
				productStore,
				currencyControlStore,
				quantityMin,
				quantityMax
			})
		})
	})
}
