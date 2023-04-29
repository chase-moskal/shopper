var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CrncPrice_instances, _CrncPrice_toggleMenu, _CrncPrice_prepareMenuClickHandler, _CrncPrice_renderValidPrice, _CrncPrice_renderCurrencyCode, _CrncPrice_renderNoValue;
var CrncPrice_1;
import { html } from "lit";
import { property } from "lit/decorators.js";
import { Component } from "../../framework/component.js";
import { mixinStyles } from "../../framework/mixins/mixin-styles.js";
import { calculatePercentOff } from "../../toolbox/calculate-percent-off.js";
import { mixinContext, mixinRequireContext } from "../../framework/mixins/mixin-context.js";
import crncPriceCss from "./crnc-price.css.js";
let CrncPrice = CrncPrice_1 = class CrncPrice extends mixinRequireContext()(Component) {
    constructor() {
        super(...arguments);
        _CrncPrice_instances.add(this);
        this.right = false;
        _CrncPrice_toggleMenu.set(this, () => {
            this["menu-is-open"] = !this["menu-is-open"];
        });
        _CrncPrice_prepareMenuClickHandler.set(this, (currency) => () => {
            this.context.currencyConverter.setCurrencyPreference(currency);
            __classPrivateFieldGet(this, _CrncPrice_toggleMenu, "f").call(this);
        });
    }
    static withContext(context) {
        return mixinContext(context)(CrncPrice_1);
    }
    render() {
        const { value } = this;
        return value !== undefined
            ? __classPrivateFieldGet(this, _CrncPrice_instances, "m", _CrncPrice_renderValidPrice).call(this, value)
            : __classPrivateFieldGet(this, _CrncPrice_instances, "m", _CrncPrice_renderNoValue).call(this);
    }
};
_CrncPrice_toggleMenu = new WeakMap(), _CrncPrice_prepareMenuClickHandler = new WeakMap(), _CrncPrice_instances = new WeakSet(), _CrncPrice_renderValidPrice = function _CrncPrice_renderValidPrice(value) {
    const { currencyConverter } = this.context;
    const { baseCurrency, availableCurrencies } = currencyConverter;
    const { currency, precision, comparison, "menu-is-open": menuIsOpen, } = this;
    const money = currencyConverter.display(value, { currency, precision });
    const currencyIsConverted = money.currency.code !== baseCurrency;
    const conversionMark = currencyIsConverted ? "*" : "";
    const comparedMoney = comparison
        ? currencyConverter.display(comparison, { currency, precision })
        : undefined;
    const isOnlyBaseCurrency = Object.keys(currencyConverter.availableCurrencies).length === 1;
    const menuIsAllowed = !(isOnlyBaseCurrency || currency);
    const codeButtonClick = menuIsAllowed
        ? __classPrivateFieldGet(this, _CrncPrice_toggleMenu, "f")
        : () => { };
    const showComparison = comparedMoney
        ? comparedMoney.value > money.value
        : false;
    return html `
			<div class="price-display" ?data-menu-is-allowed=${menuIsAllowed}>
				<div class="price-area">
					<span class="symbol">${money.currency.symbol}</span
					><span class="amount">${money.amount}</span>
					${__classPrivateFieldGet(this, _CrncPrice_instances, "m", _CrncPrice_renderCurrencyCode).call(this, {
        currencyCode: money.currency.code,
        menuIsAllowed,
        conversionMark,
        currencyIsConverted,
        codeButtonClick,
    })}
					${menuIsOpen ? html `
						<div class="blanket" @click=${__classPrivateFieldGet(this, _CrncPrice_toggleMenu, "f")}></div>
						<ul class="menu">
							${Object.values(availableCurrencies).map(({ symbol, code, name }) => html `
								<li>
									<button @click=${__classPrivateFieldGet(this, _CrncPrice_prepareMenuClickHandler, "f").call(this, code)}>
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
					` : html ``}
				</div>
				${showComparison ? html `
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
		`;
}, _CrncPrice_renderCurrencyCode = function _CrncPrice_renderCurrencyCode({ currencyCode, conversionMark, menuIsAllowed, currencyIsConverted, codeButtonClick, }) {
    const codeButtonTitle = currencyIsConverted
        ? "estimated currency conversion"
        : "";
    return menuIsAllowed
        ? html `
				<button class="code" @click=${codeButtonClick} title=${codeButtonTitle}>
					${currencyCode}${conversionMark}<span class="down">▼</span>
				</button>
			`
        : html `
				<span class="code" @click=${codeButtonClick} title=${codeButtonTitle}>
					${currencyCode}${conversionMark}
				</span>
			`;
}, _CrncPrice_renderNoValue = function _CrncPrice_renderNoValue() {
    return html `
			--
		`;
};
__decorate([
    property({ type: Number, reflect: true })
], CrncPrice.prototype, "value", void 0);
__decorate([
    property({ type: String, reflect: true })
], CrncPrice.prototype, "currency", void 0);
__decorate([
    property({ type: Number, reflect: true })
], CrncPrice.prototype, "precision", void 0);
__decorate([
    property({ type: Number, reflect: true })
], CrncPrice.prototype, "comparison", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CrncPrice.prototype, "right", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CrncPrice.prototype, "menu-is-open", void 0);
CrncPrice = CrncPrice_1 = __decorate([
    mixinStyles(crncPriceCss)
], CrncPrice);
export { CrncPrice };
//# sourceMappingURL=crnc-price.js.map