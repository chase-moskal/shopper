
import {observable, computed, action} from "mobx"
import {CurrencyControl} from "./currency-control"
import {ProductOptions, ElementAttributes} from "./stores-interfaces"

/**
 * Represent a single ecommerce product
 */
export class Product {
	readonly id: string
	readonly value: number
	readonly title: string
	readonly description: string
	private readonly currencyControl: CurrencyControl

	@observable precision: number = null
	@observable attributes: {[key: string]: string} = {}

	constructor({precision, attributes, ...options}: ProductOptions) {
		Object.assign(this, options)
		this.setPrecision(precision)
		this.setAttributes(attributes)
	}

	@computed get price(): string {
		const {currencyControl, value, precision} = this
		return currencyControl.convertAndFormat(value, precision)
	}

	@action setPrecision(precision: number) {
		this.precision = precision
	}

	@action setAttributes(attributes: ElementAttributes = {}) {
		this.attributes = attributes
	}
}
