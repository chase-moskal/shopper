
export function shopifyCollectionLinkToUid(link: string) {
	const parse = link.match(/^(\d+)$|\/(\d+)$/)
	const id = parse[1] ?? parse[2]
	const gid = `gid://shopify/Collection/${id}`
	const uid = btoa(gid)
	return uid
}
