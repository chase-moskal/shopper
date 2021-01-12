export function dashify(camel) {
    return camel.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}
export function registerComponents(components) {
    for (const componentName of Object.keys(components))
        customElements.define(dashify(componentName), components[componentName]);
}
//# sourceMappingURL=register-components.js.map