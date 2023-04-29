import { ConverterPersistence, ListenForStorageChange } from "../interfaces.js";
export declare const mockPersistence: {
    standard: () => ConverterPersistence;
    multipleTabsSharingOneStorage: () => {
        makeTab: () => {
            persistence: ConverterPersistence;
            triggerStorageChangeOnThisTab: () => void;
            triggerStorageChangeOnAllOtherTabs: () => void;
            listenForStorageChange: ListenForStorageChange;
        };
    };
};
