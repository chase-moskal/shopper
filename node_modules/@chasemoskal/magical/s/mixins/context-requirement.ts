
import {Constructor} from "../toolbox/handy-types.js"

export function mixinContextRequirement<xContext>() {
	return function<C extends Constructor>(Base: C) {
		return class extends Base {

			static withContext(context: xContext) {
				return class extends this {
					get context() {
						return context
					}
				}
			}

			get context(): xContext {
				throw new Error("context required")
			}
		}
	}
}
