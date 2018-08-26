
import {observable, computed, action} from "mobx"
import {ProductOptions} from "./interfaces"
import {CurrencyControl} from "./currency-control"

/**
 * PRODUCT CLASS
 * - represent a single ecommerce product
 * - expose getter for the formatted price tag
 */
export class Product {
	readonly id: string
	readonly value: number
	readonly title: string
	readonly description: string
	private readonly currencyControl: CurrencyControl

	@observable precision: number = null

	constructor(options: ProductOptions) {
		Object.assign(this, options)
	}

	@computed get price(): string {
		const {currencyControl, value, precision} = this
		return currencyControl.convertAndFormat(value, precision)
	}

	@action setPrecision(precision: number) {
		this.precision = precision
	}
}
