export var Token;
(function (Token) {
    let Type;
    (function (Type) {
        Type[Type["Open"] = 0] = "Open";
        Type[Type["Close"] = 1] = "Close";
        Type[Type["RuleName"] = 2] = "RuleName";
        Type[Type["RuleValue"] = 3] = "RuleValue";
        Type[Type["SlashSlashComment"] = 4] = "SlashSlashComment";
    })(Type = Token.Type || (Token.Type = {}));
})(Token || (Token = {}));
export function asLexers(lexers) {
    return lexers;
}
export function asToken(token) {
    return token;
}
//# sourceMappingURL=types.js.map