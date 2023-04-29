import { Expression } from "../types.js";
export declare function compile(expressions: Iterable<Expression>): Generator<string, void, unknown>;
