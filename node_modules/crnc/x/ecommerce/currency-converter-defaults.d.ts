import { ConverterPersistence, ListenForStorageChange } from "../interfaces.js";
export declare const oneHour: number;
export declare const defaultPersistenceStorageKeys: ConverterPersistence["storageKeys"];
export declare const defaultPersistence: () => ConverterPersistence;
export declare const defaultListenForStorageChange: (persistence: ConverterPersistence) => ListenForStorageChange;
