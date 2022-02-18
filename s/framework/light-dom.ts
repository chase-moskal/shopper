
import {LitElement, html, CSSResultArray} from "lit"

export function LightDom<T extends {
	styles: CSSResultArray
	new(...args: any[]): LitElement
}>(
	C: T
) {
	return <T>class LightDomComponent extends C {

		static get styles() {return [...super.styles]}

		// use light dom (opt out of shadow dom)
		createRenderRoot() {return this}

		// render the styles straight to the light dom
		render() {
			const {styles} = <T>this.constructor
			return html`
				${super.render()}
				<style>${styles}</style>
			`
		}
	}
}
