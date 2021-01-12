export interface DataStore {
    getItem(key: string): Promise<any>;
    setItem(key: string, value: any): Promise<void>;
}
export declare class SimpleDataStore implements DataStore {
    private _storage;
    constructor({ storage }: {
        storage: Storage;
    });
    getItem(key: string): Promise<any>;
    setItem(key: string, value: any): Promise<void>;
}
