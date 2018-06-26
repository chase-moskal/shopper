
import {computed} from "mobx"

import {CurrencyControl} from "./currency-control"

/**
 * PRODUCT OPTIONS INTERFACE
 */
export interface ProductOptions {
	id: string
	title: string
	description: string
	value: number
	currencyControl: CurrencyControl
}

/**
 * PRODUCT CLASS
 * - represent a single ecommerce product
 * - expose getters for the total value and formatted price tag
 */
export class Product {
	private readonly currencyControl: CurrencyControl

	readonly id: string
	readonly value: number
	readonly title: string
	readonly description: string

	constructor(options: ProductOptions) {
		Object.assign(this, options)
	}

	@computed get price(): string {
		const {currencyControl, value} = this
		return currencyControl.convertAndFormat(value)
	}
}
