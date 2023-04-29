import { RestrictedSnapstate } from "@chasemoskal/snapstate";
import { currencyLibrary } from "./ecommerce/currency-library.js";
import { bankOfCanadaSupportedCurrencies } from "./currency-tools/bank-of-canada/supported-currencies.js";
export type BankOfCanadaSupportedCurrencies = typeof bankOfCanadaSupportedCurrencies[number];
export type SupportedCurrency = keyof typeof currencyLibrary;
export type SupportedCurrencies = SupportedCurrency[];
export interface DownloadExchangeRatesParams {
    currencies: string[];
}
export interface DownloadExchangeRatesResults {
    exchangeRates: CurrencyExchangeRates;
}
export type DownloadExchangeRates = ({}: DownloadExchangeRatesParams) => Promise<DownloadExchangeRatesResults>;
export interface CurrencyExchangeRates {
    [key: string]: number;
}
export interface ConvertCurrencyParams {
    value: number;
    inputCurrency: string;
    outputCurrency: string;
    exchangeRates: CurrencyExchangeRates;
}
export interface FormattableNumber {
    value: number;
    precision?: number;
    locale?: string;
}
export interface CurrencyDetails {
    code: string;
    name: string;
    symbol: string;
}
export interface Money {
    currency: CurrencyDetails;
    value: number;
    amount: string;
    price: string;
}
export interface CurrencyLibrary {
    [code: string]: CurrencyDetails;
}
export interface FormatCurrencyParams extends FormattableNumber {
    code: string;
    currencyLibrary?: CurrencyLibrary;
}
export interface ConvertAndFormatCurrencyParams extends FormattableNumber {
    inputCurrency: string;
    outputCurrency: string;
    exchangeRates: CurrencyExchangeRates;
}
export interface CurrenciesByLocales {
    [locale: string]: string;
}
export interface AssumeUserCurrencyParams {
    fallback: string;
    currencies: string[];
    locale?: string;
    currenciesByLocales?: CurrenciesByLocales;
}
export interface AscertainEcommerceDetailsParams extends DownloadExchangeRatesParams {
    storeBaseCurrency: string;
    userDisplayCurrency: string;
    cacheLifespan?: number;
    cacheStorageKey?: string;
    cacheStorage?: BasicStorage;
}
export interface EcommerceDetails {
    storeBaseCurrency: string;
    userDisplayCurrency: string;
    exchangeRates: CurrencyExchangeRates;
}
export interface BasicStorage {
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
export interface JsonStorage {
    getItem<T>(key: string): undefined | T;
    setItem<T>(key: string, value: T): void;
    removeItem(key: string): void;
}
export interface ConverterPersistence {
    cacheLifespan: number;
    storage: BasicStorage;
    storageKeys: {
        currencyPreference: string;
        exchangeRatesCache: string;
    };
}
export interface ListenForStorageChange {
    ({}: {
        reloadCurrencyPreference: () => void;
    }): void;
}
export interface ConverterParams {
    baseCurrency: string;
    currencies?: string[];
    locale?: string;
    persistence?: ConverterPersistence;
    downloadExchangeRates?: DownloadExchangeRates;
    listenForStorageChange?: ListenForStorageChange;
}
export interface ConverterDisplayOptions {
    currency?: string;
    precision?: number;
}
export interface CurrencyConverter {
    snap: RestrictedSnapstate<{
        currencyPreference: string;
        exchangeRates: CurrencyExchangeRates;
    }>;
    readonly exchangeRatesDownload: Promise<void | CurrencyExchangeRates>;
    readonly baseCurrency: string;
    readonly currencyPreference: string;
    readonly targetCurrency: string;
    readonly availableCurrencies: CurrencyLibrary;
    setCurrencyPreference(currency: string): void;
    display(valueInBaseCurrency: number, options?: ConverterDisplayOptions): Money;
}
