
export const attr = (element: HTMLElement) => ({
	string: new Proxy({}, {
		get(target, key: string) {
			return element.getAttribute(key)
		},
		set(target, key: string, value: string) {
			element.setAttribute(key, value.toString())
			return true
		},
	}),
	boolean: new Proxy({}, {
		get(target, key: string) {
			return element.hasAttribute(key)
		},
		set(target, key: string, value: any) {
			if (value)
				element.setAttribute(key, "")
			else
				element.removeAttribute(key)
			return true
		},
	}),
})
