import { LitElement, html } from "lit-element";
import { convertAndFormatCurrency } from "crnc/x/currency-tools/convert-and-format-currency.js";
import { priceDisplayStyles } from "./price-display-styles.js";
export function preparePriceDisplay({ state, reader, currencies, setCurrency, }) {
    return class PriceDisplay extends LitElement {
        constructor() {
            super(...arguments);
            this.toggle = () => {
                this["menu-open"] = !this["menu-open"];
            };
            this._prepareHandleMenuClick = (code) => () => {
                setCurrency(code);
                this.toggle();
            };
        }
        static get properties() {
            return {
                value: { type: Number, reflect: true },
                right: { type: Boolean, reflect: true },
                precision: { type: Number, reflect: true },
                comparedValue: { type: Number, reflect: true },
                ["menu-open"]: { type: Boolean, reflect: true },
            };
        }
        static get styles() { return priceDisplayStyles; }
        connectedCallback() {
            super.connectedCallback();
            this._unsubscribe = reader.subscribe(() => this.requestUpdate());
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            if (this._unsubscribe)
                this._unsubscribe();
            this._unsubscribe = null;
        }
        render() {
            const { ["menu-open"]: menuOpen, value = 0, precision = 2, comparedValue, } = this;
            const { exchangeRates, inputCurrency, outputCurrency, } = state;
            const price = convertAndFormatCurrency({
                value,
                precision,
                exchangeRates,
                inputCurrency,
                outputCurrency,
            });
            const comparedPrice = comparedValue
                ? convertAndFormatCurrency({
                    value: comparedValue,
                    precision,
                    exchangeRates,
                    inputCurrency,
                    outputCurrency,
                })
                : null;
            const calculatePercentOff = () => {
                const difference = comparedPrice.value - price.value;
                const fraction = difference / comparedPrice.value;
                const percentage = Math.round(fraction * 100);
                return percentage;
            };
            const currencyIsConverted = inputCurrency !== outputCurrency;
            const conversionMark = currencyIsConverted ? "*" : "";
            return html `
				<div class="price-display">
					<div class="price-area">
						<span class="symbol">${price.currency.symbol}</span
						><span class="amount">${price.amount}</span>
						<button class="code" @click=${this.toggle}>
							${price.currency.code}${conversionMark}<span class="down">▼</span>
						</button>
						${menuOpen ? html `
							<div class="blanket" @click=${this.toggle}></div>
							<ul class="menu">
								${Object.values(currencies).map(({ symbol, code, name }) => html `
									<li>
										<button @click=${this._prepareHandleMenuClick(code)}>
											<span class="menu-symbol">${symbol}</span
											><span class="menu-star">${code === inputCurrency ? "" : "*"}</span>
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
						` : html ``}
					</div>
					${comparedPrice ? html `
						<div class="discount-area">
							<span class="compared">
								<span class="symbol">${comparedPrice.currency.symbol}</span
								><span class="amount">${comparedPrice.amount}</span>
							</span>
							<span class="percent-off">${calculatePercentOff()}% off</span>
						</div>
					` : null}
				</div>
			`;
        }
    };
}
//# sourceMappingURL=price-display.js.map