export class CamelCssError extends Error {
    constructor() {
        super(...arguments);
        this.name = this.constructor.name;
    }
}
//
// untracable errors
//
export class CamelCssMissingClosingBraceError extends CamelCssError {
    constructor(missingCloses) {
        const message = missingCloses > 1
            ? `missing ${missingCloses} closing braces "}"`
            : `missing ${missingCloses} closing brace "}"`;
        super(message);
    }
}
//
// traceable errors
//
export class CamelCssTraceableError extends CamelCssError {
    constructor(trace, message) {
        super(`(${trace.cursor.line}:${trace.cursor.column}) ${message}`);
        this.trace = trace;
    }
}
export class CamelCssMissingSelectorError extends CamelCssTraceableError {
    constructor(trace) {
        super(trace, `expression is missing selector`);
    }
}
export class CamelCssExcessClosingBraceError extends CamelCssTraceableError {
    constructor(trace) {
        super(trace, `unwanted closing brace "}"`);
    }
}
export class CamelCssRuleNamePlacementError extends CamelCssTraceableError {
    constructor(trace, ruleName) {
        super(trace, `invalid place for rule name "${ruleName}"`);
    }
}
export class CamelCssRuleValuePlacementError extends CamelCssTraceableError {
    constructor(trace, ruleValue) {
        super(trace, `invalid place for rule value "${ruleValue}"`);
    }
}
export const setupTracedErrors = (trace) => ({
    error: (message) => new CamelCssTraceableError(trace, message),
    missingSelector: () => new CamelCssMissingSelectorError(trace),
    excessClosingBrace: () => new CamelCssExcessClosingBraceError(trace),
    ruleNamePlacement: (ruleName) => new CamelCssRuleNamePlacementError(trace, ruleName),
    ruleValuePlacement: (ruleValue) => new CamelCssRuleValuePlacementError(trace, ruleValue),
});
//# sourceMappingURL=errors.js.map