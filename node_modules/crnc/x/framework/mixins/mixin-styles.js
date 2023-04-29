function arrayize(item) {
    return [item].flat();
}
const notUndefined = (x) => x !== undefined;
function combineStyles(parentStyles, newStyles) {
    var _a;
    const styles = [
        ...((_a = arrayize(parentStyles)) !== null && _a !== void 0 ? _a : []),
        ...arrayize(newStyles),
    ];
    return styles
        .flat()
        .filter(notUndefined);
}
export function mixinStyles(...newStyles) {
    return function (Base) {
        var _a;
        return _a = class extends Base {
            },
            _a.styles = combineStyles(Base.styles, newStyles),
            _a;
    };
}
//# sourceMappingURL=mixin-styles.js.map