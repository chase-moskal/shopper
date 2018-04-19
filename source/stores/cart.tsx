
import {observable, action, autorun, computed} from "mobx"
import {Currency, formatPriceTag} from "../money"
import CartItem from "./cart-item"

export default class Cart {
	@observable items: CartItem[] = []
	@observable open: boolean = false
	@observable currency: Currency = Currency.CAD

	@action toggle(open = null) {
		this.open = open !== null
			? open
			: !this.open
	}

	@action clear() {
		this.items = []
	}

	@action add(item: CartItem) {
		this.items.push(item)
	}

	@action remove(id: string) {
		this.items.filter(item => item.id !== id)
	}

	@computed get subtotalCents(): number {
		return this.items.reduce((subtotal, item) => subtotal + item.cents, 0)
	}

	@computed get subtotal(): string {
		return formatPriceTag(this.subtotalCents, this.currency)
	}
}
