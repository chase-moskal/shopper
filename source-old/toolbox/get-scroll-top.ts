
export function getScrollTop(doc: Document = window.document): number {
	return doc.documentElement.scrollTop || doc.body.scrollTop
}
