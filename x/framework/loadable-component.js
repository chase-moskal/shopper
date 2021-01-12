var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
import { ShopperComponent } from "./shopper-component.js";
import { property, html, css, svg } from "lit-element";
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
			color: #444;
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
			color: maroon;
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
				${svg `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`}
				<p>${this.loadingMessage}</p>
			</div>
		`;
    }
    [_renderError]() {
        return html `
			<div class="loadable error">
				${svg `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line></svg>`}
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
//# sourceMappingURL=loadable-component.js.map