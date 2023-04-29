import { Constructor, Mixin } from "../component-types.js";
export interface WithContext<xContext> {
    get context(): xContext;
}
export declare function mixinContext<xContext>(providedContext: xContext): <C extends Constructor<{}>>(Base: C) => Mixin<C, WithContext<xContext>>;
export declare function mixinRequireContext<xContext>(name?: string): <C extends Constructor<{}>>(Base: C) => Mixin<C, WithContext<xContext>>;
