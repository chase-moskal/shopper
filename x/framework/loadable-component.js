var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
import { property } from "lit/decorators.js";
import { html, css } from "lit";
import { ShopperComponent } from "./shopper-component.js";
import loaderSvg from "../icons/feather/loader.svg.js";
import alertTriangleSvg from "../icons/feather/alert-triangle.svg.js";
export var LoadableState;
(function (LoadableState) {
    LoadableState[LoadableState["Loading"] = 0] = "Loading";
    LoadableState[LoadableState["Error"] = 1] = "Error";
    LoadableState[LoadableState["Ready"] = 2] = "Ready";
})(LoadableState || (LoadableState = {}));
const _state = Symbol();
const _renderError = Symbol();
const _renderLoading = Symbol();
export class LoadableComponent extends ShopperComponent {
    constructor() {
        super(...arguments);
        this.errorMessage = "error";
        this.loadingMessage = "loading...";
        this[_a] = LoadableState.Loading;
        this.loadingIcon = loaderSvg;
        this.errorIcon = alertTriangleSvg;
    }
    set loadableState(value) { this[_state] = value; }
    get loadableState() { return this[_state]; }
    static get styles() {
        return [css `
		.loadable {
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: monospace;
			color: var(--shopper-loading-color, currentColor);
		}

		.loadable svg {
			width: 2em;
			height: 2em;
			margin-right: 1em;
		}

		@keyframes loadable-spin {
			from { transform: rotate(0deg); }
			to { transform: rotate(360deg); }
		}

		@keyframes loadable-fade {
			from { opacity: 0.8; }
			to { opacity: 0.4; }
		}

		.loadable.loading svg {
			opacity: 0.5;
			animation:
				loadable-spin 10s linear infinite,
				loadable-fade 500ms linear infinite alternate;
		}

		.loadable.error {
			color: var(--shopper-loading-error, maroon);
		}
	`];
    }
    renderReady() {
        throw new Error("loadable: renderReady must be implemented");
    }
    render() {
        switch (this[_state]) {
            case LoadableState.Loading: return this[_renderLoading]();
            case LoadableState.Error: return this[_renderError]();
            case LoadableState.Ready: return this.renderReady();
        }
    }
    [(_a = _state, _renderLoading)]() {
        return html `
			<div class="loadable loading">
				${this.loadingIcon}
				<p>${this.loadingMessage}</p>
			</div>
		`;
    }
    [_renderError]() {
        return html `
			<div class="loadable error">
				${this.errorIcon}
				<p>${this.errorMessage}</p>
			</div>
		`;
    }
}
__decorate([
    property({ type: String })
], LoadableComponent.prototype, "errorMessage", void 0);
__decorate([
    property({ type: String })
], LoadableComponent.prototype, "loadingMessage", void 0);
__decorate([
    property({ type: Number })
], LoadableComponent.prototype, _a, void 0);
__decorate([
    property()
], LoadableComponent.prototype, "loadingIcon", void 0);
__decorate([
    property()
], LoadableComponent.prototype, "errorIcon", void 0);
//# sourceMappingURL=loadable-component.js.map