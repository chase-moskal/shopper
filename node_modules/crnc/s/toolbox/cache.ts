
import {BasicStorage} from "../interfaces.js"
import {jsonStorage} from "./json-storage.js"

export function cache<xPayload>({
		lifespan, storage, storageKey, load,
	}: {
		lifespan: number
		storage: BasicStorage
		storageKey: string
		load: () => Promise<xPayload>
	}) {

	const store = jsonStorage(storage)

	type CacheRecord = {
		time: number
		payload: xPayload
	}

	function timeHasNotExpired(time: number) {
		const since = Date.now() - time
		return since < lifespan
	}

	function getCachedPayload(): undefined | xPayload {
		const record = store.getItem<CacheRecord>(storageKey)
		return (record && timeHasNotExpired(record.time))
			? record.payload
			: undefined
	}

	function setCachedPayload(payload: xPayload) {
		const record: CacheRecord = {
			payload,
			time: Date.now(),
		}
		store.setItem(storageKey, record)
	}

	async function loadFreshAndWriteToCache() {
		const payload = await load()
		setCachedPayload(payload)
		return payload
	}

	return {

		async read() {
			const payload = getCachedPayload()
			return payload
				? payload
				: await loadFreshAndWriteToCache()
		},

		async readFresh() {
			return loadFreshAndWriteToCache()
		},

		async readCache() {
			return getCachedPayload()
		},

		async write(payload: xPayload) {
			setCachedPayload(payload)
		},

		async clear() {
			storage.removeItem(storageKey)
		},
	}
}
