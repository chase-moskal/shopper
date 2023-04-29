import { mockBasicStorage } from "./mock-basic-storage.js";
import { defaultPersistenceStorageKeys, oneHour } from "../ecommerce/currency-converter-defaults.js";
const storageKeys = defaultPersistenceStorageKeys;
export const mockPersistence = {
    standard: () => ({
        storageKeys,
        cacheLifespan: oneHour,
        storage: mockBasicStorage(),
    }),
    multipleTabsSharingOneStorage: () => {
        const storage = mockBasicStorage();
        const tabs = new Set();
        function makeTab() {
            let trigger = () => {
                throw new Error(`cannot trigger storage change before listenForStorageChange is setup`);
            };
            const triggerStorageChangeOnThisTab = () => trigger();
            const persistence = ({
                storage,
                storageKeys,
                cacheLifespan: oneHour,
            });
            const tab = {
                persistence,
                triggerStorageChangeOnThisTab,
                triggerStorageChangeOnAllOtherTabs: () => {
                    for (const t of tabs)
                        if (t !== tab) {
                            t.triggerStorageChangeOnThisTab();
                        }
                },
                listenForStorageChange: (({ reloadCurrencyPreference }) => {
                    trigger = () => reloadCurrencyPreference();
                }),
            };
            tabs.add(tab);
            return tab;
        }
        return {
            makeTab,
        };
    },
};
//# sourceMappingURL=mock-persistence.js.map