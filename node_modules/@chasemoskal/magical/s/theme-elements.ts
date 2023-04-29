
import {LitElement, CSSResultGroup} from "lit"

import {obtool} from "./toolbox/obtool.js"
import {mixinCss} from "./mixins/css.js"
import {Constructor} from "./toolbox/handy-types.js"

export const themeElements = <
		xElements extends {[key: string]: Constructor<LitElement>}
	>(
		theme: CSSResultGroup,
		elements: xElements,
	) => {

	return obtool(elements)
		.map(Element => mixinCss(theme)(Element))
}
