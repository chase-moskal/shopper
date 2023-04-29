import { dashify } from "./toolbox/dashify.js";
export function registerElements(elements) {
    for (const [name, element] of Object.entries(elements))
        customElements.define(dashify(name), element);
}
//# sourceMappingURL=register-elements.js.map