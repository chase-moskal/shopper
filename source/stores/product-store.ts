
import {observable, computed, action} from "mobx"
import {CurrencyControlStore} from "./currency-control-store"
import {ProductStoreOptions, ElementAttributes} from "./stores-interfaces-store"

/**
 * Represent a single ecommerce product
 */
export class ProductStore {
	readonly id: string
	readonly value: number
	readonly title: string
	readonly description: string
	private readonly currencyControlStore: CurrencyControlStore

	@observable precision: number
	@observable attributes: {[key: string]: string}

	constructor({precision, attributes, ...options}: ProductStoreOptions) {
		this.id = options.id
		this.title = options.title
		this.value = options.value
		this.description = options.description
		this.currencyControlStore = options.currencyControlStore
		this.setPrecision(precision)
		this.setAttributes(attributes)
	}

	@computed get price(): string {
		const {currencyControlStore, value, precision} = this
		return currencyControlStore.convertAndFormat(value, precision)
	}

	@action setPrecision(precision: number) {
		this.precision = precision
	}

	@action setAttributes(attributes: ElementAttributes = {}) {
		this.attributes = attributes
	}
}
