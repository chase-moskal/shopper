
import {Cart} from "./cart"
import {Product} from "./product"
import {CurrencyControl} from "./currency-control"

/**
 * SHOPPERMAN OPTIONS INTERFACE
 */
export interface ShoppermanOptions {
	cart: Cart
	currencyControl: CurrencyControl
}

/**
 * SHOPPERMAN CLASS
 * - keeps an array of products
 * - holds a single readonly currency control
 */
export class Shopperman {
	private readonly cart: Cart
	private readonly currencyControl: CurrencyControl

	constructor(options: ShoppermanOptions) {
		Object.assign(this, options)
	}

	async getProductsInCollection(collectionId: string): Promise<Product[]> {
		return
	}
}
