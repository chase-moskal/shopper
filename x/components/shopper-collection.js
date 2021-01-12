var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property, css, html } from "lit-element";
import { LightDom } from "../framework/light-dom.js";
import { LoadableState, LoadableComponent, } from "../framework/loadable-component.js";
export class ShopperCollection extends LightDom(LoadableComponent) {
    constructor() {
        super(...arguments);
        this.items = null;
    }
    static get styles() {
        return [...super.styles, css `
	`];
    }
    shopperUpdate(state) {
        const { uid, all } = this;
        this.items = all
            ? [...state.catalog]
            : uid
                ? state.catalog.filter(item => item.product.collections.includes(uid))
                : [];
        this.loadableState = (this.items && this.items.length > 0)
            ? LoadableState.Ready
            : state.error
                ? LoadableState.Error
                : LoadableState.Loading;
    }
    renderReady() {
        const { items: cartItems } = this;
        return html `
			<ol>
				${cartItems && cartItems.map(cartItem => html `
					<li>
						<shopper-product
							show-image=${this["show-images"]}
							uid=${cartItem.product.id}
						></shopper-product>
					</li>
				`)}
			</ol>
		`;
    }
}
__decorate([
    property({ type: String, reflect: true })
], ShopperCollection.prototype, "uid", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ShopperCollection.prototype, "all", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ShopperCollection.prototype, "show-images", void 0);
__decorate([
    property({ type: Array })
], ShopperCollection.prototype, "items", void 0);
//# sourceMappingURL=shopper-collection.js.map