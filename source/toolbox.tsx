
import {h} from "preact"

export function isDescendant(child: Element, parent: Element) {
	if (child === parent) return true
	let {parentElement} = child
	while (parentElement) {
		if (parentElement === parent) return true
		parentElement = parentElement.parentElement
	}
	return false
}

export function convertNewlinesToReactBreaks(text: string) {
	return text.split("\n").map((item, key) => {
		return (
			<span {...{key}}>
				{item}
				<br/>
			</span>
		)
	})
}
