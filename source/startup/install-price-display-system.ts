
import {LitElement, property, css, html} from "lit-element"

import {CurrencyExchangeRates, Currencies} from "crnc/dist/interfaces.js"
import {assumeUserCurrency} from "crnc/dist/ecommerce/assume-user-currency.js"
import {ascertainEcommerceDetails} from "crnc/dist/ecommerce/ascertain-ecommerce-details.js"
import {convertAndFormatCurrency} from "crnc/dist/currency-tools/convert-and-format-currency.js"
import {currencies as defaultCurrencies} from "crnc/dist/ecommerce/currencies.js"

import {makeReader} from "../toolbox/pubsub.js"
import {registerComponents} from "../toolbox/register-components.js"
import {createCurrencyStorage} from "../model/create-currency-storage.js"
import {SimpleDataStore} from "../toolbox/simple-data-store.js"
import {CurrencyStorage} from "../interfaces.js"

export interface PriceModelState {
	inputCurrency: string
	outputCurrency: string
	exchangeRates: CurrencyExchangeRates
}

export async function installPriceDisplaySystem({
	ratesUrl,
	baseCurrency,
	currencies = defaultCurrencies,
	currencyStorage = createCurrencyStorage({
		key: "price-display-currency",
		dataStore: new SimpleDataStore({storage: localStorage})
	})
}: {
	baseCurrency: string
	ratesUrl?: string
	currencies?: Currencies
	currencyStorage?: CurrencyStorage
}) {
	if (!baseCurrency) throw new Error("baseCurrency is not defined")
	baseCurrency = baseCurrency.toUpperCase()

	const state: PriceModelState = {
		exchangeRates: {[baseCurrency]: 1},
		inputCurrency: baseCurrency,
		outputCurrency: baseCurrency,
	}

	const {reader, update} = makeReader(state)

	const setCurrency = (code: string) => {
		state.outputCurrency = code
		update()
	}

	class PriceDisplay extends LitElement {
		@property({type: Boolean, reflect: true}) ["menu-open"]: boolean = false
		@property({type: Number, reflect: true}) value: number
		@property({type: Number, reflect: true}) precision: number

		static get styles() {return css`
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}

			*:focus {
				outline: var(--focus-outline, 2px solid cyan);
			}

			:host {
				display: inline-block;
				min-width: 8em;
			}

			.price-display {
				position: relative;
				font-size: 1em;
			}

			.price-display > span {
				display: inline-block;
			}

			.symbol {
				font-size: 0.8em;
				vertical-align: top;
			}

			button {
				border: none;
				background: transparent;
				font: inherit;
				color: inherit;
				text-align: inherit;
				line-height: 1em;
			}

			.code {
				font-size: 0.8em;
				padding: 0.1em;
				display: inline-block;
				cursor: pointer;
				border: 1px solid transparent;
				border-radius: 3px;
			}

			.code:hover {
				border: 1px solid rgba(128,128,128, 0.2);
			}

			.code .down {
				opacity: 0.5;
				font-size: 0.8em;
				margin-left: 0.2em;
			}

			.menu {
				font-size: 0.8em;
				list-style: none;
				position: absolute;
				top: 100%;
				left: 0;
				width: 100%;
				z-index: 1;
				text-align: left;
				border-radius: 3px;
				overflow: hidden;
			}

			.menu > li > button {
				display: block;
				width: 100%;
				padding: 0.6em;
				background: white;
				color: #222;
				cursor: pointer;
			}

			.menu > li > button:hover,
			.menu > li > button:focus {
				background: deepskyblue;
				color: white;
			}
			.menu > li > button:active {
				background: #0080ab;
			}


			.menu > li > button > span {
				vertical-align: middle;
			}

			.menu-symbol {
				font-size: 1.2em;
				font-weight: bold;
			}

			.menu-name {
				font-size: 0.8em;
				margin-left: 0.5em;
			}

			.blanket {
				position: fixed;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				background: rgba(0,0,0, 0.5);
				z-index: 1;
				backdrop-filter: var(--price-blanket-backdrop, blur(5px));
				-webkit-backdrop-filter: var(--price-blanket-backdrop, blur(5px));
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
