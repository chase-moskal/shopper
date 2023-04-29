export function calculatePercentOff({ currentValue, comparisonValue }) {
    const difference = comparisonValue - currentValue;
    const fraction = difference / comparisonValue;
    const percentage = Math.round(fraction * 100);
    return percentage;
}
//# sourceMappingURL=calculate-percent-off.js.map