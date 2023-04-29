
import {property} from "lit/decorators.js"
import {html, css, CSSResultArray} from "lit"

import {ShopperComponent} from "./shopper-component.js"

import loaderSvg from "../icons/feather/loader.svg.js"
import alertTriangleSvg from "../icons/feather/alert-triangle.svg.js"

export enum LoadableState {
	Loading,
	Error,
	Ready,
}

const _state = Symbol()
const _renderError = Symbol()
const _renderLoading = Symbol()

export class LoadableComponent extends ShopperComponent {
	@property({type: String}) errorMessage: string = "error"
	@property({type: String}) loadingMessage: string = "loading..."
	@property({type: Number}) private [_state]: LoadableState = LoadableState.Loading

	set loadableState(value: LoadableState) { this[_state] = value }
	get loadableState(): LoadableState { return this[_state] }

	@property()
	loadingIcon = loaderSvg

	@property()
	errorIcon = alertTriangleSvg

	static get styles(): CSSResultArray {return [css`
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
	`]}

	renderReady() {
		throw new Error("loadable: renderReady must be implemented")
	}

	render() {
		switch (this[_state]) {
			case LoadableState.Loading: return this[_renderLoading]()
			case LoadableState.Error: return this[_renderError]()
			case LoadableState.Ready: return this.renderReady()
		}
	}

	private [_renderLoading]() {
		return html`
			<div class="loadable loading">
				${this.loadingIcon}
				<p>${this.loadingMessage}</p>
			</div>
		`
	}

	private [_renderError]() {
		return html`
			<div class="loadable error">
				${this.errorIcon}
				<p>${this.errorMessage}</p>
			</div>
		`
	}
}
