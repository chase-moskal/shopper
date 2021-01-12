import { ShopperComponent } from "./shopper-component.js";
import { CSSResultArray } from "lit-element";
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
    static get styles(): CSSResultArray;
    renderReady(): void;
    render(): void | import("lit-element").TemplateResult;
    private [_renderLoading];
    private [_renderError];
}
export {};
