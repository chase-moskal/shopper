import { CSSResultArray } from "lit";
import { ShopperComponent } from "./shopper-component.js";
export declare enum LoadableState {
    Loading = 0,
    Error = 1,
    Ready = 2
}
declare const _state: unique symbol;
declare const _renderError: unique symbol;
declare const _renderLoading: unique symbol;
export declare class LoadableComponent extends ShopperComponent {
    errorMessage: string;
    loadingMessage: string;
    private [_state];
    set loadableState(value: LoadableState);
    get loadableState(): LoadableState;
    loadingIcon: import("lit-html").TemplateResult<2>;
    errorIcon: import("lit-html").TemplateResult<2>;
    static get styles(): CSSResultArray;
    renderReady(): void;
    render(): void | import("lit-html").TemplateResult<1>;
    private [_renderLoading];
    private [_renderError];
}
export {};
