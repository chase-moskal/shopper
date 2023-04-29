
import {dashify} from "./toolbox/dashify.js"

export function registerElements(elements: {
		[name: string]: {new(): HTMLElement}
	}) {

	for (const [name, element] of Object.entries(elements))
		customElements.define(dashify(name), element)
}
