
import {shopifyUidToGid} from "./shopify-uid-to-gid.js"

export function shopifyUnknownToGid(id: string) {
	const isGid = id.includes(":")

	return isGid
		? id
		: shopifyUidToGid(id)
}
