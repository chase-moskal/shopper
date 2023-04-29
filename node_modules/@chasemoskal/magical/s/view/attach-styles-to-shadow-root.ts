
import {adoptStyles, CSSResultOrNative, getCompatibleStyle, CSSResultGroup} from "lit"

export function attachStylesToShadowRoot(root: ShadowRoot, styles?: CSSResultGroup) {
	const elementStyles = []

	if (Array.isArray(styles)) {
		const set = new Set((styles as Array<unknown>).flat(Infinity).reverse())
		for (const s of set)
			elementStyles.unshift(getCompatibleStyle(s as CSSResultOrNative))
	}
	else if (styles !== undefined)
		elementStyles.push(getCompatibleStyle(styles))

	adoptStyles(root, elementStyles)
}
