
import {mockBasicStorage} from "./mock-basic-storage.js"
import {BasicStorage, ConverterPersistence, ListenForStorageChange} from "../interfaces.js"
import {defaultPersistenceStorageKeys, oneHour} from "../ecommerce/currency-converter-defaults.js"

const storageKeys = defaultPersistenceStorageKeys

export const mockPersistence = {

	standard: (): ConverterPersistence => ({
		storageKeys,
		cacheLifespan: oneHour,
		storage: mockBasicStorage(),
	}),

	multipleTabsSharingOneStorage: () => {
		const storage: BasicStorage = mockBasicStorage()

		const tabs = new Set<{
			persistence: ConverterPersistence
			triggerStorageChangeOnThisTab: () => void
			triggerStorageChangeOnAllOtherTabs: () => void
		}>()

		function makeTab() {
			let trigger = (): void => {
				throw new Error(`cannot trigger storage change before listenForStorageChange is setup`)
			}
			const triggerStorageChangeOnThisTab = () => trigger()
			const persistence: ConverterPersistence = ({
				storage,
				storageKeys,
				cacheLifespan: oneHour,
			})
			const tab = {
				persistence,
				triggerStorageChangeOnThisTab,
				triggerStorageChangeOnAllOtherTabs: () => {
					for (const t of tabs)
						if (t !== tab) {
							t.triggerStorageChangeOnThisTab()
						}
				},
				listenForStorageChange: <ListenForStorageChange>(({reloadCurrencyPreference}: {
						reloadCurrencyPreference: () => void
					}) => {
					trigger = () => reloadCurrencyPreference()
				}),
			}
			tabs.add(tab)
			return tab
		}

		return {
			makeTab,
		}
	},
}
