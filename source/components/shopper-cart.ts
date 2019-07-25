
import {LitElement, html, css, property} from "lit-element"

import {select} from "../toolbox/select.js"
import {CartItem} from "../ecommerce/cart-item.js"
import {ShopifyAdapter} from "../ecommerce/shopify-adapter.js"

import {ShopperCollection} from "./shopper-collection.js"
import {ShopperButton} from "./shopper-button.js"
import {ShopperProduct} from "./shopper-product.js"

export class ShopperCart extends LitElement {

	//
	// CONFIGURATION
	//

	@property({type: String}) ["shopify-domain"]: string
	@property({type: String}) ["shopify-collection-id"]: string
	@property({type: String}) ["shopify-storefront-access-token"]: string

	@property({type: Object}) shopifyAdapter: ShopifyAdapter

	@property({type: Object}) selectors = {
		buttons: () => select<ShopperButton>("shopper-button"),
		products: () => select<ShopperProduct>("shopper-product"),
		collections: () => select<ShopperCollection>("shopper-collection"),
	}

	//
	// PRIVATE FIELDS
	//

	private _collectionIds: string[]
	@property({type: Object}) private _catalog: CartItem[] = []

	//
	// PUBLIC ACCESSORS
	//

	get catalog() { return this._catalog }
	get collections() { return [...this._collectionIds] }
	get itemsInCart() { return this._catalog.filter(item => item.quantity > 0) }

	get value(): number {
		const reducer = (subtotal: number, item: CartItem) =>
			subtotal + (item.product.value * item.quantity)
		return this.itemsInCart.reduce(reducer, 0)
	}

	get price(): string {
		return `\$${this.value.toFixed(2)} CAD`
	}

	get quantity() {
		let sum = 0
		for (const item of this.itemsInCart) sum += item.quantity
		return sum
	}

	//
	// ELEMENT LIFECYCLE
	// initialization and updates
	//

	firstUpdated() {
		this.createShopifyAdapter()
		this._loadAllProducts()
	}

	updated() {

		// update button numerals
		for (const button of this.selectors.buttons())
			button.numeral = this.quantity

		// keep lists up to date
		for (const list of this.selectors.collections()) {
			const {uid: collection} = list
			list.cartItems = collection
				? this._catalog.filter(
					item => item.product.collections.includes(collection)
				)
				: [...this._catalog]
		}

		// keep products up to date
		for (const product of this.selectors.products()) {
			if (product.uid) {
				const cartItem = this._catalog.find(
					item => item.product.id === product.uid
				)
				if (cartItem) {
					product.uid = undefined
					product.cartItem = cartItem
				}
			}
			product["in-cart"] = this.itemsInCart.includes(product.cartItem)
			product.requestUpdate()
		}
	}

	//
	// PUBLIC METHODS
	//

	async checkout() {
		console.log("mock checkout", this.itemsInCart)
	}

	//
	// PRIVATE METHODS
	//

	private createShopifyAdapter() {
		if (this.shopifyAdapter) return
		const domain = this["shopify-domain"]
		const storefrontAccessToken = this["shopify-storefront-access-token"]
		if (domain && storefrontAccessToken) {
			this.shopifyAdapter = new ShopifyAdapter({
				domain,
				storefrontAccessToken
			})
		}
	}

	private async _loadAllProducts() {
		const {collectionIds, products} = await this.shopifyAdapter.fetchEverything()
		const cartItems = products.map(product => new CartItem({
			product,
			cart: this,
			quantity: 0,
			quantityMin: 1,
			quantityMax: 5
		}))
		this._catalog = cartItems
		this._collectionIds = collectionIds
	}

	//
	// RENDERING
	//

	static get styles() {
		return css`
			* {
				box-sizing: border-box;
				margin: 0;
				padding: 0;
			}
			ol {
				list-style: none;
			}
			li {
				margin-top: 0.5em;
			}
		`
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
				<slot></slot>
			</div>
		`
	}
}
