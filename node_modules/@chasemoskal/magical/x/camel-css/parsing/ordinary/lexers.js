import { Token } from "./types.js";
import { makeLexer } from "./utils/make-lexer.js";
export const lexers = {
    slashSlashComment: makeLexer(/(\/\/.*)$/my, (match, makeTrace) => {
        const [, value] = match;
        const trimmedValue = value.trim();
        return {
            type: Token.Type.SlashSlashComment,
            trace: makeTrace(trimmedValue.length),
            value: trimmedValue,
        };
    }),
    open: makeLexer(/([^{};]*){/my, (match, makeTrace) => {
        const [, selector] = match;
        const trimmedSelector = selector.trim();
        return {
            type: Token.Type.Open,
            trace: makeTrace(trimmedSelector.length),
            selector: selector.trim(),
        };
    }),
    close: makeLexer(/}/my, (match, makeTrace) => {
        return {
            type: Token.Type.Close,
            trace: makeTrace(1),
        };
    }),
    ruleName: makeLexer(/([\S]+):/my, (match, makeTrace) => {
        const [, name] = match;
        const trimmedName = name.trim();
        return {
            type: Token.Type.RuleName,
            trace: makeTrace(trimmedName.length),
            name: trimmedName,
        };
    }),
    ruleValue: makeLexer(/([^;}]+)(;|(?=}))/my, (match, makeTrace) => {
        const [, value] = match;
        const trimmedValue = value.trim();
        return {
            type: Token.Type.RuleValue,
            trace: makeTrace(trimmedValue.length),
            value: trimmedValue,
        };
    }),
};
//# sourceMappingURL=lexers.js.map