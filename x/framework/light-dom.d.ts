import { LitElement, CSSResultArray } from "lit-element";
export declare function LightDom<T extends {
    styles: CSSResultArray;
    new (...args: any[]): LitElement;
}>(C: T): T;
