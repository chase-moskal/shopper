
import {Suite, expect} from "cynic"

import {exchangeRates} from "./testing-tools.js"
import {convertAndFormatCurrency} from "./convert-and-format-currency.js"

export default <Suite>{
	"respects precision": async() => {
		expect(convertAndFormatCurrency({
			exchangeRates,
			value: 60,
			precision: 0,
			inputCurrency: "CAD",
			outputCurrency: "USD",
		}).price).equals("$40 USD")
	},
}
