const leadingWhitespaceRegex = /(\s*)/my;
export function runLeadingWhitespaceRegex({ source, index, setIndex }) {
    leadingWhitespaceRegex.lastIndex = index;
    const match = leadingWhitespaceRegex.exec(source.code);
    if (match)
        setIndex(leadingWhitespaceRegex.lastIndex);
    const [, whitespace = ""] = match ?? [];
    return whitespace;
}
//# sourceMappingURL=handle-leading-whitespace.js.map