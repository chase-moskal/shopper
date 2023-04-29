import { expect } from "cynic";
import { nap } from "./toolbox/nap.js";
import { cache } from "./toolbox/cache.js";
import { clone } from "./toolbox/clone.js";
import { mockPersistence } from "./mocks/mock-persistence.js";
import { makeCurrencyConverter } from "./currency-converter.js";
import { exchangeRates } from "./currency-tools/testing-tools.js";
import { mockExchangeRateDownloaders } from "./mocks/mock-download-exchange-rates.js";
const locale = "en-us";
const currencies = Object.keys(exchangeRates);
const listenForStorageChange = () => { };
export default {
    "fresh startups": {
        async "fresh startup can display in base currency"() {
            const converter = makeCurrencyConverter({
                locale,
                currencies,
                baseCurrency: "USD",
                persistence: mockPersistence.standard(),
                listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.success(),
            });
            const value = 1;
            const result = converter.display(value);
            expect(result.value).equals(value);
        },
        async "fresh startup can convert USD to CAD"() {
            const converter = makeCurrencyConverter({
                locale,
                currencies,
                baseCurrency: "USD",
                persistence: mockPersistence.standard(),
                listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.success(),
            });
            await converter.exchangeRatesDownload;
            converter.setCurrencyPreference("CAD");
            const value = 1;
            const result = converter.display(value);
            expect(result.value).not.equals(value);
            expect(result.value).equals(1.5);
        },
        async "currency inputs are case-insensitive"() {
            const converter = makeCurrencyConverter({
                locale,
                currencies: currencies.map(code => code === "CAD" ? "Cad" : code),
                baseCurrency: "usD",
                persistence: mockPersistence.standard(),
                listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.success(),
            });
            await converter.exchangeRatesDownload;
            converter.setCurrencyPreference("cAd");
            const value = 1;
            const result = converter.display(value);
            expect(result.value).not.equals(value);
            expect(result.value).equals(1.5);
        },
        async "fresh startup will guess currency by locale"() {
            const converter = makeCurrencyConverter({
                locale: "en-gb",
                currencies,
                baseCurrency: "USD",
                persistence: mockPersistence.standard(),
                listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.success(),
            });
            expect(converter.currencyPreference).equals("GBP");
        },
        async "don't bother downloading rates when it's just the baseCurrency"() {
            const downloadCounter = mockExchangeRateDownloaders.downloadCounter();
            const converter = makeCurrencyConverter({
                locale,
                currencies: ["USD"],
                baseCurrency: "USD",
                persistence: mockPersistence.standard(),
                listenForStorageChange,
                downloadExchangeRates: downloadCounter.download,
            });
            await converter.exchangeRatesDownload;
            expect(downloadCounter.count).equals(0);
        },
    },
    "persistence": {
        async "currency preference is remembered"() {
            const persistence = mockPersistence.standard();
            {
                const converter1 = makeCurrencyConverter({
                    locale,
                    currencies,
                    persistence,
                    baseCurrency: "USD",
                    listenForStorageChange,
                    downloadExchangeRates: mockExchangeRateDownloaders.success(),
                });
                await converter1.exchangeRatesDownload;
                expect(converter1.currencyPreference).equals("USD");
                converter1.setCurrencyPreference("CAD");
                expect(converter1.currencyPreference).equals("CAD");
            }
            {
                const converter2 = makeCurrencyConverter({
                    locale,
                    currencies,
                    persistence,
                    baseCurrency: "USD",
                    listenForStorageChange,
                    downloadExchangeRates: mockExchangeRateDownloaders.success(),
                });
                await converter2.exchangeRatesDownload;
                expect(converter2.currencyPreference).equals("CAD");
            }
        },
        async "change to currency preference in other tab propagates to all tabs"() {
            const context = mockPersistence.multipleTabsSharingOneStorage();
            const tab1 = context.makeTab();
            const converter1 = makeCurrencyConverter({
                locale,
                currencies,
                baseCurrency: "USD",
                persistence: tab1.persistence,
                listenForStorageChange: tab1.listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.success(),
            });
            await converter1.exchangeRatesDownload;
            expect(converter1.currencyPreference).equals("USD");
            converter1.setCurrencyPreference("CAD");
            tab1.triggerStorageChangeOnAllOtherTabs();
            expect(converter1.currencyPreference).equals("CAD");
            const tab2 = context.makeTab();
            const converter2 = makeCurrencyConverter({
                locale,
                currencies,
                baseCurrency: "USD",
                persistence: tab2.persistence,
                listenForStorageChange: tab2.listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.success(),
            });
            await converter2.exchangeRatesDownload;
            expect(converter2.currencyPreference).equals("CAD");
            converter2.setCurrencyPreference("GBP");
            tab2.triggerStorageChangeOnAllOtherTabs();
            expect(converter2.currencyPreference).equals("GBP");
            expect(converter1.currencyPreference).equals("GBP");
        },
        async "exchange rates are cached"() {
            const persistence = mockPersistence.standard();
            const downloadCounter = mockExchangeRateDownloaders.downloadCounter();
            {
                const converter1 = makeCurrencyConverter({
                    locale,
                    currencies,
                    persistence,
                    baseCurrency: "USD",
                    listenForStorageChange,
                    downloadExchangeRates: downloadCounter.download,
                });
                await converter1.exchangeRatesDownload;
                converter1.setCurrencyPreference("CAD");
                const value = 1;
                const result = converter1.display(value);
                expect(result.value).not.equals(value);
                expect(result.value).equals(1.5);
            }
            expect(downloadCounter.count).equals(1);
            {
                const converter2 = makeCurrencyConverter({
                    locale,
                    currencies,
                    persistence,
                    baseCurrency: "USD",
                    listenForStorageChange,
                    downloadExchangeRates: downloadCounter.download,
                });
                await converter2.exchangeRatesDownload;
                converter2.setCurrencyPreference("CAD");
                const value = 1;
                const result = converter2.display(value);
                expect(result.value).not.equals(value);
                expect(result.value).equals(1.5);
            }
            expect(downloadCounter.count).equals(1);
        },
        async "when exchange rates cache expires, rates are redownloaded"() {
            const persistence = mockPersistence.standard();
            persistence.cacheLifespan = 1;
            const downloadCounter = mockExchangeRateDownloaders.downloadCounter();
            {
                const converter1 = makeCurrencyConverter({
                    locale,
                    currencies,
                    persistence,
                    baseCurrency: "USD",
                    listenForStorageChange,
                    downloadExchangeRates: downloadCounter.download,
                });
                await converter1.exchangeRatesDownload;
                converter1.setCurrencyPreference("CAD");
                const value = 1;
                const result = converter1.display(value);
                expect(result.value).not.equals(value);
                expect(result.value).equals(1.5);
            }
            expect(downloadCounter.count).equals(1);
            await nap(2);
            {
                const converter2 = makeCurrencyConverter({
                    locale,
                    currencies,
                    persistence,
                    baseCurrency: "USD",
                    listenForStorageChange,
                    downloadExchangeRates: downloadCounter.download,
                });
                await converter2.exchangeRatesDownload;
                converter2.setCurrencyPreference("CAD");
                const value = 1;
                const result = converter2.display(value);
                expect(result.value).not.equals(value);
                expect(result.value).equals(1.5);
            }
            expect(downloadCounter.count).equals(2);
        },
        async "cached exchange rates with too many currencies are trimmed down"() {
            const persistence = mockPersistence.standard();
            {
                const converter1 = makeCurrencyConverter({
                    locale,
                    baseCurrency: "USD",
                    currencies: ["CAD", "AUD", "GBP", "EUR", "JPY"],
                    persistence,
                    listenForStorageChange,
                    downloadExchangeRates: mockExchangeRateDownloaders.success(),
                });
                await converter1.exchangeRatesDownload;
                expect(Object.keys(converter1.availableCurrencies).length).equals(6);
            }
            {
                const converter2 = makeCurrencyConverter({
                    locale,
                    baseCurrency: "USD",
                    currencies: ["CAD"],
                    persistence,
                    listenForStorageChange,
                    downloadExchangeRates: mockExchangeRateDownloaders.success(),
                });
                await converter2.exchangeRatesDownload;
                expect(Object.keys(converter2.availableCurrencies).length).equals(2);
            }
        },
        async "cached exchange rates that are insufficient, are ignored, and a new download happens"() {
            const persistence = mockPersistence.standard();
            {
                const converter1 = makeCurrencyConverter({
                    locale,
                    baseCurrency: "USD",
                    currencies: ["CAD"],
                    persistence,
                    listenForStorageChange,
                    downloadExchangeRates: mockExchangeRateDownloaders.success(),
                });
                await converter1.exchangeRatesDownload;
                expect(Object.keys(converter1.availableCurrencies).length).equals(2);
            }
            {
                const downloadCounter = mockExchangeRateDownloaders.downloadCounter();
                const converter2 = makeCurrencyConverter({
                    locale,
                    baseCurrency: "USD",
                    currencies: ["CAD", "AUD", "GBP", "EUR", "JPY"],
                    persistence,
                    listenForStorageChange,
                    downloadExchangeRates: downloadCounter.download,
                });
                await converter2.exchangeRatesDownload;
                expect(downloadCounter.count).equals(1);
                expect(Object.keys(converter2.availableCurrencies).length).equals(6);
            }
        },
    },
    "fail gracefully": {
        async "failed exchange rate download, results in no conversions"() {
            const converter = makeCurrencyConverter({
                locale,
                currencies,
                baseCurrency: "USD",
                persistence: mockPersistence.standard(),
                listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.fail(),
            });
            await converter.exchangeRatesDownload;
            expect(converter.display(1).value).equals(1);
            converter.setCurrencyPreference("CAD");
            expect(converter.currencyPreference).equals("CAD");
            expect(converter.targetCurrency).equals("USD");
            const money = converter.display(1.00);
            expect(money.currency.code).equals("USD");
            expect(money.value).equals(1.00);
        },
        async "remembering insufficient exchange rates, results in fresh download"() {
            const downloadCounter = mockExchangeRateDownloaders.downloadCounter();
            const persistence = mockPersistence.standard();
            const ratesCache = cache({
                lifespan: persistence.cacheLifespan,
                storage: persistence.storage,
                storageKey: persistence.storageKeys.exchangeRatesCache,
                load: async () => undefined,
            });
            const insufficientExchangeRates = clone(exchangeRates);
            delete insufficientExchangeRates.GBP;
            await ratesCache.write({ exchangeRates: insufficientExchangeRates });
            const converter = makeCurrencyConverter({
                locale,
                currencies: [...currencies],
                baseCurrency: "USD",
                persistence: mockPersistence.standard(),
                listenForStorageChange,
                downloadExchangeRates: downloadCounter.download,
            });
            await converter.exchangeRatesDownload;
            expect(downloadCounter.count).equals(1);
            expect(converter.snap.state.exchangeRates).defined();
            expect(converter.display(1).value).equals(1);
        },
        async "if fresh rates are downloaded, but insufficient, ignore the rates"() {
            const insufficientExchangeRates = clone(exchangeRates);
            delete insufficientExchangeRates.GBP;
            const converter = makeCurrencyConverter({
                locale,
                currencies,
                baseCurrency: "USD",
                persistence: mockPersistence.standard(),
                listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders
                    .useTheseRates(insufficientExchangeRates),
            });
            await converter.exchangeRatesDownload;
            expect(converter.snap.state.exchangeRates).not.defined();
            expect(converter.display(1).value).equals(1);
        },
        async "setting an unknown currency preference, falls back on baseCurrency"() {
            const converter = makeCurrencyConverter({
                locale,
                currencies,
                baseCurrency: "USD",
                persistence: mockPersistence.standard(),
                listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.success(),
            });
            await converter.exchangeRatesDownload;
            converter.setCurrencyPreference("LOL");
            const value = 1;
            const result = converter.display(value);
            expect(converter.targetCurrency).equals("USD");
            expect(result.value).equals(value);
            expect(result.currency.code).equals("USD");
        },
        async "remembering an unknown currency preference, falls back on baseCurrency"() {
            const persistence = mockPersistence.standard();
            persistence.storage.setItem(persistence.storageKeys.currencyPreference, "LOL");
            const converter = makeCurrencyConverter({
                locale,
                currencies,
                persistence,
                baseCurrency: "USD",
                listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.success(),
            });
            await converter.exchangeRatesDownload;
            expect(converter.currencyPreference).equals("USD");
            const value = 1;
            const result = converter.display(value);
            expect(result.value).equals(value);
        },
        async "setting currency preference without rates, falls back on baseCurrency"() {
            const converter = makeCurrencyConverter({
                locale,
                baseCurrency: "USD",
                currencies: ["CAD"],
                persistence: mockPersistence.standard(),
                listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.useTheseRates({
                    USD: 1,
                }),
            });
            await converter.exchangeRatesDownload;
            converter.setCurrencyPreference("CAD");
            expect(converter.targetCurrency).equals(converter.baseCurrency);
        },
        async "remembering currency preference without rates, falls back on baseCurrency"() {
            const persistence = mockPersistence.standard();
            persistence.storage.setItem(persistence.storageKeys.currencyPreference, "CAD");
            const converter = makeCurrencyConverter({
                locale,
                persistence,
                currencies: ["USD", "CAD"],
                baseCurrency: "USD",
                listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.fail(),
            });
            await converter.exchangeRatesDownload;
            expect(converter.targetCurrency).equals(converter.baseCurrency);
        },
        async "specifying to display an unavailable currency, falls back on baseCurrency"() {
            const converter = makeCurrencyConverter({
                locale,
                baseCurrency: "USD",
                currencies: ["USD", "CAD"],
                persistence: mockPersistence.standard(),
                listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.success(),
            });
            await converter.exchangeRatesDownload;
            const money = converter.display(1234.56, { currency: "ROFL" });
            expect(money.currency.code).equals(converter.baseCurrency);
        },
    },
    "fail hard": {
        async "unknown baseCurrency throws an error"() {
            await expect(async () => makeCurrencyConverter({
                locale,
                currencies,
                baseCurrency: "LOL",
                persistence: mockPersistence.standard(),
                listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.success(),
            })).throws();
        },
        async "unsupported currency throws an error"() {
            expect(() => makeCurrencyConverter({
                locale,
                currencies: [...currencies, "LOL"],
                baseCurrency: "USD",
                persistence: mockPersistence.standard(),
                listenForStorageChange,
                downloadExchangeRates: mockExchangeRateDownloaders.success(),
            })).throws();
        },
    },
};
//# sourceMappingURL=currency-converter.test.js.map