import * as crnc from "crnc";
export function setupCrnc(config) {
    const { baseCurrency, currencies } = crnc.parseConfig({
        baseCurrency: config.baseCurrency,
        currencies: config.currencies,
        errorLabel: "<shopper-config> error:",
    });
    try {
        const currencyConverter = crnc.makeCurrencyConverter({
            baseCurrency,
            currencies,
        });
        const components = crnc.prepareComponents({ currencyConverter });
        return { currencyConverter, components };
    }
    catch (error) {
        error.message = `shopper startup error in crnc: ${error.message}`;
        throw error;
    }
}
//# sourceMappingURL=setup-crnc.js.map