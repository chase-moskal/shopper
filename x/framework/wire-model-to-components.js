import { provideModel } from "./provide-model.js";
export function wireModelToComponents(model, components) {
    const newComponents = {};
    for (const [key, value] of Object.entries(components)) {
        newComponents[key] = provideModel(model, value);
    }
    return newComponents;
}
//# sourceMappingURL=wire-model-to-components.js.map