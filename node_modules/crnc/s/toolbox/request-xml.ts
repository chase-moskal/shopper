
export async function requestXml(link: string) {
	const response = await fetch(link)
	const text = await response.text()

	const parser = new DOMParser()
	const xml = parser.parseFromString(text, "text/xml")

	return xml
}
