import { runTokenRegex } from "./lexing-details/run-token-regex.js";
import { runLeadingWhitespaceRegex } from "./lexing-details/handle-leading-whitespace.js";
import { defineMakeTraceFunction } from "./lexing-details/define-make-trace-function.js";
export function makeLexer(regex, readToken) {
    return ((source, cursor) => {
        let index = cursor.index;
        const setIndex = (newIndex) => index = newIndex;
        const leadingWhitespace = runLeadingWhitespaceRegex({
            source, index, setIndex,
        });
        const match = runTokenRegex({
            source, regex, index, setIndex,
        });
        return match
            ? {
                newIndex: index,
                token: readToken(match, defineMakeTraceFunction({ index, cursor, leadingWhitespace }))
            }
            : undefined;
    });
}
//# sourceMappingURL=make-lexer.js.map