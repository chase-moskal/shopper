import { AnyFunction, DebounceReturn } from "./types.js";
export declare function debounce<xAction extends AnyFunction>(delay: number, action: xAction): DebounceReturn<xAction>;
