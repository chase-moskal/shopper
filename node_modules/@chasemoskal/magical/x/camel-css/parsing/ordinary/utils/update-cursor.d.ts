import { Cursor } from "../types.js";
export declare function updateCursor(part: string, cursor: Cursor, newIndex: number): {
    line: number;
    column: number;
    index: number;
};
