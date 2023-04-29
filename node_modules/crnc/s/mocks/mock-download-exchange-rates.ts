
import {CurrencyExchangeRates, DownloadExchangeRates} from "../interfaces.js"
import {exchangeRates as exampleExchangeRates} from "../currency-tools/testing-tools.js"

const success = (): DownloadExchangeRates => async({currencies}) => {
	const exchangeRates: CurrencyExchangeRates = {}

	for (const code of currencies) {
		exchangeRates[code] = exampleExchangeRates.hasOwnProperty(code)
			? (<any>exampleExchangeRates)[code]
			: 1.0
	}

	return {
		exchangeRates,
	}
}

export const mockExchangeRateDownloaders = {

	success,

	downloadCounter: () => {
		let downloadCount = 0
		const downloader = success()
		return {
			get count() {
				return downloadCount
			},
			download: <DownloadExchangeRates>(async(...params) => {
				downloadCount += 1
				return downloader(...params)
			}),
		}
	},

	fail: (): DownloadExchangeRates => async() => {
		throw new Error("failed to download rates")
	},

	useTheseRates: (exchangeRates: CurrencyExchangeRates) => async() => ({
		exchangeRates,
	}),
}
