var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import shopifyBuy from "shopify-buy/index.es.js";
export class ShopifyAdapter {
    constructor({ domain, storefrontAccessToken }) {
        this._shopifyClient = shopifyBuy.buildClient({
            domain,
            storefrontAccessToken
        });
    }
    fetchEverything() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collections = yield this._shopifyClient.collection.fetchAllWithProducts();
                let products = [];
                for (const collection of collections) {
                    for (const shopifyProduct of collection.products) {
                        const product = products.find(product => product.id === shopifyProduct.id);
                        // if the product is already known, add the collection id
                        if (product) {
                            const existingCollectionId = product.collections.find(id => id === collection.id);
                            if (!existingCollectionId)
                                product.collections.push(collection.id);
                        }
                        // else, add the new product to the products array
                        else {
                            const product = this._shopifyProductToShopperProduct(shopifyProduct, collection.id);
                            products.push(product);
                        }
                    }
                }
                return {
                    products,
                    collectionIds: collections.map((collection) => collection.id)
                };
            }
            catch (error) {
                error.message = "shopify error" + error.message;
                throw error;
            }
        });
    }
    checkout(items) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkout = yield this._shopifyClient.checkout.create({
                lineItems: items.map(item => ({
                    variantId: item.product.firstVariantId,
                    quantity: item.quantity
                }))
            });
            return checkout.webUrl;
        });
    }
    _shopifyProductToShopperProduct(shopifyProduct, collectionId) {
        var _a;
        const [firstVariant] = shopifyProduct.variants;
        return {
            id: shopifyProduct.id,
            available: shopifyProduct.availableForSale,
            value: parseFloat(firstVariant.price),
            comparedValue: firstVariant.compareAtPrice
                ? parseFloat(firstVariant.compareAtPrice)
                : null,
            title: shopifyProduct.title,
            description: shopifyProduct.descriptionHtml,
            collections: collectionId ? [collectionId] : [],
            firstVariantId: firstVariant.id,
            image: firstVariant.image
                ? {
                    alt: (_a = firstVariant.image.alt) !== null && _a !== void 0 ? _a : "",
                    src: firstVariant.image.src,
                }
                : null,
        };
    }
}
//# sourceMappingURL=shopify-adapter.js.map