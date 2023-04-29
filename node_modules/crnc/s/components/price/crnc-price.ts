
import {html} from "lit"
import {property} from "lit/decorators.js"

import {CurrencyConverter} from "../../interfaces.js"
import {Component} from "../../framework/component.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {calculatePercentOff} from "../../toolbox/calculate-percent-off.js"
import {mixinContext, mixinRequireContext} from "../../framework/mixins/mixin-context.js"

import crncPriceCss from "./crnc-price.css.js"

export interface PriceContext {
	currencyConverter: CurrencyConverter
}

@mixinStyles(crncPriceCss)
export class CrncPrice extends mixinRequireContext<PriceContext>()(Component) {

	static withContext(context: PriceContext) {
		return mixinContext<PriceContext>(context)(CrncPrice)
	}

	@property({type: Number, reflect: true})
	value: number

	@property({type: String, reflect: true})
	currency: string

	@property({type: Number, reflect: true})
	precision: number

	@property({type: Number, reflect: true})
	comparison: number

	@property({type: Boolean, reflect: true})
	right: boolean = false

	@property({type: Boolean, reflect: true})
	"menu-is-open": boolean

	#toggleMenu = () => {
		this["menu-is-open"] = !this["menu-is-open"]
	}

	#prepareMenuClickHandler = (currency: string) => () => {
		this.context.currencyConverter.setCurrencyPreference(currency)
		this.#toggleMenu()
	}

	render() {
		const {value} = this
		return value !== undefined
			? this.#renderValidPrice(value)
			: this.#renderNoValue()
	}

	#renderValidPrice(value: number) {
		const {currencyConverter} = this.context
		const {baseCurrency, availableCurrencies} = currencyConverter
		const {
			currency,
			precision,
			comparison,
			"menu-is-open": menuIsOpen,
		} = this

		const money = currencyConverter.display(value, {currency, precision})

		const currencyIsConverted = money.currency.code !== baseCurrency
		const conversionMark = currencyIsConverted ?"*" :""

		const comparedMoney = comparison
			? currencyConverter.display(comparison, {currency, precision})
			: undefined

		const isOnlyBaseCurrency = Object.keys(
			currencyConverter.availableCurrencies
		).length === 1

		const menuIsAllowed = !(isOnlyBaseCurrency || currency)

		const codeButtonClick = menuIsAllowed
			? this.#toggleMenu
			: () => {}

		const showComparison = comparedMoney
			? comparedMoney.value > money.value
			: false

		return html`
			<div class="price-display" ?data-menu-is-allowed=${menuIsAllowed}>
				<div class="price-area">
					<span class="symbol">${money.currency.symbol}</span
					><span class="amount">${money.amount}</span>
					${this.#renderCurrencyCode({
						currencyCode: money.currency.code,
						menuIsAllowed,
						conversionMark,
						currencyIsConverted,
						codeButtonClick,
					})}
					${menuIsOpen ? html`
						<div class="blanket" @click=${this.#toggleMenu}></div>
						<ul class="menu">
							${Object.values(availableCurrencies).map(({symbol, code, name}) => html`
								<li>
									<button @click=${this.#prepareMenuClickHandler(code)}>
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
				${showComparison ? html`
					<div class="discount-area">
						<span class="compared">
							<span class="symbol">${comparedMoney.currency.symbol}</span
							><span class="amount">${comparedMoney.amount}</span>
						</span>
						<span class="percent-off">
							${calculatePercentOff({
								currentValue: money.value,
								comparisonValue: comparedMoney.value,
							})}% off
						</span>
					</div>
				` : null}
			</div>
		`
	}

	#renderCurrencyCode({
			currencyCode, conversionMark, menuIsAllowed, currencyIsConverted,
			codeButtonClick,
		}: {
			currencyCode: string
			conversionMark: string
			menuIsAllowed: boolean
			currencyIsConverted: boolean
			codeButtonClick: () => void
		}) {

		const codeButtonTitle = currencyIsConverted
			? "estimated currency conversion"
			: ""

		return menuIsAllowed
			? html`
				<button class="code" @click=${codeButtonClick} title=${codeButtonTitle}>
					${currencyCode}${conversionMark}<span class="down">▼</span>
				</button>
			`
			: html`
				<span class="code" @click=${codeButtonClick} title=${codeButtonTitle}>
					${currencyCode}${conversionMark}
				</span>
			`
	}

	#renderNoValue() {
		return html`
			--
		`
	}
}
