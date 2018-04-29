
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
import * as comms from "./comms"

window["mobx"] = mobx
window["preact"] = preact
window["mobxPreact"] = mobxPreact

window["crnc"] = crnc
window["comms"] = comms

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

	comms,
	crnc,

	demo: async function() {
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
	},

	testCurrencyExchange: async function() {
		const tag = (value: number, currency: string) => crnc.formatPriceTag({
			cents: crnc.exchange({value, input: "CAD", output: currency, rates}),
			currency
		})

		const {updated, rates} = await crnc.downloadRates()

		const converto = (value: number = 1082) => {
			console.log(tag(value, "CAD"))
			console.log(tag(value, "USD"))
			console.log(tag(value, "EUR"))
			console.log(tag(value, "GBP"))
		}

		converto()
		return {converto}
	}
}
