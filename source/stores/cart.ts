
import {OmniStorage, LocalClient} from "omnistorage"
import {observable, action, computed} from "mobx"

import {Product} from "./product"
import {CartItem} from "./cart-item"
import {CurrencyControl} from "./currency-control"
import {CartOptions, CartStorageData} from "./stores-interfaces"

/**
 * Default cart options
 */
export const defaultCartOptions: Partial<CartOptions> = {
	storageKey: "shopper",
	omniStorage: new LocalClient({storage: window.localStorage})
}

/**
 * Shopping cart which tracks products and maintains a subtotal
 * - maintain a cart containing products and keeping track of quantities etc
 * - you must provide a catalog of all available items
 * - items with quantity 0 are considered "not in the cart"
 */
export class Cart {
	@observable itemCatalog: CartItem[] = []
	@observable panelOpen: boolean = false

	private readonly storageKey: string
	private readonly omniStorage: OmniStorage
	private readonly currencyControl: CurrencyControl

	constructor(opts: CartOptions) {
		const options = {...defaultCartOptions, ...opts}

		this.storageKey = options.storageKey
		this.omniStorage = options.omniStorage
		this.itemCatalog = options.itemCatalog
		this.currencyControl = options.currencyControl
	}

	/**
	 * Rehydrate the item catalog details from storage
	 */
	private async loadFromStorage() {
		const {omniStorage, storageKey} = this
		try {
			const data: CartStorageData = JSON.parse(await omniStorage.getItem(storageKey))
			for (const productId of Object.keys(data)) {
				const cartStorage = data[productId]
				const cartItem = this.itemCatalog.find(cartItem => cartItem.product.id === productId)
				cartItem.setQuantity(cartStorage.quantity)
			}
		}
		catch (error) {
			console.error(`shopper cart load from storage error: ${error.message}`)
		}
	}

	/**
	 * Save item catalog details to storage
	 */
	private saveToStorage() {
		const {omniStorage, storageKey} = this

		const data: CartStorageData = {}
		for (const {product, quantity} of this.itemCatalog) {
			const productId = product.id
			data[productId] = {quantity}
		}

		omniStorage.setItem(storageKey, JSON.stringify(data))
	}

	/**
	 * Getter for items which are "in the cart"
	 * - active items are cart items with quantity greater than zero
	 */
	@computed get activeItems(): CartItem[] {
		return this.itemCatalog.filter(item => item.quantity > 0)
	}

	/**
	 * Sum of cart item value
	 */
	@computed get value(): number {
		const reducer = (subtotal, item: CartItem) => subtotal + item.value
		return this.activeItems.reduce(reducer, 0)
	}

	/**
	 * Formatter price tag for the whole cart's value
	 */
	@computed get price(): string {
		const {value, currencyControl} = this
		return currencyControl.convertAndFormat(value)
	}

	/**
	 * Toggle the cart panel open or closed
	 */
	@action togglePanelOpen(open: boolean = null): boolean {
		this.panelOpen = open === null
			? !this.panelOpen
			: open
		return this.panelOpen
	}

	/**
	 * Remove all products from the cart
	 */
	clear(): void {
		for (const item of this.itemCatalog) {
			item.setQuantity(0)
		}
	}

	/**
	 * Get a cart item by providing the product inside
	 */
	getProductItem(product: Product): CartItem {
		return this.itemCatalog.find(i => i.product === product)
	}
}
