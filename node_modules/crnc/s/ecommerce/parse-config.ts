
export function parseConfig({
		baseCurrency,
		errorLabel = "<crnc-config> error:",
		...raw
	}: {
		baseCurrency: string
		currencies?: string
		errorLabel?: string
	}) {

	if (!baseCurrency)
		throw new Error(`${errorLabel} "base-currency" attribute is required.`)

	const currencies = raw.currencies
		? raw.currencies
			.split(/[\s,]+/)
			.map(c => c.trim())
			.filter(c => c.length > 0)
		: [baseCurrency]

	if (!currencies)
		throw new Error(`${errorLabel} "currencies" attribute is required.`)

	return {baseCurrency, currencies}
}
