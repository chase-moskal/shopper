
export interface RequestParams {
	link: string
}

export function request({link}: RequestParams): Promise<XMLHttpRequest> {
	return new Promise<XMLHttpRequest>((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.onload = () => resolve(request)
		request.onerror = event => reject(event.error)
		request.open("GET", link)
		request.send()
	})
}

export async function requestXml(params: RequestParams) {
	return (await request(params)).responseXML
}

export async function requestJson(params: RequestParams) {
	return JSON.parse((await request(params)).responseText)
}
