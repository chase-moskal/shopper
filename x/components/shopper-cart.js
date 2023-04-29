var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ShopperCart_instances, _ShopperCart_termsChecked, _ShopperCart_resetTermsCheckedFalse, _ShopperCart_checkoutIsDisabled_get, _ShopperCart_handleTermsChange;
import { html } from "lit";
import { property } from "lit/decorators.js";
import xSvg from "../icons/feather/x.svg.js";
import { LoadableState, LoadableComponent } from "../framework/loadable-component.js";
import { shopperCartStyles } from "./shopper-cart-styles.js";
export class ShopperCart extends LoadableComponent {
    constructor() {
        super(...arguments);
        _ShopperCart_instances.add(this);
        this.onFirstAdd = () => { };
        this._lastQuantity = 0;
        this.removeIcon = xSvg;
        _ShopperCart_termsChecked.set(this, false);
        _ShopperCart_handleTermsChange.set(this, () => {
            const input = this.shadowRoot.querySelector(`[part="terms-checkbox"]`);
            __classPrivateFieldSet(this, _ShopperCart_termsChecked, input.checked, "f");
            this.requestUpdate();
        });
        this._handleCheckoutButtonClick = () => {
            __classPrivateFieldGet(this, _ShopperCart_instances, "m", _ShopperCart_resetTermsCheckedFalse).call(this);
            this.model.actions.checkout({
                checkoutInSameWindow: !!this["checkout-in-same-window"]
            });
        };
    }
    static get styles() { return [...super.styles, shopperCartStyles]; }
    updated() {
        this["checkout-is-disabled"] = __classPrivateFieldGet(this, _ShopperCart_instances, "a", _ShopperCart_checkoutIsDisabled_get);
    }
    shopperUpdate(state, { getters }) {
        // trigger callback when quantity goes from 0 to 1
        const quantity = getters.cartQuantity;
        const { _lastQuantity } = this;
        if (_lastQuantity === 0 && quantity === 1)
            this.onFirstAdd();
        this._lastQuantity = quantity;
        // set loading/error/ready states
        this.loadableState = state.error
            ? LoadableState.Error
            : state.catalog.length > 0
                ? LoadableState.Ready
                : LoadableState.Loading;
    }
    renderReady() {
        const cartIsEmpty = this.model.getters.cartQuantity < 1;
        const { checkoutInProgress } = this.model.reader.state;
        const disabled = __classPrivateFieldGet(this, _ShopperCart_instances, "a", _ShopperCart_checkoutIsDisabled_get);
        const showTermsBox = !checkoutInProgress && this["require-terms-checked"];
        return html `
			<section class="shopper-cart">
				${this._renderCartTitle()}
				${cartIsEmpty ? null : html `
					${this._renderCartLineItems()}
					<slot name="before-checkout"></slot>
					<div class="cart-checkout">
						${showTermsBox ? html `
							<span part=terms-box>
								<input
									type="checkbox"
									part=terms-checkbox
									@change=${__classPrivateFieldGet(this, _ShopperCart_handleTermsChange, "f")}/>
								<slot name=terms-consent part=terms-consent>
									I understand the terms above.
								</slot>
							</span>
						` : null}
						<button
							class="checkout-button"
							part="checkout-button"
							title="Checkout Cart"
							@click=${this._handleCheckoutButtonClick}
							?disabled=${disabled}
							?hidden=${cartIsEmpty}>
								Checkout!
						</button>
					</div>
					<slot name="after-checkout"></slot>
				`}
			</section>
		`;
    }
    _renderCartTitle() {
        const { cartQuantity: quantity } = this.model.getters;
        const { checkedOut } = this.model.reader.state;
        return checkedOut ? html `
			<h2>
				Cart checked out
			</h2>
		` : html `
			<h2>
				<span>Cart</span>
				<span>– ${quantity === 0
            ? "empty"
            : `${quantity} item${quantity === 1
                ? ""
                : "s"}`}</span>
			</h2>
		`;
    }
    _renderCartLineItems() {
        const { getters } = this.model;
        const { itemsInCart, cartValue } = getters;
        const lineItems = itemsInCart.map(item => this._renderCartItem(item));
        return html `
			<table>
				<thead>
					<tr>
						<th>Remove</th>
						<th>Quantity</th>
						<th>Item name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody class="cart-lines">
					${lineItems}
				</tbody>
				<tbody class="cart-subtotal">
					<tr>
						<th colspan="3">Subtotal</th>
						<td>
							<crnc-price right value="${cartValue}"></crnc-price>
						</td>
					</tr>
				</tbody>
			</table>
		`;
    }
    _renderCartItem(item) {
        const { getters, actions } = this.model;
        const handleQuantityChange = ({ detail: value }) => {
            actions.setItemQuantity(item, value);
        };
        const handleRemoveClick = () => actions.setItemQuantity(item, 0);
        const lineValue = getters.getLineValue(item);
        const lineComparedValue = getters.getLineComparedValue(item);
        return html `
			<tr>
				<td class="remove-cell">
					<button
						class="remove-button"
						title="Remove item"
						@click=${handleRemoveClick}>
							${this.removeIcon}
					</button>
				</td>
				<td class="quantity">
					<quantity-input
						.value=${item.quantity}
						.min=${item.quantityMin}
						.max=${item.quantityMax}
						.step=${1}
						@quantitychange=${handleQuantityChange}
					></quantity-input>
				</td>
				<td class="product-title">${item.product.title}</td>
				<td class="line-price">
					<crnc-price right value="${lineValue}" comparison="${lineComparedValue}"></crnc-price>
				</td>
			</tr>
		`;
    }
}
_ShopperCart_termsChecked = new WeakMap(), _ShopperCart_handleTermsChange = new WeakMap(), _ShopperCart_instances = new WeakSet(), _ShopperCart_resetTermsCheckedFalse = function _ShopperCart_resetTermsCheckedFalse() {
    __classPrivateFieldSet(this, _ShopperCart_termsChecked, false, "f");
    this.requestUpdate();
}, _ShopperCart_checkoutIsDisabled_get = function _ShopperCart_checkoutIsDisabled_get() {
    const { checkoutInProgress } = this.model.reader.state;
    const checkboxIndicatesDisabledButton = this["require-terms-checked"] && !__classPrivateFieldGet(this, _ShopperCart_termsChecked, "f");
    return checkoutInProgress || checkboxIndicatesDisabledButton;
};
__decorate([
    property({ type: Boolean })
], ShopperCart.prototype, "checkout-in-same-window", void 0);
__decorate([
    property({ type: Boolean })
], ShopperCart.prototype, "require-terms-checked", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ShopperCart.prototype, "checkout-is-disabled", void 0);
__decorate([
    property()
], ShopperCart.prototype, "removeIcon", void 0);
//# sourceMappingURL=shopper-cart.js.map