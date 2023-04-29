import { expect } from "cynic";
import { formatCurrency } from "./format-currency.js";
const locale = "en-us";
export default {
    "displays human-readable currency": async () => {
        expect(formatCurrency({
            value: 1.23,
            code: "CAD",
            locale,
        }).price).equals("$1.23 CAD");
        expect(formatCurrency({
            value: 1234.56,
            code: "CAD",
            locale,
        }).price).equals("$1,234.56 CAD");
        expect(formatCurrency({
            value: 1234.56,
            code: "GBP",
            locale,
        }).price).equals("£1,234.56 GBP");
    },
    "rounds numbers": async () => {
        expect(formatCurrency({
            value: 1.234,
            code: "CAD",
            locale,
        }).price).equals("$1.23 CAD");
        expect(formatCurrency({
            value: 1.235,
            code: "CAD",
            locale,
        }).price).equals("$1.24 CAD");
        expect(formatCurrency({
            value: 1234567.89,
            code: "CAD",
            precision: 0,
            locale,
        }).price).equals("$1,234,568 CAD");
    },
    "respects precision": async () => {
        expect(formatCurrency({
            value: 123,
            code: "CAD",
            precision: 0,
        }).price).equals("$123 CAD");
        expect(formatCurrency({
            value: 123,
            code: "CAD",
            precision: 1,
        }).price).equals("$123.0 CAD");
    },
    "throws on unknown currency": async () => {
        expect(() => formatCurrency({
            value: 123,
            code: "xyz",
            locale,
        })).throws();
    },
};
//# sourceMappingURL=format-currency.test.js.map