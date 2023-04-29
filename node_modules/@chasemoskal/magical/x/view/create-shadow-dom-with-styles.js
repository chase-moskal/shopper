import { attachStylesToShadowRoot } from "./attach-styles-to-shadow-root.js";
export function createShadowDomWithStyles(css) {
    const element = document.createElement("span");
    const shadow = element.attachShadow({ mode: "open" });
    attachStylesToShadowRoot(shadow, css);
    return { element, shadow };
}
//# sourceMappingURL=create-shadow-dom-with-styles.js.map