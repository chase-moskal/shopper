import { LitElement } from "lit";
import { QuantityChangeEvent } from "./events/quantity-change-event.js";
export declare class QuantityInput extends LitElement {
    #private;
    static readonly tag = "quantity-input";
    static readonly QuantityChangeEvent: typeof QuantityChangeEvent;
    static readonly styles: import("lit").CSSResult;
    step: number;
    min: number;
    max: number;
    set value(value: number);
    get value(): number;
    onquantitychange: (event: QuantityChangeEvent) => void;
    firstUpdated(): void;
    increment: () => void;
    decrement: () => void;
    render(): import("lit-html").TemplateResult<1>;
}
