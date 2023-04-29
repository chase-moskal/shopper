import { exchangeRates as exampleExchangeRates } from "../currency-tools/testing-tools.js";
const success = () => async ({ currencies }) => {
    const exchangeRates = {};
    for (const code of currencies) {
        exchangeRates[code] = exampleExchangeRates.hasOwnProperty(code)
            ? exampleExchangeRates[code]
            : 1.0;
    }
    return {
        exchangeRates,
    };
};
export const mockExchangeRateDownloaders = {
    success,
    downloadCounter: () => {
        let downloadCount = 0;
        const downloader = success();
        return {
            get count() {
                return downloadCount;
            },
            download: (async (...params) => {
                downloadCount += 1;
                return downloader(...params);
            }),
        };
    },
    fail: () => async () => {
        throw new Error("failed to download rates");
    },
    useTheseRates: (exchangeRates) => async () => ({
        exchangeRates,
    }),
};
//# sourceMappingURL=mock-download-exchange-rates.js.map