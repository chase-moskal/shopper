
import {ShopifyAdapter} from "./shopify-adapter.js"
import {CartPanel} from "../components/cart-panel.js"
import {CartButton} from "../components/cart-button.js"
import {ShopperWranglerOptions, CartItem} from "../interfaces.js"

export class ShopperWrangler {
	private _cartPanel: CartPanel
	private _cartButton: CartButton
	private _itemCatalog: CartItem[] = []
	private _shopifyAdapter: ShopifyAdapter

	constructor(options: ShopperWranglerOptions) {
		this._cartPanel = options.cartPanel
		this._cartButton = options.cartButton
		this._shopifyAdapter = options.shopifyAdapter

		// attach this wrangler to the cart panel
		this._cartPanel.shopperWrangler = this
	}

	set itemCatalog(items: CartItem[]) {
		this._itemCatalog = items
		this.update()
	}

	get itemCatalog() {
		// TODO maybe deep freeze this?
		return this._itemCatalog
	}

	get itemsInCart() {
		return this._itemCatalog.filter(item => item.quantity > 0)
	}

	get value(): number {
		const reducer = (subtotal: number, item: CartItem) =>
			subtotal + (item.product.value * item.quantity)
		return this.itemsInCart.reduce(reducer, 0)
	}

	get price(): string {
		const {value} = this
		return `\$${value} CAD`
	}

	getItemPrice(item: CartItem): string {
		const value = item.product.value * item.quantity
		return `\$${value} CAD`
	}

	setQuantity(cartItem: CartItem, quantity: number) {
		cartItem.quantity = quantity
		this.update()
	}

	clear() {
		for (const item of this._itemCatalog) item.quantity = 0
		this.update()
	}

	update() {
		this._cartPanel.requestUpdate()
		this._cartButton.requestUpdate()
	}

	async checkout() {
		console.log("mock checkout", this.itemsInCart)
	}

	async loadCatalog(collectionId: string): Promise<CartItem[]> {
		const products = await this._shopifyAdapter.getProductsInCollection(collectionId)
		this.itemCatalog = products.map(product => ({
			product,
			quantity: 0,
			quantityMin: 1,
			quantityMax: 5
		}))
		return this.itemCatalog
	}
}
