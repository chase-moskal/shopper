export function mixinContext(providedContext) {
    return function (Base) {
        return class extends Base {
            get context() {
                return providedContext;
            }
        };
    };
}
export function mixinRequireContext(name) {
    return function (Base) {
        return class extends Base {
            get context() {
                throw new Error(`context required by component${name ? " " + name : ""}`);
            }
        };
    };
}
//# sourceMappingURL=mixin-context.js.map