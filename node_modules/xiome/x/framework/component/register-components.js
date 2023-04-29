import { dashify } from "../../toolbox/dashify.js";
export function registerComponents(components) {
    for (const [name, component] of Object.entries(components))
        customElements.define(dashify(name), component);
}
//# sourceMappingURL=register-components.js.map