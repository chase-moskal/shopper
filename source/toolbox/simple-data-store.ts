
export interface DataStore {
	getItem(key: string): Promise<any>
	setItem(key: string, value: any): Promise<void>
}

export class SimpleDataStore implements DataStore {
	private _storage: Storage
	constructor({storage}: {storage: Storage}) {
		this._storage = storage
	}
	async getItem(key: string): Promise<any> {
		return this._storage.getItem(key)
	}
	async setItem(key: string, value: any): Promise<void> {
		return this._storage.setItem(key, value)
	}
}
