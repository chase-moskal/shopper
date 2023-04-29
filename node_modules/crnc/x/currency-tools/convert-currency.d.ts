import { ConvertCurrencyParams } from "../interfaces.js";
/**
 * Convert currency
 *  + exchange monetary value from one currency into another
 *  + provide a 'rates' object of relativistic currency values
 *  + returns a number
 */
export declare function convertCurrency({ value, inputCurrency, outputCurrency, exchangeRates }: ConvertCurrencyParams): number;
