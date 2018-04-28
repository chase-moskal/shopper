
import {Exchanger, Rates} from "./currency"

describe("currency", () => {

	describe("exchanger class", () => {
		const rates: Rates = {
			CAD: 1.0,
			USD: 2.0,
			GBP: 3.0
		}

		xtest("exchange from base currency", async() => {
			const exchanger = new Exchanger({rates})
			const {value} = exchanger.exchangeCurrency({
				value: 100,
				input: "CAD",
				output: "USD"
			})
			expect(value).toBe(50)
		})

		xtest("exchange to base currency", async() => {
			const exchanger = new Exchanger({rates})
			const {value} = exchanger.exchangeCurrency({
				value: 100,
				input: "USD",
				output: "CAD"
			})
			expect(value).toBe(200)
		})
	})
})
