import { Constructor } from "../toolbox/handy-types.js";
export declare function mixinContextRequirement<xContext>(): <C extends Constructor<{}>>(Base: C) => {
    new (...args: any[]): {
        readonly context: xContext;
    };
    withContext(context: xContext): {
        new (...args: any[]): {
            readonly context: xContext;
        };
        withContext(context: xContext): any & C;
    } & C;
} & C;
