
export function setScrollTop(value: number, doc: Document = window.document): void {
	doc.documentElement.scrollTop = document.body.scrollTop = value
}
