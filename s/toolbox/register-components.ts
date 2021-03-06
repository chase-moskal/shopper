
import {LitElement} from "lit-element"

export function dashify(camel: string): string {
	return camel.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

export function registerComponents(components: {[key: string]: typeof LitElement}) {
	for (const componentName of Object.keys(components))
		customElements.define(
			dashify(componentName),
			components[componentName]
		)
}
