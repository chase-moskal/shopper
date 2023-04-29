export class SimpleDataStore {
    constructor({ storage }) {
        this._storage = storage;
    }
    async getItem(key) {
        return this._storage.getItem(key);
    }
    async setItem(key, value) {
        return this._storage.setItem(key, value);
    }
}
//# sourceMappingURL=simple-data-store.js.map