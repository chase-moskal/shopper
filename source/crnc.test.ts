
import {exchangeCurrency, formatCurrency} from "./crnc"

describe("crnc", () => {

	describe("exchange currency - function", () => {
		const rates = {
			CAD: 3.0,
			USD: 2.0,
			GBP: 1.0
		}

		it("converts values", async() => {
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

		it("survives same input/output currencies", async() => {
			expect(exchangeCurrency({
				value: 123,
				input: "CAD",
				output: "CAD",
				rates
			})).toBe(123)
		})

		it("throws on invalid currency", async() => {
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
				output: "xyz",
				rates
			})).toThrow()
		})
	})

	describe("format currency - function", () => {
		const locale = "en-US"

		it("displays human-readable currency", async() => {
			expect(formatCurrency({cents: 123, currency: "CAD", locale}))
				.toBe("$1.23 CAD")
			expect(formatCurrency({cents: 123, currency: "XBT", locale}))
				.toBe("Ƀ1.23000000 XBT")
			expect(formatCurrency({cents: 123456, currency: "CAD", locale}))
				.toBe("$1,234.56 CAD")
		})

		it("throws on unknown currency", async() => {
			expect(() => formatCurrency({cents: 123, currency: "xyz", locale})).toThrow()
		})
	})
})
