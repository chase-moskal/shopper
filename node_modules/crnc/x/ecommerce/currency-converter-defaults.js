export const oneHour = 1000 * 60 * 60;
export const defaultPersistenceStorageKeys = Object.freeze({
    exchangeRatesCache: "crnc-exchange-rates-cache",
    currencyPreference: "crnc-currency-preference",
});
export const defaultPersistence = () => ({
    storage: window.localStorage,
    cacheLifespan: oneHour,
    storageKeys: defaultPersistenceStorageKeys,
});
export const defaultListenForStorageChange = ((persistence) => ({ reloadCurrencyPreference }) => window.addEventListener("storage", storageEvent => {
    const storageEventIsRelevant = storageEvent.storageArea === persistence.storage
        && storageEvent.key === persistence.storageKeys.currencyPreference;
    if (storageEventIsRelevant)
        reloadCurrencyPreference();
}));
//# sourceMappingURL=currency-converter-defaults.js.map