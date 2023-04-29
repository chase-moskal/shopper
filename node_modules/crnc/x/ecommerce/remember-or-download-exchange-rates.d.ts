import { ConverterPersistence, DownloadExchangeRates, CurrencyExchangeRates } from "../interfaces.js";
export declare function rememberOrDownloadExchangeRates({ currencies, persistence: { storage, storageKeys, cacheLifespan }, downloadExchangeRates, }: {
    currencies: string[];
    persistence: ConverterPersistence;
    downloadExchangeRates: DownloadExchangeRates;
}): Promise<CurrencyExchangeRates>;
