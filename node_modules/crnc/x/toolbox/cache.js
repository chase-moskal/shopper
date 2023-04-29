import { jsonStorage } from "./json-storage.js";
export function cache({ lifespan, storage, storageKey, load, }) {
    const store = jsonStorage(storage);
    function timeHasNotExpired(time) {
        const since = Date.now() - time;
        return since < lifespan;
    }
    function getCachedPayload() {
        const record = store.getItem(storageKey);
        return (record && timeHasNotExpired(record.time))
            ? record.payload
            : undefined;
    }
    function setCachedPayload(payload) {
        const record = {
            payload,
            time: Date.now(),
        };
        store.setItem(storageKey, record);
    }
    async function loadFreshAndWriteToCache() {
        const payload = await load();
        setCachedPayload(payload);
        return payload;
    }
    return {
        async read() {
            const payload = getCachedPayload();
            return payload
                ? payload
                : await loadFreshAndWriteToCache();
        },
        async readFresh() {
            return loadFreshAndWriteToCache();
        },
        async readCache() {
            return getCachedPayload();
        },
        async write(payload) {
            setCachedPayload(payload);
        },
        async clear() {
            storage.removeItem(storageKey);
        },
    };
}
//# sourceMappingURL=cache.js.map