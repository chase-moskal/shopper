
export function calculatePercentOff({
		currentValue,
		comparisonValue
	}: {
		currentValue: number
		comparisonValue: number
	}) {

	const difference = comparisonValue - currentValue
	const fraction = difference / comparisonValue
	const percentage = Math.round(fraction * 100)
	return percentage
}
