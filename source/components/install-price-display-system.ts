
import {LitElement, property, css, html} from "lit-element"

import {CurrencyExchangeRates} from "crnc/dist/interfaces.js"
import {assumeUserCurrency} from "crnc/dist/ecommerce/assume-user-currency.js"
import {ascertainEcommerceDetails} from "crnc/dist/ecommerce/ascertain-ecommerce-details.js"
import {convertAndFormatCurrency} from "crnc/dist/currency-tools/convert-and-format-currency.js"

import {makeReader} from "../toolbox/pubsub.js"
import {registerComponents} from "../toolbox/register-components.js"

export interface PriceModelState {
	inputCurrency: string
	outputCurrency: string
	exchangeRates: CurrencyExchangeRates
}

export async function installPriceDisplaySystem({ratesUrl, baseCurrency}: {
	baseCurrency: string
	ratesUrl?: string
}) {
	if (!baseCurrency) throw new Error("baseCurrency is not defined")
	baseCurrency = baseCurrency.toUpperCase()

	const state: PriceModelState = {
		exchangeRates: {[baseCurrency]: 1},
		inputCurrency: baseCurrency,
		outputCurrency: baseCurrency,
	}

	const {reader, update} = makeReader(state)

	class PriceDisplay extends LitElement {
		@property({type: Number, reflect: true}) value: number
		@property({type: Number, reflect: true}) precision: number

		static get styles() {return css`
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}
		`}

		private _unsubscribe: any
		connectedCallback() {
			super.connectedCallback()
			this._unsubscribe = reader.subscribe(() => this.requestUpdate())
		}

		disconnectedCallback() {
			super.disconnectedCallback()
			if (this._unsubscribe) this._unsubscribe()
			this._unsubscribe = null
		}

		render() {
			const {value = 0, precision = 2} = this
			const {
				exchangeRates,
				inputCurrency,
				outputCurrency,
			} = state

			const {price, symbol, amount, code} = convertAndFormatCurrency({
				value,
				precision,
				exchangeRates,
				inputCurrency,
				outputCurrency
			})

			return html`
				<div title="${price}">
					<span class="symbol">${symbol}</span
					><span class="amount">${amount}</span>
					<span class="code">${code}</span>
				</div>
			`
		}
	}

	registerComponents({PriceDisplay})

	try {
		const {
			exchangeRates,
			userDisplayCurrency,
		} = await ascertainEcommerceDetails({
			ratesUrl,
			storeBaseCurrency: baseCurrency,
			userDisplayCurrency: assumeUserCurrency({
				fallback: baseCurrency
			}),
		})
		state.exchangeRates = exchangeRates
		state.outputCurrency = userDisplayCurrency
		update()
	}
	catch (error) {
		console.warn(`failed to download exchange rates via ratesUrl "${ratesUrl}"`)
		return null
	}
}
