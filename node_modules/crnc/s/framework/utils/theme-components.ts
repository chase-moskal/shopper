

import {LitElement, CSSResultGroup} from "lit"
import {objectMap} from "@chasemoskal/snapstate"

import {Constructor} from "../component-types.js"
import {mixinStyles} from "../mixins/mixin-styles.js"

export const themeComponents = <
		xComponents extends {[key: string]: Constructor<LitElement>}
	>(
		theme: CSSResultGroup,
		components: xComponents
	): xComponents => {

	return objectMap(
		components,
		Component => mixinStyles(theme)(Component),
	)
}
