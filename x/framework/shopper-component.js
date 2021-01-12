import { LitElement } from "lit-element";
const _unsubscribe = Symbol();
export class ShopperComponent extends LitElement {
    constructor() {
        super(...arguments);
        this.model = this.constructor.model;
    }
    shopperUpdate(state, model) { }
    connectedCallback() {
        super.connectedCallback();
        const { model } = this;
        if (!model)
            throw new Error("shopper components require model");
        this.shopperUpdate(model.reader.state, model);
        this[_unsubscribe] = model.reader.subscribe((state) => {
            this.shopperUpdate(state, model);
            this.requestUpdate();
        });
    }
    disconnectedCallback() {
        this[_unsubscribe]();
        this[_unsubscribe] = null;
        super.disconnectedCallback();
    }
}
//# sourceMappingURL=shopper-component.js.map