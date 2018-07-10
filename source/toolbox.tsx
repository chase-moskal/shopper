
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

export function getScrollTop(doc: Document = window.document): number {
	return doc.documentElement.scrollTop || doc.body.scrollTop
}

export function setScrollTop(value: number, doc: Document = window.document): void {
	doc.documentElement.scrollTop = document.body.scrollTop = value
}
