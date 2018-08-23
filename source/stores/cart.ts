
import {OmniStorage, LocalClient} from "omnistorage"
import {observable, action, computed} from "mobx"

import {Product} from "./product"
import {CartItem} from "./cart-item"
import {CurrencyControl} from "./currency-control"
import {CartOptions, CartStorageData} from "./interfaces"

/**
 * DEFAULT CART OPTIONS
 */
export const defaultCartOptions: Partial<CartOptions> = {
	storageKey: "shopperman",
	omniStorage: new LocalClient({storage: window.localStorage})
}

/**
 * CART CLASS
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

	/**
	 * Cart constructor
	 */
	constructor(opts: CartOptions) {
		const options = {...defaultCartOptions, ...opts}

		this.storageKey = options.storageKey
		this.omniStorage = options.omniStorage
		this.itemCatalog = options.itemCatalog
		this.currencyControl = options.currencyControl
	}

	/**
	 * Load from storage
	 * - rehydrate the item catalog details from storage
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
			console.error(`shopperman cart load from storage error: ${error.message}`)
		}
	}

	/**
	 * Save to storage
	 * - save item catalog details to storage
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
	 * Active items
	 * - getter for items which are "in the cart"
	 * - active items have cart quantity greater than zero
	 */
	@computed get activeItems(): CartItem[] {
		return this.itemCatalog.filter(item => item.quantity > 0)
	}

	/**
	 * Value
	 * - return whole cart sum
	 */
	@computed get value(): number {
		const reducer = (subtotal, item: CartItem) => subtotal + item.value
		return this.activeItems.reduce(reducer, 0)
	}

	/**
	 * Price
	 * - whole cart
	 * - return the whole cart's formatted subtotal price tag
	 */
	@computed get price(): string {
		const {value, currencyControl} = this
		return currencyControl.convertAndFormat(value)
	}

	/**
	 * Toggle panel open
	 * - toggle the panel open status
	 * - provide a boolean to just set it
	 */
	@action togglePanelOpen(open: boolean = null): boolean {
		this.panelOpen = open === null
			? !this.panelOpen
			: open
		return this.panelOpen
	}

	/**
	 * Clear
	 * - remove all products from the cart
	 */
	clear(): void {
		for (const item of this.itemCatalog) {
			item.setQuantity(0)
		}
	}

	/**
	 * Get product item
	 * - get a cart item by providing the product inside
	 */
	getProductItem(product: Product): CartItem {
		return this.itemCatalog.find(i => i.product === product)
	}
}
