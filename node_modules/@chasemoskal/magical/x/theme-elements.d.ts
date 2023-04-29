import { LitElement, CSSResultGroup } from "lit";
import { Constructor } from "./toolbox/handy-types.js";
export declare const themeElements: <xElements extends {
    [key: string]: Constructor<LitElement>;
}>(theme: CSSResultGroup, elements: xElements) => { [P in keyof xElements]: xElements[keyof xElements]; };
