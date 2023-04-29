import { FormatCurrencyParams, Money } from "../interfaces.js";
/**
 * Format currency
 *  + express monetary value in human-readable format
 *  + displays large number groupings differently based on locale
 *  + defaults to 2 digits of precision
 *  + you can provide your own set of currency formatters
 *  + returns a string
 */
export declare function formatCurrency({ code, value, precision, locale, currencyLibrary, }: FormatCurrencyParams): Money;
