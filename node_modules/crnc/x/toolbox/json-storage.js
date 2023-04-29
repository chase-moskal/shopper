export function jsonStorage(storage) {
    return {
        getItem(key) {
            const data = storage.getItem(key);
            let value;
            if (data) {
                try {
                    value = JSON.parse(data);
                }
                catch (error) { }
            }
            return value;
        },
        setItem(key, value) {
            storage.setItem(key, JSON.stringify(value));
        },
        removeItem(key) {
            storage.removeItem(key);
        },
    };
}
//# sourceMappingURL=json-storage.js.map