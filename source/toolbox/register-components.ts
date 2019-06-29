
import {Component} from "./component.js"

function dashify(camel: string): string {
	return camel.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

export function registerComponents(components: (typeof Component)[]) {
	for (const ComponentConstructor of components)
		customElements.define(
			dashify(ComponentConstructor.name),
			ComponentConstructor
		)
}
