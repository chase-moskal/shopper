var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, property, svg } from "lit-element";
import { LightDom } from "../framework/light-dom.js";
import { LoadableState, LoadableComponent } from "../framework/loadable-component.js";
import { shopperCartStyles } from "./shopper-cart-styles.js";
export class ShopperCart extends LightDom(LoadableComponent) {
    constructor() {
        super(...arguments);
        this.onFirstAdd = () => { };
        this._lastQuantity = 0;
        this._handleCheckoutButtonClick = () => this.model.actions.checkout({
            checkoutInSameWindow: !!this["checkout-in-same-window"]
        });
    }
    static get styles() { return [...super.styles, shopperCartStyles]; }
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
        return html `
			<section class="shopper-cart">
				${this._renderCartTitle()}
				${cartIsEmpty ? null : html `
					${this._renderCartLineItems()}
					<div class="cart-checkout">
						<button
							class="checkout-button"
							title="Checkout Cart"
							@click=${this._handleCheckoutButtonClick}
							?disabled=${checkoutInProgress}
							?hidden=${cartIsEmpty}>
								Checkout!
							</button>
						</div>
					</div>
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
							<price-display right value="${cartValue}"></price-display>
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
							${svg `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/></svg>`}
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
					<price-display right value="${lineValue}" comparedValue=${lineComparedValue}></price-display>
				</td>
			</tr>
		`;
    }
}
__decorate([
    property({ type: Boolean })
], ShopperCart.prototype, "checkout-in-same-window", void 0);
//# sourceMappingURL=shopper-cart.js.map