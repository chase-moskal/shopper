
/**
 * insert a value into an object tree.
 *  - throws an error if there's a non-object in the way.
 */
export function attemptNestedProperty(
		object: {[key: string]: any},
		path: string[],
		value: any,
	) {
	const pathToSubObject = [...path]
	const finalKey = pathToSubObject.pop()
	let currentSubObject: any = object
	for (const key of pathToSubObject) {
		if (typeof currentSubObject[key] === "object") {
			currentSubObject = currentSubObject[key]
		}
		else {
			throw new Error("unable to write property to object tree containing undefined")
		}
	}
	currentSubObject[finalKey] = value
}

