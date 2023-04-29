
import {LitElement} from "lit"
import {Constructor} from "../toolbox/handy-types.js"

export function mixinLightDom() {
	return function<C extends Constructor<LitElement>>(Base: C): C {
		return class extends Base {
			createRenderRoot() {
				return this
			}
		}
	}
}
