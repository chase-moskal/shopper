
import {OmniStorage, LocalClient} from "omnistorage"
import {observable, action, computed} from "mobx"

import {ProductStore} from "./product-store"
import {CartItemStore} from "./cart-item-store"
import {CurrencyControlStore} from "./currency-control-store"
import {CartStoreOptions, CartStorageData} from "./stores-interfaces-store"

/**
 * Default cart options
 */
export const defaultPureCartOptions: Partial<CartStoreOptions> = {
	storageKey: "shopper",
	omniStorage: new LocalClient({storage: window.localStorage})
}

/**
 * Shopping cart which tracks products and maintains a subtotal
 * - maintain a cart containing products and keeping track of quantities etc
 * - you must provide a catalog of all available items
 * - items with quantity 0 are considered "not in the cart"
 */
export class CartStore {
	@observable itemCatalog: CartItemStore[]

	private readonly storageKey: string
	private readonly omniStorage: OmniStorage
	private readonly currencyControl: CurrencyControlStore

	constructor(opts: CartStoreOptions) {
		const options = {...defaultPureCartOptions, ...opts}
		this.storageKey = options.storageKey
		this.omniStorage = options.omniStorage
		this.currencyControl = options.currencyControlStore
		this.setItemCatalog(options.itemCatalog)
	}

	/**
	 * Getter for items which are "in the cart"
	 * - active items are cart items with quantity greater than zero
	 */
	@computed get activeItems(): CartItemStore[] {
		return this.itemCatalog.filter(item => item.quantity > 0)
	}

	/**
	 * Sum of cart item value
	 */
	@computed get value(): number {
		const reducer = (subtotal, item: CartItemStore) => subtotal + item.value
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
	getProductItem(product: ProductStore): CartItemStore {
		return this.itemCatalog.find(i => i.productStore === product)
	}

	/**
	 * Set the item catalog
	 */
	@action private setItemCatalog(itemCatalog: CartItemStore[] = []) {
		this.itemCatalog = itemCatalog
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
				const cartItem = this.itemCatalog.find(cartItem => cartItem.productStore.id === productId)
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
		for (const {productStore, quantity} of this.itemCatalog) {
			const productId = productStore.id
			data[productId] = {quantity}
		}

		omniStorage.setItem(storageKey, JSON.stringify(data))
	}
}
