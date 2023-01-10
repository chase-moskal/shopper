
export function shopifyCollectionLinkToGid(link: string) {
	const parse = link.match(/^(\d+)$|\/(\d+)$/)
	const id = parse[1] ?? parse[2]
	const gid = `gid://shopify/Collection/${id}`
	return gid

	// // older shopify api
	// const uid = btoa(gid)
	// return uid
}
