
import {HostShims} from "../../types.js"

export const defaultShims: HostShims = typeof window === "object" ? {
	postMessage: (() => {
		const {parent, opener} = window
		if (parent && parent !== window) return parent.postMessage.bind(parent)
		else if (opener && opener !== window) return opener.postMessage.bind(opener)
		else return null
	})(),
	addEventListener: window.addEventListener.bind(window),
	removeEventListener: window.removeEventListener.bind(window)
} : {
	postMessage: () => {},
	addEventListener: () => {},
	removeEventListener: () => {},
}
