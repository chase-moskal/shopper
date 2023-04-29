import { ConvertAndFormatCurrencyParams, Money } from "../interfaces.js";
/**
 * Convert and format currency
 *  + exchange and format money in one shot
 *  + convenience function combining 'convertCurrency' and 'formatCurrency'
 */
export declare function convertAndFormatCurrency({ value, exchangeRates, inputCurrency, outputCurrency, precision, locale }: ConvertAndFormatCurrencyParams): Money;
