
import {LitElement, html, css, property} from "lit-element"

import {CartItem} from "../ecommerce/cart-item.js"
import {ShopifyAdapter} from "../ecommerce/shopify-adapter.js"
import {ShopperProduct} from "./shopper-product.js"

import {Product} from "../interfaces.js"
import {ShopperButton} from "./shopper-button.js"

export class ShopperCart extends LitElement {
	@property({type: Object}) cartButton: ShopperButton
	@property({type: Object}) itemCatalog: CartItem[] = []
	@property({type: Object}) shopifyAdapter: ShopifyAdapter

	@property({type: String}) ["shopify-domain"]: string
	@property({type: String}) ["shopify-collection-id"]: string
	@property({type: String}) ["shopify-storefront-access-token"]: string

	get itemsInCart() {
		return this.itemCatalog.filter(item => item.quantity > 0)
	}

	get value(): number {
		const reducer = (subtotal: number, item: CartItem) =>
			subtotal + (item.product.value * item.quantity)
		return this.itemsInCart.reduce(reducer, 0)
	}

	get price(): string {
		const {value} = this
		return `\$${value.toFixed(2)} CAD`
	}

	get quantity() {
		let sum = 0
		for (const item of this.itemsInCart) sum += item.quantity
		return sum
	}

	private _updateSubscriptions: (() => void)[] = []

	subscribeUpdates(subscription: () => void) {
		this._updateSubscriptions.push(subscription)
	}

	unsubscribeUpdates(subscription: () => void) {
		this._updateSubscriptions = this._updateSubscriptions
			.filter(sub => sub !== subscription)
	}

	firstUpdated() {
		this._maybeCreateShopifyAdapter()
	}

	update() {
		this.cartButton.numeral = this.quantity
		for (const subscription of this._updateSubscriptions) subscription()
	}

	generateProductDisplay(item: CartItem) {
		const productDisplay = <ShopperProduct>document.createElement("product-display")
		productDisplay.cart = this
		productDisplay.cartItem = item
		return productDisplay
	}

	generateProductList(items: CartItem[]) {
		const div = <HTMLDivElement>document.createElement("div")

		for (const item of items) {
			const productDisplay = this.generateProductDisplay(item)
			div.appendChild(productDisplay)
		}

		return div
	}

	static get styles() {
		return css`
			* {
				box-sizing: border-box;
			}
			:host {
				
			}
		`
	}

	async checkout() {
		console.log("mock checkout", this.itemsInCart)
	}

	private _maybeCreateShopifyAdapter() {
		const domain = this["shopify-domain"]
		const storefrontAccessToken = this["shopify-storefront-access-token"]
		const collectionId = this["shopify-collection-id"]
		if (domain && storefrontAccessToken) {
			const shopifyAdapter = new ShopifyAdapter({
				domain,
				storefrontAccessToken
			})
			if (collectionId) this._loadCollection(collectionId)
			this.shopifyAdapter = shopifyAdapter
		}
	}

	private async _loadCollection(collectionId: string): Promise<CartItem[]> {
		const products = await this.shopifyAdapter.getProductsInCollection(collectionId)
		this._ingestProductsAsCartItems(products)
		return this.itemCatalog
	}

	private _ingestProductsAsCartItems(products: Product[]) {
		for (const product of products) {
			const item = new CartItem({
				cart: this,
				product,
				quantity: 0,
				quantityMax: 5,
				quantityMin: 1
			})
			this.itemCatalog.push(item)
		}
	}

	private _renderCartTitle() {
		const {quantity} = this
		return html`
			<h1>
				<span>Shopping Cart</span>
				<span>– ${
					quantity === 0
						? "empty"
						: `${quantity} item${quantity === 1
							? ""
							: "s"}`
				}</span>
			</h1>
		`
	}

	private _renderCartItem(item: CartItem) {
		const handleQuantityInputChange = (event: Event) => {
			const input = <HTMLInputElement>event.target
			let value = parseInt(input.value)
			if (value < item.quantityMin) value = item.quantityMin
			if (value > item.quantityMax) value = item.quantityMax
			input.value = value.toString()
			item.quantity = value ? value : 0
		}
		return html`
			<li class="cart-item-display">
				<button
					class="item-remove-button"
					@click=${() => item.quantity = 0}
					title="Remove item">
						X
				</button>
				<input
					class="item-quantity"
					type="number"
					.value=${item.quantity}
					min=${item.quantityMin}
					max=${item.quantityMax}
					@change=${handleQuantityInputChange}
					@keyup=${handleQuantityInputChange}
					@mouseup=${handleQuantityInputChange}
					@click=${handleQuantityInputChange}
					@blur=${handleQuantityInputChange}
					/>
				<div class="item-title">${item.product.title}</div>
				<div class="item-price pricevalue">
					${item.subtotalPrice}
				</div>
			</li>
		`
	}

	render() {
		if (!this.shopifyAdapter) return html`-`
		const {itemsInCart} = this
		return html`
			<div class="cart-panel">
				${this._renderCartTitle()}
				<div class="cart-manipulator">
					<ol class="cart-item-list cart-grid">
						${itemsInCart.map(item => this._renderCartItem(item))}
					</ol>
				</div>
				<div class="cart-calculated-results"></div>
				<div class="cart-checkout"></div>
			</div>
		`
	}
}
