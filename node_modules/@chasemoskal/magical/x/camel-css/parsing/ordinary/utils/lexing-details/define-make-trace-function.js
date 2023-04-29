import { updateCursor } from "../update-cursor.js";
export function defineMakeTraceFunction({ index, cursor, leadingWhitespace }) {
    return (valueLength) => {
        const subcursor = updateCursor(leadingWhitespace, cursor, cursor.index + leadingWhitespace.length);
        return {
            cursor: subcursor,
            length: valueLength ?? (index - subcursor.index),
        };
    };
}
//# sourceMappingURL=define-make-trace-function.js.map