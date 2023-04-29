
export function containsPath(paths: string[][], path: string[]) {
	for (const comparisonPath of paths) {
		let mismatch = false
		if (path.length === comparisonPath.length) {
			for (let i = 0; i < path.length; i++) {
				if (path[i] !== comparisonPath[i]) {
					mismatch = true
					break
				}
			}
			if (!mismatch)
				return true
		}
	}
	return false
}

export function containsPathOrChildren(paths: string[][], path: string[]) {
	for (const comparisonPath of paths) {
		let mismatch = false
		if (path.length <= comparisonPath.length) {
			for (let i = 0; i < path.length; i++) {
				if (path[i] !== comparisonPath[i]) {
					mismatch = true
					break
				}
			}
			if (!mismatch)
				return true
		}
	}
	return false
}

export function containsPathOrParents(paths: string[][], path: string[]) {
	for (const comparisonPath of paths) {
		let mismatch = false
		if (path.length >= comparisonPath.length) {
			for (let i = 0; i < comparisonPath.length; i++) {
				if (comparisonPath[i] !== path[i]) {
					mismatch = true
					break
				}
			}
			if (!mismatch)
				return true
		}
	}
	return false
}
