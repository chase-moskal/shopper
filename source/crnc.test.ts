
import {exchange, formatPriceTag} from "./crnc"

describe("currency", () => {

	describe("exchange function", () => {
		const rates = {
			CAD: 3.0,
			USD: 2.0,
			GBP: 1.0
		}

		test("convert currency values", async() => {
			expect(exchange({
				value: 100,
				input: "GBP",
				output: "USD",
				rates
			})).toBe(200)
			expect(exchange({
				value: 200,
				input: "USD",
				output: "GBP",
				rates
			})).toBe(100)
			expect(exchange({
				value: 60,
				input: "CAD",
				output: "USD",
				rates
			})).toBe(40)
		})

		test("value is fine with same input and output currencies", async() => {
			expect(exchange({
				value: 123,
				input: "CAD",
				output: "CAD",
				rates
			})).toBe(123)
		})

		test("throw errors for invalid currencies", async() => {
			expect(() => exchange({
				value: 100,
				input: "xyz",
				output: "USD",
				rates
			})).toThrow()
			expect(() => exchange({
				value: 100,
				input: null,
				output: "USD",
				rates
			})).toThrow()
			expect(() => exchange({
				value: 100,
				input: "",
				output: "USD",
				rates
			})).toThrow()
			expect(() => exchange({
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
			expect(formatPriceTag({cents: 123, currency: "CAD", locale}))
				.toBe("$1.23 CAD")
			expect(formatPriceTag({cents: 123, currency: "BTC", locale}))
				.toBe("Ƀ1.23 BTC")
			expect(formatPriceTag({cents: 123456, currency: "CAD", locale}))
				.toBe("$1,234.56 CAD")
		})

		test("throws error for unknown formatter", async() => {
			expect(() => formatPriceTag({cents: 123, currency: "xyz", locale})).toThrow()
		})
	})
})
