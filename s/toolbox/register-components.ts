
export function dashify(camel: string): string {
	return camel.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

export function registerComponents(components: {[key: string]: typeof HTMLElement}) {
	for (const componentName of Object.keys(components))
		customElements.define(
			dashify(componentName),
			components[componentName]
		)
}
