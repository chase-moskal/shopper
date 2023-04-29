import { formatCurrency } from "./format-currency.js";
import { convertCurrency } from "./convert-currency.js";
/**
 * Convert and format currency
 *  + exchange and format money in one shot
 *  + convenience function combining 'convertCurrency' and 'formatCurrency'
 */
export function convertAndFormatCurrency({ value, exchangeRates, inputCurrency, outputCurrency, precision = 2, locale = undefined }) {
    return formatCurrency({
        locale,
        precision,
        code: outputCurrency,
        value: convertCurrency({ value, inputCurrency, outputCurrency, exchangeRates })
    });
}
//# sourceMappingURL=convert-and-format-currency.js.map