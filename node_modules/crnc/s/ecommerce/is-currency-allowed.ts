
export function isCurrencyAllowed(code: string, currencies: string[]) {
	return currencies.indexOf(code) !== -1
}
