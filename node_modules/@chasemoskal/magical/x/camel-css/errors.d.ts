import { Trace } from "./parsing/ordinary/types.js";
export declare class CamelCssError extends Error {
    name: string;
}
export declare class CamelCssMissingClosingBraceError extends CamelCssError {
    constructor(missingCloses: number);
}
export declare class CamelCssTraceableError extends CamelCssError {
    trace: Trace;
    constructor(trace: Trace, message: string);
}
export declare class CamelCssMissingSelectorError extends CamelCssTraceableError {
    constructor(trace: Trace);
}
export declare class CamelCssExcessClosingBraceError extends CamelCssTraceableError {
    constructor(trace: Trace);
}
export declare class CamelCssRuleNamePlacementError extends CamelCssTraceableError {
    constructor(trace: Trace, ruleName: string);
}
export declare class CamelCssRuleValuePlacementError extends CamelCssTraceableError {
    constructor(trace: Trace, ruleValue: string);
}
export declare const setupTracedErrors: (trace: Trace) => {
    error: (message: string) => CamelCssTraceableError;
    missingSelector: () => CamelCssMissingSelectorError;
    excessClosingBrace: () => CamelCssExcessClosingBraceError;
    ruleNamePlacement: (ruleName: string) => CamelCssRuleNamePlacementError;
    ruleValuePlacement: (ruleValue: string) => CamelCssRuleValuePlacementError;
};
