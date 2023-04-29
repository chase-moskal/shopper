import { LitElement } from "lit";
import { Constructor } from "../toolbox/handy-types.js";
export declare function mixinRefreshInterval(milliseconds: number): <C extends Constructor<LitElement>>(Base: C) => C;
