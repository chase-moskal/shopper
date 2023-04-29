import { currencyLibrary as defaultCurrencyLibrary } from "../ecommerce/currency-library.js";
/**
 * Round a number to the desired number of decimal places
 */
function precisionRound(value, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
}
/**
 * Display a number as a human-readable locale-abiding string
 */
function localize({ value, precision, locale }) {
    return precisionRound(value, precision).toLocaleString(locale, {
        maximumFractionDigits: precision,
        minimumFractionDigits: precision
    });
}
/**
 * Format currency
 *  + express monetary value in human-readable format
 *  + displays large number groupings differently based on locale
 *  + defaults to 2 digits of precision
 *  + you can provide your own set of currency formatters
 *  + returns a string
 */
export function formatCurrency({ code, value, precision = 2, locale = undefined, currencyLibrary = defaultCurrencyLibrary, }) {
    const currency = currencyLibrary[code];
    if (!currency)
        throw new Error(`unknown currency code "${code}"`);
    const { symbol } = currency;
    const amount = localize({ value, locale, precision });
    const price = `${symbol}${amount} ${code}`;
    return { currency, amount, value, price };
}
//# sourceMappingURL=format-currency.js.map