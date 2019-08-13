
import {html, css, property, svg} from "lit-element"

import {select} from "../toolbox/select.js"
import {CartItem} from "../ecommerce/cart-item.js"
import {ShopifyAdapter} from "../ecommerce/shopify-adapter.js"

import {ShopperButton} from "./shopper-button.js"
import {ShopperProduct} from "./shopper-product.js"
import {ShopperCollection} from "./shopper-collection.js"
import {LoadableElement, LoadableState} from "./loadable-element.js"

export class ShopperCart extends LoadableElement {

	//
	// CONFIGURATION
	//

	@property({type: String}) ["shopify-domain"]: string
	@property({type: String}) ["shopify-collection-id"]: string
	@property({type: String}) ["shopify-storefront-access-token"]: string

	@property({type: Boolean}) ["checkout-in-same-window"]: boolean

	@property({type: Object}) shopifyAdapter: ShopifyAdapter

	@property({type: Object}) selectors = {
		buttons: () => select<ShopperButton>("shopper-button"),
		products: () => select<ShopperProduct>("shopper-product"),
		collections: () => select<ShopperCollection>("shopper-collection")
	}

	@property({type: String}) errorMessage: string = "error loading cart system"
	@property({type: String}) loadingMessage: string = "loading cart..."

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
		this._maybeCreateShopifyAdapter()
		this._loadAllProducts()
			.then(() => this.loadableState = LoadableState.Ready)
			.catch(error => {
				this.loadableState = LoadableState.Error
				console.error(error)
			})
	}

	updated() {

		// update button numerals
		for (const button of this.selectors.buttons())
			button.numeral = this.quantity

		// keep collections up to date
		for (const list of this.selectors.collections()) {
			const {uid: collection} = list
			list.loadableState = this.loadableState
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
			product.loadableState = this.loadableState
			product.requestUpdate()
		}
	}

	//
	// PUBLIC METHODS
	//

	clear() {
		for (const cartItem of this._catalog)
			cartItem.quantity = 0
	}

	async checkout() {
		const checkoutUrl = await this.shopifyAdapter.checkout(this.itemsInCart)

		const checkoutLocation: Location = !this["checkout-in-same-window"]
			? window.open("", "_blank").location
			: window.location

		this.clear()

		checkoutLocation.href = checkoutUrl
	}

	//
	// PRIVATE METHODS
	//

	private _maybeCreateShopifyAdapter() {
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

	static get styles(): any {return [super.styles, css`
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		:host {
			font-family: var(--shopper-font-family, sans-serif);
		}

		table {
			width: 100%;
			margin: 1em auto;
		}

		th, td {
			padding: 0.25rem;
		}

		th {
			font-style: sans-serif;
			font-size: 0.8em;
			opacity: 0.35;
			text-transform: uppercase;
			text-align: left;
		}

		td {
			border: 1px solid rgba(0,0,0, 0.1);
		}

		th:nth-child(1), td:nth-child(1),
		th:nth-child(2), td:nth-child(2) {
			text-align: center;
		}

		th:nth-child(3), td:nth-child(3) {
			width: 99%;
		}

		th:nth-last-child(1), td:nth-last-child(1) {
			text-align: right;
			white-space: nowrap;
		}

		.remove-button {
			opacity: 0.5;
			width: 100%;
			background: transparent;
			border: none;
			cursor: pointer;
			color: #444;
		}

		.remove-button:hover, .remove-button:focus {
			opacity: 1;
		}

		.remove-button svg {
			width: 100%;
			min-width: 1.5em;
			height: 1.5em;
		}

		.cart-subtotal {
			text-align: right;
			border-top: 1px solid grey;
		}

		.cart-subtotal th {
			width: 99%;
			text-align: right;
		}

		.cart-subtotal td {
			white-space: nowrap;
		}

		.cart-checkout {
			text-align: right;
		}

		.cart-checkout button {
			font-size: 1.2em;
			padding: 0.5em 1em;
			font-weight: bold;
		}

		@media (max-width: 420px) {
			thead {
				display: none;
			}
			tr {
				display: block;
				margin-top: 1em;
			}
			th, td {
				padding: 0.1rem;
				display: inline-block;
			}
			td {
				border: none;
			}
		}
	`]}

	renderReady() {
		// if (!this.shopifyAdapter) return null
		const cartIsEmpty = !this.itemsInCart.length
		return html`
			<div class="cart-panel">
				${this._renderCartTitle()}
				${cartIsEmpty ? null : html`
					${this._renderCartLineItems()}
					<div class="cart-checkout">
						<button
							class="checkout-button"
							title="Checkout Cart"
							@click=${this._handleCheckoutButtonClick}
							?hidden=${cartIsEmpty}>
								Checkout!
							</button>
						</div>
					</div>
				`}
			</div>
		`
	}

	private _handleCheckoutButtonClick = () => this.checkout()

	private _renderCartTitle() {
		const {quantity} = this
		return html`
			<h1>
				<span>Shopping cart</span>
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

	private _renderCartLineItems() {
		return html`
			<table>
				<thead>
					<tr>
						<th>Remove</th>
						<th>Quantity</th>
						<th>Item name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody class="cart-lines">
					${this.itemsInCart.map(item => this._renderCartItem(item))}
				</tbody>
				<tbody class="cart-subtotal">
					<tr>
						<th colspan="3">Subtotal</th>
						<td>${this.price}</td>
					</tr>
				</tbody>
			</table>
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
		const handleRemoveButtonClick = () => item.quantity = 0
		return html`
			<tr>
				<td>
					<button class="remove-button" title="Remove item" @click=${handleRemoveButtonClick}>
						${svg`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/></svg>`}
					</button>
				</td>
				<td>
					<input
						type="number"
						.value=${item.quantity.toString()}
						.min=${item.quantityMin.toString()}
						.max=${item.quantityMax.toString()}
						@change=${handleQuantityInputChange}
						@keyup=${handleQuantityInputChange}
						@mouseup=${handleQuantityInputChange}
						@click=${handleQuantityInputChange}
						@blur=${handleQuantityInputChange}
						/>
				</td>
				<td>${item.product.title}</td>
				<td>${item.subtotalPrice}</td>
			</tr>
		`
	}
}
