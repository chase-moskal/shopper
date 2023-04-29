export const parseConfig = (element) => ({
    mock: element.getAttribute("mock"),
    shopifyDomain: element.getAttribute("shopify-domain"),
    shopifyStorefrontAccessToken: element.getAttribute("shopify-storefront-access-token"),
    baseCurrency: element.getAttribute("base-currency") || undefined,
    currencies: element.getAttribute("currencies") || undefined,
    defaultQuantityMax: parseInt(element.getAttribute("default-quantity-max") || "25"),
});
//# sourceMappingURL=parse-config.js.map