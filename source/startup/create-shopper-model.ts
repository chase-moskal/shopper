
import {makeReader} from "../toolbox/pubsub.js"
import {ShopperOptions, ShopperModel, CartItem, ShopperState, ShopifyResults} from "../interfaces.js"

export function makeShopperState() {
	
}

export function createShopperModel() {

	//
	// create shopper state object
	//

	const state: ShopperState = {
		error: "",
		catalog: [],
		itemsInCart: [],
		cartValue: 0,
		cartPrice: "",
		cartQuantity: 0
	}

	const {publishStateUpdate, reader} = makeReader(state)

	const updateState = () => {
		state.itemsInCart = state.catalog.filter(item => item.quantity > 0)
		state.cartValue = state.itemsInCart.reduce(
			(subtotal: number, item: CartItem) =>
				subtotal + (item.product.value * item.quantity),
			0
		)
		state.cartPrice = `\$${state.cartValue.toFixed(2)} CAD`
		state.cartQuantity = (() => {
			let sum = 0
			for (const item of state.itemsInCart) sum += item.quantity
			return sum
		})()
		publishStateUpdate()
	}

	const updateCatalog = ({products, collectionIds}: ShopifyResults) => {
		state.catalog = products.map(product => ({
			product,
			quantity: 0,
			quantityMax: 5,
			quantityMin: 1,
		}))
		updateState()
	}

	const updateError = (errorMessage: string) => {
		state.error = errorMessage
		state.catalog = []
		updateState()
	}

	//
	// cart actions
	//

	function action<T extends (...args: any[]) => any>(handler: T): T {
		return <T>(() => {
			const result = handler()
			updateState()
			return result
		})
	}

	const addToCart = action((item: CartItem) => {
		item.quantity = item.quantity < 1
			? 1
			: item.quantity
	})

	const clearCart = action(() => {
		for (const item of state.catalog) {
			item.quantity = 0
		}
	})

	return {
		updateError,
		updateCatalog,
		model: {
			reader,
			addToCart,
			clearCart,
		}
	}
}
