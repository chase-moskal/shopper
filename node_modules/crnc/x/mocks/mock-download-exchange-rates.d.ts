import { CurrencyExchangeRates, DownloadExchangeRates } from "../interfaces.js";
export declare const mockExchangeRateDownloaders: {
    success: () => DownloadExchangeRates;
    downloadCounter: () => {
        readonly count: number;
        download: DownloadExchangeRates;
    };
    fail: () => DownloadExchangeRates;
    useTheseRates: (exchangeRates: CurrencyExchangeRates) => () => Promise<{
        exchangeRates: CurrencyExchangeRates;
    }>;
};
