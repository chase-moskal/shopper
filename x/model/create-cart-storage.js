import { shopifyUnknownToGid } from "../toolbox/shopify-ids/shopify-unknown-to-gid.js";
export function createCartStorage({ key, dataStore }) {
    let loaded = false;
    return {
        async saveCart(catalog) {
            if (!loaded)
                return;
            const store = {};
            for (const { product, quantity } of catalog) {
                store[product.id] = { quantity };
            }
            await dataStore.setItem(key, JSON.stringify(store));
        },
        async loadCart(catalog) {
            try {
                const raw = await dataStore.getItem(key);
                loaded = true;
                if (!raw)
                    return;
                const store = JSON.parse(raw);
                for (const [id, data] of Object.entries(store)) {
                    const gid = shopifyUnknownToGid(id);
                    const item = catalog.find(item => item.product.id === gid);
                    if (item)
                        item.quantity = data.quantity;
                }
            }
            catch (error) {
                console.error("error reading cart", error);
            }
        },
    };
}
//# sourceMappingURL=create-cart-storage.js.map