export function createStateSetter({ stateMap, stateIndex, rerender, }) {
    return valueOrFunction => {
        const [previousValue] = stateMap.get(stateIndex);
        const newValue = typeof valueOrFunction === "function"
            ? valueOrFunction(previousValue)
            : valueOrFunction;
        if (newValue !== previousValue) {
            stateMap.set(stateIndex, [newValue, previousValue]);
            rerender();
        }
    };
}
//# sourceMappingURL=create-state-setter.js.map