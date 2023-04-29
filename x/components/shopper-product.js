var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property } from "lit/decorators.js";
import { html, css } from "lit";
import { LightDom } from "../framework/light-dom.js";
import { isDefined } from "../toolbox/is-defined.js";
import { calculatePercentOff } from "../toolbox/calculate-percent-off.js";
import { chooseShopifyId } from "../toolbox/shopify-ids/choose-shopify-id.js";
import { LoadableState, LoadableComponent } from "../framework/loadable-component.js";
import { parseImageSize, sizeShopifyImage } from "./shopify-utils/size-shopify-image.js";
export class ShopperProduct extends LightDom(LoadableComponent) {
    constructor() {
        super(...arguments);
        this["in-cart"] = false;
        this["show-image"] = false;
        this["out-of-stock"] = false;
        this._handleAddToCart = () => {
            this.model.actions.addToCart(this.cartItem);
        };
    }
    static get styles() { return [...super.styles, css ``]; }
    get shopifyId() {
        const { gid, uid, link } = this;
        return chooseShopifyId({ gid, uid, link });
    }
    shopperUpdate(state, { getters }) {
        this.cartItem = state.catalog.find(item => item.product.id === this.shopifyId);
        this.loadableState = this.cartItem
            ? LoadableState.Ready
            : state.error
                ? LoadableState.Error
                : LoadableState.Loading;
        this["in-cart"] = getters.itemsInCart.includes(this.cartItem);
        this["out-of-stock"] = this.cartItem
            ? !this.cartItem.product.available
            : false;
        this["sale"] = this.cartItem
            ? isDefined(this.cartItem.product.comparedValue)
                ? calculatePercentOff({
                    currentValue: this.cartItem.product.value,
                    comparisonValue: this.cartItem.product.comparedValue,
                }).toString()
                : undefined
            : undefined;
    }
    renderReady() {
        const { cartItem, _handleAddToCart } = this;
        const href = this["href"];
        const inCart = this["in-cart"];
        const showImage = this["show-image"];
        const outOfStock = this["out-of-stock"];
        const imageSize = this["image-size"];
        const value = this.model.getters.getUnitValue(cartItem);
        const { product } = cartItem;
        const linkify = (content) => href
            ? html `<a href=${href}>${content}</a>`
            : content;
        return !cartItem ? null : html `
			${(showImage && product.image) ? html `
				<div class=product-image>
					${linkify(html `
						<img
							src=${sizeShopifyImage(product.image.src, parseImageSize(imageSize))}
							alt=${product.image.alt}
							/>
					`)}
				</div>
			` : null}
			<div class=product-content>
				<h3 class=title>
					${linkify(html `${product.title}`)}
				</h3>
				${outOfStock
            ? html `<p class=out-of-stock>Out of stock</p>`
            : null}
				<div class=box>
					<crnc-price
						value="${value}"
						comparison="${product.comparedValue}"
					></crnc-price>
					<button
						class=add-to-cart-button
						title=${inCart ? undefined : "Add to Cart"}
						@click=${_handleAddToCart}
						?disabled=${outOfStock || inCart}>
							${outOfStock
            ? "Sold out"
            : inCart ? "In Cart" : "Add to Cart"}
					</button>
				</div>
			</div>
		`;
    }
}
__decorate([
    property({ type: Object })
], ShopperProduct.prototype, "cartItem", void 0);
__decorate([
    property({ type: String, reflect: true })
], ShopperProduct.prototype, "gid", void 0);
__decorate([
    property({ type: String, reflect: true })
], ShopperProduct.prototype, "uid", void 0);
__decorate([
    property({ type: String, reflect: true })
], ShopperProduct.prototype, "link", void 0);
__decorate([
    property({ type: String, reflect: true })
], ShopperProduct.prototype, "href", void 0);
__decorate([
    property({ type: String, reflect: true })
], ShopperProduct.prototype, "sale", void 0);
__decorate([
    property({ type: String, reflect: true })
], ShopperProduct.prototype, "image-size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ShopperProduct.prototype, "in-cart", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ShopperProduct.prototype, "show-image", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ShopperProduct.prototype, "out-of-stock", void 0);
//# sourceMappingURL=shopper-product.js.map