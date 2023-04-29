
export const bankOfCanadaSupportedCurrencies = <const>[
	"CAD",
	"AUD",
	"BRL",
	"CNY",
	"EUR",
	"HKD",
	"INR",
	"IDR",
	"JPY",
	"MYR",
	"MXN",
	"NZD",
	"NOK",
	"PEN",
	"RUB",
	"SAR",
	"SGD",
	"ZAR",
	"KRW",
	"SEK",
	"CHF",
	"TWD",
	"THB",
	"TRY",
	"GBP",
	"USD",
	"VND",
]

export function filterOutCurrenciesNotSupportedByBankOfCanada(currencies: string[]) {
	return currencies.filter(
		currency => bankOfCanadaSupportedCurrencies.indexOf(<any>currency) !== -1
	)
}
