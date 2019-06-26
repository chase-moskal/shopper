
export function isDescendant(child: Element, parent: Element) {
	if (child === parent) return true
	let {parentElement} = child
	while (parentElement) {
		if (parentElement === parent) return true
		parentElement = parentElement.parentElement
	}
	return false
}
