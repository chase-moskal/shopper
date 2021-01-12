import { LitElement } from "lit-element";
import { QuantityChangeEvent } from "./events/quantity-change-event.js";
export declare class QuantityInput extends LitElement {
    #private;
    static readonly tag = "quantity-input";
    static readonly QuantityChangeEvent: typeof QuantityChangeEvent;
    static readonly styles: import("lit-element").CSSResult;
    step: number;
    min: number;
    max: number;
    set value(value: number);
    get value(): number;
    onquantitychange: (event: QuantityChangeEvent) => void;
    firstUpdated(): void;
    increment: () => void;
    decrement: () => void;
    render(): import("lit-element").TemplateResult;
}
