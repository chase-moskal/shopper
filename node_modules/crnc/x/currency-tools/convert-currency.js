/**
 * Convert currency
 *  + exchange monetary value from one currency into another
 *  + provide a 'rates' object of relativistic currency values
 *  + returns a number
 */
export function convertCurrency({ value, inputCurrency, outputCurrency, exchangeRates }) {
    // get currency rates
    const inputRate = exchangeRates[inputCurrency];
    const outputRate = exchangeRates[outputCurrency];
    // scrutinize currencies and rates for validity
    const currenciesAndRates = [
        [inputCurrency, inputRate],
        [outputCurrency, outputRate]
    ];
    for (const [currency, rate] of currenciesAndRates) {
        if (rate === undefined || rate === null || isNaN(rate))
            throw new Error(`invalid rate "${currency}"`);
    }
    // calculate exchanged currency value
    return value * (outputRate / inputRate);
}
//# sourceMappingURL=convert-currency.js.map