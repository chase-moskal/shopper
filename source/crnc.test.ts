
import {exchangeCurrency, formatCurrency} from "./crnc"

describe("currency", () => {

	describe("exchange function", () => {
		const rates = {
			CAD: 3.0,
			USD: 2.0,
			GBP: 1.0
		}

		test("convert currency values", async() => {
			expect(exchangeCurrency({
				value: 100,
				input: "GBP",
				output: "USD",
				rates
			})).toBe(200)
			expect(exchangeCurrency({
				value: 200,
				input: "USD",
				output: "GBP",
				rates
			})).toBe(100)
			expect(exchangeCurrency({
				value: 60,
				input: "CAD",
				output: "USD",
				rates
			})).toBe(40)
		})

		test("value is fine with same input and output currencies", async() => {
			expect(exchangeCurrency({
				value: 123,
				input: "CAD",
				output: "CAD",
				rates
			})).toBe(123)
		})

		test("throw errors for invalid currencies", async() => {
			expect(() => exchangeCurrency({
				value: 100,
				input: "xyz",
				output: "USD",
				rates
			})).toThrow()
			expect(() => exchangeCurrency({
				value: 100,
				input: null,
				output: "USD",
				rates
			})).toThrow()
			expect(() => exchangeCurrency({
				value: 100,
				input: "",
				output: "USD",
				rates
			})).toThrow()
			expect(() => exchangeCurrency({
				value: 100,
				input: "GBP",
				output: "zyx",
				rates
			})).toThrow()
		})
	})

	describe("format price tag function", () => {
		const locale = "en-US"

		test("formats price tags", async() => {
			expect(formatCurrency({cents: 123, currency: "CAD", locale}))
				.toBe("$1.23 CAD")
			expect(formatCurrency({cents: 123, currency: "XBT", locale}))
				.toBe("Ƀ1.23000000 XBT")
			expect(formatCurrency({cents: 123456, currency: "CAD", locale}))
				.toBe("$1,234.56 CAD")
		})

		test("throws error for unknown formatter", async() => {
			expect(() => formatCurrency({cents: 123, currency: "xyz", locale})).toThrow()
		})
	})
})
