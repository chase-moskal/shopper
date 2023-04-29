import { Token } from "./types.js";
import { Expression } from "../../types.js";
export declare function parse(tokens: Iterable<Token.Any>): Generator<Expression, void, unknown>;
