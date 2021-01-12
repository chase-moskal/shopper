import { DataStore } from "../toolbox/simple-data-store.js";
import { CurrencyStorage } from "../interfaces.js";
export declare function createCurrencyStorage({ key, dataStore }: {
    key: string;
    dataStore: DataStore;
}): CurrencyStorage;
