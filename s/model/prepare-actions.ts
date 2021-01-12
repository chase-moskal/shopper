
import {
	CartItem,
	ShopperState,
	ShopperActions,
	ShopperGetters,
	ShopifyResults,
} from "../interfaces"

export function prepareActions({
	state,
	update,
	getters,
	checkout,
}: {
	update: () => void
	state: ShopperState
	getters: ShopperGetters
	checkout: (items: CartItem[]) => Promise<string>
}): ShopperActions {

	function zeroAllQuantity() {
		for (const item of state.catalog)
			item.quantity = 0
	}

	return {
		async addToCart(item: CartItem) {
			item.quantity = (item.quantity < 1)
				? 1
				: item.quantity
			state.checkedOut = false
		},

		async setItemQuantity(item: CartItem, quantity: number) {
			item.quantity = quantity
			state.checkedOut = false
		},

		async clearCart() {
			zeroAllQuantity()
			state.checkedOut = false
		},

		async checkout({checkoutInSameWindow}: {checkoutInSameWindow: boolean}) {
			const checkoutLocation: Location = checkoutInSameWindow
				? window.location
				: (() => {
					const checkoutWindow = window.open("", "_blank")
					checkoutWindow.document.write(`loading checkout... if you are experiencing issues, please contact support`)
					return checkoutWindow.location
				})()
			state.checkoutInProgress = true
			update()
			const url = await checkout(getters.itemsInCart)
			state.checkoutInProgress = false
			state.checkedOut = true
			update()
			zeroAllQuantity()
			checkoutLocation.href = url
		},

		async setError(message: string) {
			state.error = message
			state.catalog = []
			state.checkedOut = false
		},

		async setShopifyResults({products}: ShopifyResults) {
			state.catalog = products.map(product => ({
				product,
				quantity: 0,
				quantityMax: 10,
				quantityMin: 1,
			}))
			state.checkedOut = false
		}
	}
}
