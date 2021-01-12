var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function createCartStorage({ key, dataStore }) {
    let loaded = false;
    return {
        saveCart(catalog) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!loaded)
                    return;
                const store = {};
                for (const { product, quantity } of catalog) {
                    store[product.id] = { quantity };
                }
                yield dataStore.setItem(key, JSON.stringify(store));
            });
        },
        loadCart(catalog) {
            return __awaiter(this, void 0, void 0, function* () {
                const raw = yield dataStore.getItem(key);
                loaded = true;
                if (!raw)
                    return;
                const store = JSON.parse(raw);
                for (const [uid, data] of Object.entries(store)) {
                    const { quantity } = data;
                    const item = catalog.find(item => item.product.id === uid);
                    if (item)
                        item.quantity = quantity;
                }
            });
        },
    };
}
//# sourceMappingURL=create-cart-storage.js.map