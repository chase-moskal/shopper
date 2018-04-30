
import {h} from "preact"

import * as crnc from "crnc"
import * as mobx from "mobx"
import * as preact from "preact"
import * as mobxPreact from "mobx-preact"
import * as commotion from "commotion"

import {default as Cart} from "./stores/cart"
import {default as CartItem} from "./stores/cart-item"

import {default as CartButton} from "./components/cart-button"
import {default as CartSystem} from "./components/cart-system"
import {default as CartList} from "./components/cart-manipulator"

window["mobx"] = mobx
window["preact"] = preact
window["mobxPreact"] = mobxPreact

window["crnc"] = crnc
window["commotion"] = commotion

window["shopperman"] = {
	stores: {
		Cart,
		CartItem
	},
	components: {
		CartButton,
		CartSystem,
		CartList
	},

	crnc,
	commotion,

	demo: async function() {
		mobx.configure({enforceActions: true})

		const cart = new Cart()
		preact.render(<CartSystem {...{cart}}/>, document.querySelector(".shopperman"))
		const currency = "CAD"

		cart.add(new CartItem({
			id: "AE2468",
			value: 10.82,
			title: "Apple Pie",
			currency
		}))

		cart.add(new CartItem({
			id: "BC3682",
			value: 3.41,
			title: "Blueberry Muffin",
			currency
		}))
	},

	testCurrencyExchange: async function() {
		const {updated, rates} = await crnc.downloadRates()
		const converto = (value: number = 10.82) => {
			const input = "CAD"
			console.log(crnc.convertAndFormatCurrency({value, input, output: "CAD", rates}))
			console.log(crnc.convertAndFormatCurrency({value, input, output: "USD", rates}))
			console.log(crnc.convertAndFormatCurrency({value, input, output: "EUR", rates}))
			console.log(crnc.convertAndFormatCurrency({value, input, output: "GBP", rates}))
		}
		converto()
		return {converto}
	}
}
