export function obtool(input) {
    return {
        map(mapper) {
            return (Object.fromEntries(Object.entries(input).map(([key, value]) => [key, mapper(value, key)])));
        },
    };
}
//# sourceMappingURL=obtool.js.map