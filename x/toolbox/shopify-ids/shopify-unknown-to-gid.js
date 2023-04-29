import { shopifyUidToGid } from "./shopify-uid-to-gid.js";
export function shopifyUnknownToGid(id) {
    const isGid = id.includes(":");
    return isGid
        ? id
        : shopifyUidToGid(id);
}
//# sourceMappingURL=shopify-unknown-to-gid.js.map