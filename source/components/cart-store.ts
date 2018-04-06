
import {observable, action, autorun} from "mobx"

/**
 * Shopping cart item
 */
export interface CartItem {
	id: string
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
