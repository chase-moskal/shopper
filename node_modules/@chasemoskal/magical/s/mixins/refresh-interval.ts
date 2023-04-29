
import {LitElement} from "lit"
import {Constructor} from "../toolbox/handy-types.js"

export function mixinRefreshInterval(milliseconds: number) {
	return function <C extends Constructor<LitElement>>(Base: C): C {
		return class extends Base {

			#refreshInterval: any

			connectedCallback() {
				super.connectedCallback()
				this.#refreshInterval = setInterval(
					() => this.requestUpdate(),
					milliseconds
				)
			}

			disconnectedCallback() {
				super.disconnectedCallback()
				clearInterval(this.#refreshInterval)
			}
		}
	}
}
