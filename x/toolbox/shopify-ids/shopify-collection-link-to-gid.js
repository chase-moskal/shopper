export function shopifyCollectionLinkToGid(link) {
    var _a;
    const parse = link.match(/^(\d+)$|\/(\d+)$/);
    const id = (_a = parse[1]) !== null && _a !== void 0 ? _a : parse[2];
    const gid = `gid://shopify/Collection/${id}`;
    return gid;
    // // older shopify api
    // const uid = btoa(gid)
    // return uid
}
//# sourceMappingURL=shopify-collection-link-to-gid.js.map