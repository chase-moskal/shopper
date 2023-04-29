import { AssumeUserCurrencyParams } from "../interfaces.js";
/**
 * Assume what currency the user might want to see
 *  + guess is based on locale
 *  + if a currency doesn't exist for the given locale, fallback is used
 */
export declare function assumeUserCurrency({ fallback, locale, currencies, currenciesByLocales }: AssumeUserCurrencyParams): string;
