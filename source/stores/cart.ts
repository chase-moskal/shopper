
import {observable, action, computed} from "mobx"

import {Product} from "./product"
import {CartItem} from "./cart-item"
import {CartOptions} from "./interfaces"
import {CurrencyControl} from "./currency-control"

/**
 * CART CLASS
 * - maintain a cart containing products and keeping track of quantities etc
 * - you must provide a catalog of all available items
 * - items with quantity 0 are considered "not in the cart"
 */
export class Cart {
	@observable itemCatalog: CartItem[] = []
	@observable panelOpen: boolean = false

	private readonly currencyControl: CurrencyControl

	constructor(options: CartOptions) {
		this.itemCatalog = options.itemCatalog
		this.currencyControl = options.currencyControl
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
	 * - sum up the value of every product in the cart
	 * - return the sum
	 */
	@computed get value(): number {
		const reducer = (subtotal, item: CartItem) => subtotal + item.value
		return this.activeItems.reduce(reducer, 0)
	}

	/**
	 * Price
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
	 * Remove
	 * - take a product out of the cart
	 */
	@action remove(product: Product): void {
		this.itemCatalog = this.itemCatalog.filter(item => item.product !== product)
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
