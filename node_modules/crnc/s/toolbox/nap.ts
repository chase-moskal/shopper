
export async function nap(sleepTime: number) {
	return new Promise(resolve => setTimeout(resolve, sleepTime))
}
