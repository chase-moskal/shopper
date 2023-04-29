import { BasicStorage } from "../interfaces.js";
export declare function cache<xPayload>({ lifespan, storage, storageKey, load, }: {
    lifespan: number;
    storage: BasicStorage;
    storageKey: string;
    load: () => Promise<xPayload>;
}): {
    read(): Promise<xPayload>;
    readFresh(): Promise<xPayload>;
    readCache(): Promise<xPayload>;
    write(payload: xPayload): Promise<void>;
    clear(): Promise<void>;
};
