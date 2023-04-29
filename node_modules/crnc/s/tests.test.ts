
import {Suite} from "cynic"

import currencyConverter from "./currency-converter.test.js"
import formatCurrency from "./currency-tools/format-currency.test.js"
import convertCurrency from "./currency-tools/convert-currency.test.js"
import convertAndFormatCurrency from "./currency-tools/convert-and-format-currency.test.js"

export default <Suite>{
	currencyConverter,
	formatCurrency,
	convertCurrency,
	convertAndFormatCurrency,
}
