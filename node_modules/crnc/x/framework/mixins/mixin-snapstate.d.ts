import { LitElement } from "lit";
import { Subscription } from "@chasemoskal/snapstate";
import { Constructor } from "../component-types.js";
export type Subscribe = (subscription: Subscription<any>) => () => void;
export declare function mixinSnapstateSubscriptions(...subscribes: Subscribe[]): <C extends Constructor<LitElement>>(Base: C) => C;
