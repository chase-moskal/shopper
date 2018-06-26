
import {Product} from "./product"
import {CartItem} from "./cart-item"
import {observable, action, computed} from "mobx"
import {CurrencyControl} from "./currency-control"

const quantityMin = 1
const quantityMax = 5

/**
 * CART OPTIONS INTERFACE
 */
export interface CartOptions {
	items: CartItem[]
	currencyControl: CurrencyControl
}

/**
 * CART CLASS
 * - keeps an array of cart items
 * - items with quantity 0 are considered "not in the cart"
 */
export class Cart {
	private readonly currencyControl: CurrencyControl

	@observable items: CartItem[] = []
	@observable open: boolean = false

	constructor(options: CartOptions) {
		this.items = options.items
		this.currencyControl = options.currencyControl
	}

	/**
	 * Active items
	 * - getter for items which are "in the cart"
	 * - active items have cart quantity greater than zero
	 */
	@computed get activeItems() {
		return [...this.items].filter(item => item.quantity > 0)
	}

	/**
	 * Get product item
	 * - get a cart item by providing the product inside
	 */
	getProductItem(product: Product): CartItem {
		return this.items.find(i => i.product === product)
	}

	/**
	 * Toggle
	 * - toggle the cart open or closed
	 */
	@action toggle(open: boolean = null): boolean {
		this.open = open === null
			? !this.open
			: open
		return this.open
	}

	/**
	 * Clear
	 * - remove all products from the cart
	 */
	@action clear(): void {
		this.items = []
	}

	// /**
	//  * Add
	//  * - put a product into the cart
	//  */
	// @action add(product: Product): CartItem {
	// 	const {currencyControl} = this
	// 	const existingItem = this.getProductItem(product)

	// 	// increment quantity of existing item
	// 	if (existingItem) {
	// 		const item = existingItem
	// 		item.setQuantity(item.quantity + 1)
	// 		return item
	// 	}

	// 	// add new item for product
	// 	else {
	// 		const item = new CartItem({
	// 			currencyControl,
	// 			product,
	// 			quantityMin,
	// 			quantityMax
	// 		})
	// 		this.items.push(item)
	// 		return item
	// 	}
	// }

	/**
	 * Remove
	 * - take a product out of the cart
	 */
	@action remove(product: Product): void {
		this.items = this.items.filter(item => item.product !== product)
	}

	/**
	 * Value
	 * - sum up the value of every product in the cart
	 * - return the sum
	 */
	@computed get value(): number {
		const reducer = (subtotal, item) => subtotal + item.product.totalValue
		return this.items.reduce(reducer, 0)
	}

	/**
	 * Price
	 * - return the whole cart's formatted subtotal price tag
	 */
	@computed get price(): string {
		const {value, currencyControl} = this
		return currencyControl.convertAndFormat(value)
	}
}
