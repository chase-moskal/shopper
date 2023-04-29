
import {ClientShims, PopupOptions} from "../../types.js"

export const defaultShims: ClientShims = typeof window === "object" ? {
	createElement: document.createElement.bind(document),
	appendChild: document.body.appendChild.bind(document.body),
	removeChild: document.body.removeChild.bind(document.body),
	addEventListener: window.addEventListener.bind(window),
	removeEventListener: window.removeEventListener.bind(window)
}: {
	createElement: () => {},
	appendChild: () => {},
	removeChild: () => {},
	addEventListener: () => {},
	removeEventListener: () => {},
}

export const defaultPopupOptions: PopupOptions = {
	target: undefined,
	features: undefined,
}
