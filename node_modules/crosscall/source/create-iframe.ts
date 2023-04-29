
import {CreateIframeOptions} from "./types.js"

export class CreateIframeError extends Error {
	readonly name = this.constructor.name
}

const err = (message: string) => new CreateIframeError(message)

export async function createIframe({
	url,
	documentCreateElement = document.createElement.bind(document),
	documentBodyAppendChild = document.body.appendChild.bind(document.body)
}: CreateIframeOptions) {
	try {
		const precheck = await fetch(url)
		if (precheck.status !== 200)
			throw err(`createIframe failed to load "${url}"`)
	}
	catch (error) {
		throw err(`createIframe failed to load "${url}": ${error.message}`)
	}

	const iframe = documentCreateElement("iframe")
	iframe.style.display = "none"
	iframe.src = url
	documentBodyAppendChild(iframe)

	const postMessage = (
		message: any,
		targetOrigin: string,
		transfer: Transferable[]
	): void => iframe.contentWindow.postMessage(message, targetOrigin, transfer)

	return {postMessage, iframe}
}
