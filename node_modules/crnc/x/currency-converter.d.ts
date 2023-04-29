import { ConverterParams, CurrencyConverter } from "./interfaces.js";
export declare function makeCurrencyConverter({ baseCurrency, currencies, locale, persistence, downloadExchangeRates, listenForStorageChange, }: ConverterParams): CurrencyConverter;
