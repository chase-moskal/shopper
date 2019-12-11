
import {LitElement, css, html} from "lit-element"
import {Currencies} from "crnc/dist/interfaces.js"
import {
	convertAndFormatCurrency
} from "crnc/dist/currency-tools/convert-and-format-currency.js"

import {Reader} from "../toolbox/pubsub.js"
import {priceDisplayStyles} from "./price-display-styles.js"
import {SetCurrency, PriceModelState} from "../interfaces.js"

export function preparePriceDisplay({
	state,
	reader,
	currencies,
	setCurrency,
}: {
	currencies: Currencies
	state: PriceModelState
	setCurrency: SetCurrency
	reader: Reader<PriceModelState>
}): typeof LitElement {

	return class PriceDisplay extends LitElement {
		static get properties() {
			return {
				value: {type: Number, reflect: true},
				right: {type: Boolean, reflect: true},
				precision: {type: Number, reflect: true},
				["menu-open"]: {type: Boolean, reflect: true},
			}
		}

		value: number
		right: boolean
		precision: number
		["menu-open"]: boolean

		static get styles() {return priceDisplayStyles}
	
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
	
		toggle = () => {
			this["menu-open"] = !this["menu-open"]
		}

		private _prepareHandleMenuClick = (code: string) => () => {
			setCurrency(code)
			this.toggle()
		}
	
		render() {
			const {
				["menu-open"]: menuOpen,
				value = 0,
				precision = 2,
			} = this
			const {
				exchangeRates,
				inputCurrency,
				outputCurrency,
			} = state

			const {amount, currency} = convertAndFormatCurrency({
				value,
				precision,
				exchangeRates,
				inputCurrency,
				outputCurrency
			})

			return html`
				<div class="price-display">
					<span class="symbol">${currency.symbol}</span
					><span class="amount">${amount}</span>
					<button class="code" @click=${this.toggle}>
						${currency.code}<span class="down">▼</span>
					</button>
					${menuOpen ? html`
						<div class="blanket" @click=${this.toggle}></div>
						<ul class="menu">
							${Object.values(currencies).map(({symbol, code, name}) => html`
								<li>
									<button @click=${this._prepareHandleMenuClick(code)}>
										<span class="menu-symbol">${symbol}</span>
										<span class="menu-name">${name}</span>
									</button>
								</li>
							`)}
						</ul>
					` : html``}
				</div>
			`
		}
	}
}
