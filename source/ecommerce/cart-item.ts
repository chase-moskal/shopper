
import {Product} from "../interfaces.js"
import {ShopperCart} from "../components/shopper-cart.js"

export class CartItem {
	private _cart: ShopperCart
	private _product: Product
	private _quantity: number
	private _quantityMin: number
	private _quantityMax: number

	constructor({cart, product, quantity, quantityMin, quantityMax}: {
		cart: ShopperCart
		product: Product
		quantity: number
		quantityMin: number
		quantityMax: number
	}) {
		this._cart = cart
		this._product = product
		this._quantity = quantity
		this._quantityMin = quantityMin
		this._quantityMax = quantityMax
	}

	get product() { return this._product }
	get quantity() { return this._quantity }
	get quantityMin() { return this._quantityMin }
	get quantityMax() { return this._quantityMax }

	set quantity(x: number) {
		this._quantity = x
		this._cart.requestUpdate()
	}

	get unitPrice() {
		return `\$${this._product.value.toFixed(2)} CAD`
	}

	get subtotalPrice() {
		const value = this._product.value * this._quantity
		return `\$${value.toFixed(2)} CAD`
	}
}
