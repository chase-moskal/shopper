import { shopifyUnknownToGid } from "./shopify-unknown-to-gid.js";
import { shopifyProductLinkToGid } from "./shopify-product-link-to-gid.js";
export function chooseShopifyId({ gid, uid, link }) {
    return gid
        ? gid
        : uid
            ? shopifyUnknownToGid(uid)
            : link
                ? shopifyProductLinkToGid(link)
                : undefined;
}
//# sourceMappingURL=choose-shopify-id.js.map