
import {LitElement, CSSResultGroup, css} from "lit"
import {Constructor} from "../component-types.js"

function arrayize<T>(item: T | T[]) {
	return <T[]>[item].flat()
}

const notUndefined = (x: any) => x !== undefined

function combineStyles(parentStyles: CSSResultGroup, newStyles: CSSResultGroup[]) {
	const styles = [
		...(arrayize(parentStyles) ?? []),
		...arrayize(newStyles),
	]
	return styles
		.flat()
		.filter(notUndefined)
}

export function mixinStyles(...newStyles: CSSResultGroup[]) {
	return function<C extends Constructor<LitElement>>(Base: C): C {
		return class extends Base {
			static styles = combineStyles(
				(<typeof LitElement><unknown>Base).styles,
				newStyles,
			)
		}
	}
}
