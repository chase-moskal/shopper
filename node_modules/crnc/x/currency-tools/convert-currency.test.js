import { expect } from "cynic";
import { exchangeRates } from "./testing-tools.js";
import { convertCurrency } from "./convert-currency.js";
export default {
    "convert values": async () => {
        expect(convertCurrency({
            value: 100,
            inputCurrency: "GBP",
            outputCurrency: "USD",
            exchangeRates,
        })).equals(200);
        expect(convertCurrency({
            value: 200,
            inputCurrency: "USD",
            outputCurrency: "GBP",
            exchangeRates,
        })).equals(100);
        expect(convertCurrency({
            value: 60,
            inputCurrency: "CAD",
            outputCurrency: "USD",
            exchangeRates,
        })).equals(40);
    },
    "survives same input/output currencies": async () => {
        expect(convertCurrency({
            value: 123,
            inputCurrency: "CAD",
            outputCurrency: "CAD",
            exchangeRates,
        })).equals(123);
    },
    "throws on invalid currency": async () => {
        expect(() => convertCurrency({
            value: 100,
            inputCurrency: "xyz",
            outputCurrency: "USD",
            exchangeRates,
        })).throws();
        expect(() => convertCurrency({
            value: 100,
            inputCurrency: null,
            outputCurrency: "USD",
            exchangeRates,
        })).throws();
        expect(() => convertCurrency({
            value: 100,
            inputCurrency: "",
            outputCurrency: "USD",
            exchangeRates,
        })).throws();
        expect(() => convertCurrency({
            value: 100,
            inputCurrency: "GBP",
            outputCurrency: "xyz",
            exchangeRates,
        })).throws();
    },
};
//# sourceMappingURL=convert-currency.test.js.map