import { Currencies } from "crnc/x/interfaces.js";
import { CurrencyStorage } from "../interfaces.js";
export declare function installPriceDisplaySystem({ ratesUrl, baseCurrency, currencies, currencyStorage, }: {
    baseCurrency: string;
    ratesUrl?: string;
    currencies?: Currencies;
    currencyStorage?: CurrencyStorage;
}): Promise<void>;
