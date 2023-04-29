import { adoptStyles, getCompatibleStyle } from "lit";
export function attachStylesToShadowRoot(root, styles) {
    const elementStyles = [];
    if (Array.isArray(styles)) {
        const set = new Set(styles.flat(Infinity).reverse());
        for (const s of set)
            elementStyles.unshift(getCompatibleStyle(s));
    }
    else if (styles !== undefined)
        elementStyles.push(getCompatibleStyle(styles));
    adoptStyles(root, elementStyles);
}
//# sourceMappingURL=attach-styles-to-shadow-root.js.map