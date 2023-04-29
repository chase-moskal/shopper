export const bankOfCanadaSupportedCurrencies = [
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
];
export function filterOutCurrenciesNotSupportedByBankOfCanada(currencies) {
    return currencies.filter(currency => bankOfCanadaSupportedCurrencies.indexOf(currency) !== -1);
}
//# sourceMappingURL=supported-currencies.js.map