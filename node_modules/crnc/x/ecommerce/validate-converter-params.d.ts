import { CurrencyLibrary } from "../interfaces.js";
export declare function validateConverterParams({ baseCurrency, currencies, currencyLibrary }: {
    baseCurrency: string;
    currencies: string[];
    currencyLibrary: CurrencyLibrary;
}): {
    baseCurrency: string;
    currencies: string[];
};
