
/*

commotion — communications functions like xhr's

*/

export interface RequestParams {
	link: string
}

/**
 * Make an XHR request
 */
export function request({link}: RequestParams): Promise<XMLHttpRequest> {
	return new Promise<XMLHttpRequest>((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.onload = () => resolve(request)
		request.onerror = event => reject(event.error)
		request.open("GET", link)
		request.send()
	})
}

/**
 * Make an XHR request for an XML document
 */
export async function requestXml(params: RequestParams) {
	return (await request(params)).responseXML
}

/**
 * Make an XHR request for a JSON document
 */
export async function requestJson(params: RequestParams) {
	return JSON.parse((await request(params)).responseText)
}
