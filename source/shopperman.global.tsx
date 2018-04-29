
import {h} from "preact"

import * as mobx from "mobx"
import * as preact from "preact"
import * as mobxPreact from "mobx-preact"

import {default as Cart} from "./stores/cart"
import {default as CartItem} from "./stores/cart-item"
import {default as CartButton} from "./components/cart-button"
import {default as CartSystem} from "./components/cart-system"
import {default as CartList} from "./components/cart-manipulator"

import * as crnc from "./crnc"

window["mobx"] = mobx
window["preact"] = preact
window["mobxPreact"] = mobxPreact

window["shopperman"] = {
	Cart,
	CartItem,
	CartButton,
	CartList,
	CartSystem,
	crnc,
	demo: function demo() {
		mobx.configure({enforceActions: true})
	
		const cart = new Cart()
		preact.render(<CartSystem {...{cart}}/>, document.querySelector(".shopperman"))
		const currency = "CAD"
	
		cart.add(new CartItem({
			id: "AE2468",
			cents: 1082,
			title: "Apple Pie",
			currency
		}))
	
		cart.add(new CartItem({
			id: "BC3682",
			cents: 340,
			title: "Blueberry Muffin",
			currency
		}))
	}
}
