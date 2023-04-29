
import {Constructor, Mixin} from "../component-types.js"

export interface WithContext<xContext> {
	get context(): xContext
}

export function mixinContext<xContext>(providedContext: xContext) {
	return function<C extends Constructor>(
			Base: C
		): Mixin<C, WithContext<xContext>> {

		return <any>class extends Base {
			get context() {
				return providedContext
			}
		}
	}
}

export function mixinRequireContext<xContext>(name?: string) {
	return function<C extends Constructor>(
			Base: C
		): Mixin<C, WithContext<xContext>> {

		return <any>class extends Base {
			get context(): xContext {
				throw new Error(`context required by component${name ? " " + name : ""}`)
			}
		}
	}
}
