
import {observable, action, autorun, computed} from "mobx"

export const enum Currency {
	CAD,
	USD
}

const CurrencyExchangeRates = {
	[Currency.CAD]: 1.0,
	[Currency.USD]: 0.79
}

/**
 * Shopping cart item
 */
export interface CartItem {
	id: string
	price: number
	title: string
}

export class CartItemStore {
	@observable cartItem: CartItem
	@observable currency: Currency

	private centsToDollars(cents: number): string {
		return (cents / 100).toFixed(2)
	}

	@computed get pricetag() {
		const {cartItem, currency} = this
		switch (currency) {
			case Currency.CAD: return `\$${this.centsToDollars(cartItem.price)} CAD`
			case Currency.USD: return `\$${this.centsToDollars(cartItem.price * CurrencyExchangeRates[Currency.USD])} USD`
		}
	}

	constructor({cartItem, currency}: {cartItem: CartItem; currency: number}) {
		this.cartItem = cartItem
		this.currency = currency
	}
}

/**
 * Shopping cart state object
 */
export default class CartStore {

	/** Array of cart items */
	@observable cartItems: CartItem[] = []

	private readonly storageProperties = ["cartItems"]
	private readonly storagePrefix = "cartstore:"

	/**
	 * Create a cart store
	 */
	constructor(options: any = {}) {

		// initial load from storage
		this.load()

		// load whenever storage changes (cross-window updates)
		window.addEventListener("storage", (event: StorageEvent) => this.load())
	}

	/**
	 * Empty the cart
	 */
	@action clearCartItems() {
		this.cartItems = []
		this.save()
	}

	/**
	 * Add a single cart item
	 */
	@action addCartItem(cartItem: CartItem) {
		this.cartItems = [...this.cartItems, cartItem]
		this.save()
	}

	/**
	 * Remove a cart item by its id
	 */
	@action removeCartItem(id: string) {
		this.cartItems = this.cartItems.filter(item => item.id === id)
	}

	/**
	 * Save to local storage
	 */
	private save() {
		for (const property of this.storageProperties) {
			const data = JSON.stringify(this[property])
			localStorage[this.storagePrefix + property] = JSON.stringify(data)
		}
	}

	/**
	 * Load from local storage
	 */
	@action private load() {
		for (const property of this.storageProperties) {
			const data = localStorage[this.storagePrefix + property]
			if (data) this[property] = JSON.parse(data)
		}
	}
}
