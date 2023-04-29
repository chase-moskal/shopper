import { Token } from "../types.js";
export function makeTokensReadableForDebugging(tokens) {
    return tokens
        .map(token => {
        const { line, column } = token.trace.cursor;
        const value = token.value ?? undefined;
        return `(${Token.Type[token.type]}${value ? " " + value : ""} (${line}:${column}))`;
    })
        .join("\n");
}
//# sourceMappingURL=make-tokens-readable-for-debugging.js.map