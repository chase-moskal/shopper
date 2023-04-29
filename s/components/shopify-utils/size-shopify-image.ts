
const shopifyImageRegex = /(https:\/\/cdn.shopify.com\/.+\/products)\/(.*)/i

export function parseImageSize(spec: string) {
	if (spec) {
		let width: number = 200
		let height: number = 200
		if (spec.includes("x")) {
			const [widthstring, heightstring] = spec.split("x")
			width = parseInt(widthstring)
			height = parseInt(heightstring)
		}
		else {
			width = parseInt(spec)
			height = width
		}
		return {width, height}
	}
	else
		return undefined
}

export function sizeShopifyImage(
		url: string,
		size: undefined | {width: number, height: number},
	) {

	if (!size)
		return url

	const width = Math.round(size.width).toFixed(0)
	const height = Math.round(size.height).toFixed(0)

	const match = url.match(shopifyImageRegex)
	if (match) {
		const [, preamble, filepart] = match
		let filename: string
		let querystring = ""
		if (filepart.includes("?")) {
			const peices = filepart.split("?")
			filename = peices[0]
			querystring = peices[1]
		}
		else {
			filename = filepart
			querystring = ""
		}
		const nameparts = filename.split(".")
		const extension = nameparts.pop()
		const filelabel = nameparts.join(".")

		const dimensions = `${width}x${height}`
		const query = querystring ?`?${querystring}` :""
		return `${preamble}/${filelabel}_${dimensions}.${extension}${query}`
	}
	else
		return url
}
