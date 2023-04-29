export function* compile(expressions) {
    function recurse(expression, previousSelector) {
        let css = [];
        const [selector, rules, children] = expression;
        const compoundSelector = previousSelector
            ? handleParentReference(`${previousSelector} ${selector}`)
            : selector;
        const ruleEntries = Object.entries(rules);
        if (ruleEntries.length > 0) {
            const rulesString = ruleEntries
                .map(([ruleName, ruleValue]) => `\t${ruleName}: ${stripAwayComments(ruleValue)};`)
                .join("\n");
            css.push(`${stripAwayComments(compoundSelector)} {\n${rulesString}\n}`);
        }
        for (const child of children)
            css = [...css, ...recurse(child, compoundSelector)];
        return css;
    }
    yield "\n";
    for (const expression of expressions)
        yield "\n" + recurse(expression, undefined).join("\n");
    yield "\n";
}
function stripAwayComments(text) {
    return text.replaceAll(/(\s*)(\/\/.*)$/gm, "");
}
function handleParentReference(groupedSelector) {
    return groupedSelector.replaceAll(/(\s+)*(\^)/gm, "");
}
//# sourceMappingURL=compile.js.map