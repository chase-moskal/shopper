import { expect } from "cynic";
import { exchangeRates } from "./testing-tools.js";
import { convertAndFormatCurrency } from "./convert-and-format-currency.js";
export default {
    "respects precision": async () => {
        expect(convertAndFormatCurrency({
            exchangeRates,
            value: 60,
            precision: 0,
            inputCurrency: "CAD",
            outputCurrency: "USD",
        }).price).equals("$40 USD");
    },
};
//# sourceMappingURL=convert-and-format-currency.test.js.map