
import {makeReader} from "../toolbox/pubsub.js"
import {ShopifyAdapter} from "../ecommerce/shopify-adapter.js"
import {
	CartItem,
	ShopperState,
	ShopperModel,
	ShopifyResults,
} from "../interfaces.js"

export function createShopperModel({shopifyAdapter}: {
	shopifyAdapter: ShopifyAdapter
}) {

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

	const clearCart = () => {
		for (const item of state.catalog) item.quantity = 0
	}

	function action<T extends (...args: any[]) => any>(handler: T): T {
		return <T>((...args: any[]) => {
			const result = handler(...args)
			updateState()
			return result
		})
	}

	const model: ShopperModel = {
		reader,
		checkout: action(
			async({checkoutInSameWindow}: {checkoutInSameWindow: boolean}) => {
				const url = await shopifyAdapter.checkout(state.itemsInCart)
				const checkoutLocation: Location = checkoutInSameWindow
					? window.location
					: (() => {
						const checkoutWindow = window.open("", "_blank")
						checkoutWindow.document.write(`loading checkout... if you are experiencing issues, please email <a href="mailto:suzie@nailcareer.com">suzie@nailcareer.com</a>`)
						return checkoutWindow.location
					})()
				clearCart()
				checkoutLocation.href = url
			}
		),
		addToCart: action(
			(item: CartItem) => {
				item.quantity = item.quantity < 1
					? 1
					: item.quantity
			}
		),
		clearCart: action(clearCart),
	}

	return {
		model,
		updateError: action(
			(errorMessage: string) => {
				state.error = errorMessage
				state.catalog = []
			}
		),
		updateCatalog: action(
			({products}: ShopifyResults) => {
				state.catalog = products.map(product => ({
					product,
					quantity: 0,
					quantityMax: 5,
					quantityMin: 1,
				}))
			}
		),
	}
}
