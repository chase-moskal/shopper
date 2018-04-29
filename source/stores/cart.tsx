
import CartItem from "./cart-item"
import {formatCurrency} from "crnc"
import {observable, action, autorun, computed} from "mobx"

export default class Cart {
	@observable items: CartItem[] = []
	@observable open: boolean = false
	@observable currency: string = "CAD"

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

	@action setCurrency(currency: string) {
		this.currency = currency
	}

	@computed get subtotalCents(): number {
		return this.items.reduce((subtotal, item) => subtotal + item.totalCents, 0)
	}

	@computed get subtotal(): string {
		const {subtotalCents: cents, currency} = this
		return formatCurrency({cents, currency})
	}

	constructor() {

		// synchronize each item's currency to the cart's currency
		autorun(() => {
			const {currency, items} = this
			for (const item of items) item.setCurrency(currency)
		})
	}
}
