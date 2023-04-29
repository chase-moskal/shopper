import { DataStore } from "../toolbox/simple-data-store.js";
import { CartStorage } from "../interfaces.js";
export declare function createCartStorage({ key, dataStore }: {
    key: string;
    dataStore: DataStore;
}): CartStorage;
