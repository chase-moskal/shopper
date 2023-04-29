
import {CurrencyLibrary} from "../interfaces.js"

export function getDetailsForCurrencies(
		currencies: string[],
		library: CurrencyLibrary,
	) {

	const details: CurrencyLibrary = {}

	for (const code of currencies) {
		const found = library[code]
		if (found)
			details[code] = found
	}

	return details
}
