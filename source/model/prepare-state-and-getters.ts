
import {ShopperState, CartItem, ShopperGetters} from "../interfaces.js"

const price = (value: number) => `\$${value.toFixed(2)} CAD`

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
		get cartPrice() {
			return price(getters.cartValue)
		},
		get cartQuantity() {
			return (() => {
				let sum = 0
				for (const item of getters.itemsInCart) sum += item.quantity
				return sum
			})()
		},
		getUnitPrice(item: CartItem) {
			return price(item.product.value)
		},
		getLinePrice(item: CartItem) {
			return price(item.product.value * item.quantity)
		}
	}

	return {state, getters}
}
