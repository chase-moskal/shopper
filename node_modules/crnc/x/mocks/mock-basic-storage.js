export function mockBasicStorage() {
    const map = new Map();
    return {
        getItem: key => map.get(key),
        setItem: (key, value) => map.set(key, value),
        removeItem: key => map.delete(key),
    };
}
//# sourceMappingURL=mock-basic-storage.js.map