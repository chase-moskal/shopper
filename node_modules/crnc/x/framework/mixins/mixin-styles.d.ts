import { LitElement, CSSResultGroup } from "lit";
import { Constructor } from "../component-types.js";
export declare function mixinStyles(...newStyles: CSSResultGroup[]): <C extends Constructor<LitElement>>(Base: C) => C;
