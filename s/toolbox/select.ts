
export function select<E extends HTMLElement>(selector: string): E {
	return document.querySelector(selector)
}

export function selects<E extends HTMLElement>(selector: string): E[] {
	return Array.from(document.querySelectorAll(selector))
}
