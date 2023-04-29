export function getDetailsForCurrencies(currencies, library) {
    const details = {};
    for (const code of currencies) {
        const found = library[code];
        if (found)
            details[code] = found;
    }
    return details;
}
//# sourceMappingURL=currencies-to-details.js.map