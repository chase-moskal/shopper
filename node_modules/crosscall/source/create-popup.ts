
import {CreatePopupOptions} from "./types.js"

export function createPopup({
	url,
	target,
	features,
	windowOpen = window.open.bind(window)
}: CreatePopupOptions) {

	window.open(url, target, features)

	const popup = windowOpen(url, target, features)
	const postMessage = popup.postMessage.bind(popup)

	return {postMessage, popup}
}
