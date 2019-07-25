
export function select<E extends HTMLElement>(selector: string): E[] {
	return Array.from(document.querySelectorAll(selector))
}
