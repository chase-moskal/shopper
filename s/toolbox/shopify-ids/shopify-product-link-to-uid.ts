
export function shopifyProductLinkToUid(link: string) {
	const parse = link.match(/^(\d+)$|\/(\d+$)/)
	const id = parse[1] ?? parse[2]
	const gid = `gid://shopify/Product/${id}`
	const uid = btoa(gid)
	return uid
}
