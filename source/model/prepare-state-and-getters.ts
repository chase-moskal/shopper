
import {ShopperState, CartItem, ShopperGetters} from "../interfaces.js"

export function prepareStateAndGetters() {
	const state: ShopperState = {
		error: "",
		catalog: [],
		checkedOut: false,
		checkoutInProgress: false,
	}

	const getters: ShopperGetters = {
		get itemsInCart() {
			return state.catalog.filter(item => item.quantity > 0)
		},
		get cartValue() {
			return getters.itemsInCart.reduce(
				(subtotal: number, item: CartItem) =>
					subtotal + (item.product.value * item.quantity),
				0
			)
		},
		get cartQuantity() {
			return (() => {
				let sum = 0
				for (const item of getters.itemsInCart) sum += item.quantity
				return sum
			})()
		},
		getUnitValue(item: CartItem) {
			return item.product.value
		},
		getLineValue(item: CartItem) {
			return item.product.value * item.quantity
		}
	}

	return {state, getters}
}
