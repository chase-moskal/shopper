
import {camelCss} from "./camel-css.js"
import {CSSResult, unsafeCSS} from "lit"

export {camelCss}

export function css(
		strings: TemplateStringsArray,
		...values: any[]
	): CSSResult {

	const input = Array.from(strings).reduce(
		(previous, current, index) =>
			previous + current + (values[index] ?? ""),
		""
	)

	const output = camelCss(input)
	return unsafeCSS(output)
}
