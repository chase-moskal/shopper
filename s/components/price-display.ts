
import {LitElement, html} from "lit"
import {CurrencyConverter} from "crnc/x/interfaces.js"

import {priceDisplayStyles} from "./price-display-styles.js"
import {calculatePercentOff} from "../toolbox/calculate-percent-off.js"

export function preparePriceDisplay(
		currencyConverter: CurrencyConverter
	): typeof LitElement {

	return class PriceDisplay extends LitElement {
		static get properties() {
			return {
				value: {type: Number, reflect: true},
				right: {type: Boolean, reflect: true},
				precision: {type: Number, reflect: true},
				comparedValue: {type: Number, reflect: true},
				["menu-open"]: {type: Boolean, reflect: true},
			}
		}

		value: number
		right: boolean
		precision: number
		comparedValue: number
		["menu-open"]: boolean

		static get styles() {return priceDisplayStyles}

		#unsubscribe: () => void

		connectedCallback() {
			super.connectedCallback()
			this.#unsubscribe = currencyConverter.snap.subscribe(() => this.requestUpdate())
		}

		disconnectedCallback() {
			super.disconnectedCallback()
			if (this.#unsubscribe)
				this.#unsubscribe()
			this.#unsubscribe = undefined
		}

		toggle = () => {
			this["menu-open"] = !this["menu-open"]
		}

		private _prepareHandleMenuClick = (code: string) => () => {
			currencyConverter.setCurrencyPreference(code)
			this.toggle()
		}

		render() {
			const {
				["menu-open"]: menuOpen,
				value = 0,
				precision = 2,
				comparedValue,
			} = this

			const {
				baseCurrency,
				targetCurrency,
				availableCurrencies,
			} = currencyConverter

			const price = currencyConverter.display(value, {precision})
			const comparedPrice = comparedValue
				? currencyConverter.display(comparedValue, {precision})
				: null

			const currencyIsConverted = targetCurrency !== baseCurrency
			const conversionMark = currencyIsConverted ? "*" : ""

			return html`
				<div class="price-display">
					<div class="price-area">
						<span class="symbol">${price.currency.symbol}</span
						><span class="amount">${price.amount}</span>
						<button class="code" @click=${this.toggle}>
							${price.currency.code}${conversionMark}<span class="down">▼</span>
						</button>
						${menuOpen ? html`
							<div class="blanket" @click=${this.toggle}></div>
							<ul class="menu">
								${Object.values(availableCurrencies).map(({symbol, code, name}) => html`
									<li>
										<button @click=${this._prepareHandleMenuClick(code)}>
											<span class="menu-symbol">${symbol}</span
											><span class="menu-star">${code === baseCurrency ? "" : "*"}</span>
											<span class="menu-name">${name}</span>
										</button>
									</li>
								`)}
								<div class="menu-note">
									<slot name="menu-note">
										* converted currency: prices are estimates and may be 
										different at checkout
									</slot>
								</div>
							</ul>
						` : html``}
					</div>
					${comparedPrice ? html`
						<div class="discount-area">
							<span class="compared">
								<span class="symbol">${comparedPrice.currency.symbol}</span
								><span class="amount">${comparedPrice.amount}</span>
							</span>
							<span class="percent-off">
								${calculatePercentOff({
									currentValue: price.value,
									comparisonValue: comparedPrice.value,
								})}% off
							</span>
						</div>
					` : null}
				</div>
			`
		}
	}
}
