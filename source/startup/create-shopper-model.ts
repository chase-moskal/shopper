
import {ShopperOptions, ShopperModel} from "../interfaces.js"
import {CartItem} from "../ecommerce/cart-item.js"

export async function createShopperModel({
	onUpdate,
	shopifyAdapter,
}: ShopperOptions): Promise<ShopperModel> {

	//
	// load shopify catalog
	//

	const results = await shopifyAdapter.fetchEverything()
	console.log("RESULTS!", results)
	const {products, collectionIds} = results
	const catalog: CartItem[] = products.map(product => new CartItem({
		product,
		quantity: 0,
		quantityMax: 5,
		quantityMin: 1,
	}))

	//
	// merge in saved state from storage
	//

	//
	// cart state getters
	//

	const getItemsInCart = () => catalog.filter(item => item.quantity > 0)
	const getCartValue = () => getItemsInCart().reduce(
		(subtotal: number, item: CartItem) =>
			subtotal + (item.product.value * item.quantity),
		0
	)
	const getCartPrice = () => `\$${getCartValue().toFixed(2)} CAD`
	const getCartQuantity = () => {
		let sum = 0
		for (const item of this.itemsInCart) sum += item.quantity
		return sum
	}

	//
	// cart actions
	//

	const addToCart = (item: CartItem) => {
		item.quantity = item.quantity < 1
			? 1
			: item.quantity
	}
	const clearCart = () => {
		for (const item of catalog) {
			item.quantity = 0
		}
	}
	function action<T extends (...args: any[]) => any>(handler: T): T {
		return <T>(() => {
			const result = handler()
			onUpdate()
			return result
		})
	}

	return {
		getCartValue,
		getCartPrice,
		getItemsInCart,
		getCartQuantity,
		addToCart: action(addToCart),
		clearCart: action(clearCart),
	}
}
