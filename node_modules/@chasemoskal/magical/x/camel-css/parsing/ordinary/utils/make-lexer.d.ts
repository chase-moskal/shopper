import { Token, MakeTrace, Lexer } from "../types.js";
export declare function makeLexer<xToken extends Token.Any>(regex: RegExp, readToken: (match: RegExpMatchArray, makeTrace: MakeTrace) => Token.Any): Lexer<xToken>;
