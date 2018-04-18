
import {h} from "preact"

import * as mobx from "mobx"
import * as preact from "preact"
import * as mobxPreact from "mobx-preact"

import {default as Cart} from "./stores/cart"
import {default as CartItem} from "./stores/cart-item"
import {default as CartButton} from "./components/cart-button"
import {default as CartSystem} from "./components/cart-system"
import {default as CartList} from "./components/cart-manipulator"

import * as money from "./money"

window["mobx"] = mobx
window["preact"] = preact
window["mobxPreact"] = mobxPreact
window["money"] = money

window["shopperman"] = {
	Cart,
	CartItem,
	CartButton,
	CartList,
	CartSystem,
	money,
	demo: function demo() {
		mobx.configure({enforceActions: true})
	
		const cart = new Cart()
		preact.render(<CartSystem {...{cart}}/>, document.querySelector(".shopperman"))
	
		cart.add(new CartItem({
			id: "AE2468",
			cents: 1082,
			title: "Apple Pie",
			currency: money.Currency.CAD
		}))
	
		cart.add(new CartItem({
			id: "BC3682",
			cents: 340,
			title: "Blueberry Muffin",
			currency: money.Currency.CAD
		}))
	}
}
