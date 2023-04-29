import { CurrencyStorage } from "../interfaces.js";
import { DataStore } from "../toolbox/simple-data-store.js";
export declare function createCurrencyStorage({ key, dataStore }: {
    key: string;
    dataStore: DataStore;
}): CurrencyStorage;
