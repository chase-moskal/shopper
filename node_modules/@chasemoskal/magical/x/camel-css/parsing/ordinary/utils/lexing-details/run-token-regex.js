export function runTokenRegex({ source, regex, index, setIndex, }) {
    regex.lastIndex = index;
    const match = regex.exec(source.code);
    if (match)
        setIndex(regex.lastIndex);
    return match;
}
//# sourceMappingURL=run-token-regex.js.map