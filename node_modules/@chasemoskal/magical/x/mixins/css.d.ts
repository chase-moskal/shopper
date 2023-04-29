import { LitElement, CSSResultGroup } from "lit";
import { Constructor } from "../toolbox/handy-types.js";
export declare function mixinCss(...newStyles: (undefined | CSSResultGroup)[]): <C extends Constructor<LitElement>>(Base: C) => C;
