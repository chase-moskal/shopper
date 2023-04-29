
import {Trace} from "./parsing/ordinary/types.js"

export class CamelCssError extends Error {
	name = this.constructor.name
}

//
// untracable errors
//

export class CamelCssMissingClosingBraceError extends CamelCssError {
	constructor(missingCloses: number) {
		const message = missingCloses > 1
			? `missing ${missingCloses} closing braces "}"`
			: `missing ${missingCloses} closing brace "}"`
		super(message)
	}
}

//
// traceable errors
//

export class CamelCssTraceableError extends CamelCssError {
	constructor(public trace: Trace, message: string) {
		super(`(${trace.cursor.line}:${trace.cursor.column}) ${message}`)
	}
}

export class CamelCssMissingSelectorError extends CamelCssTraceableError {
	constructor(trace: Trace) {
		super(trace, `expression is missing selector`)
	}
}

export class CamelCssExcessClosingBraceError extends CamelCssTraceableError {
	constructor(trace: Trace) {
		super(trace, `unwanted closing brace "}"`)
	}
}

export class CamelCssRuleNamePlacementError extends CamelCssTraceableError {
	constructor(trace: Trace, ruleName: string) {
		super(trace, `invalid place for rule name "${ruleName}"`)
	}
}

export class CamelCssRuleValuePlacementError extends CamelCssTraceableError {
	constructor(trace: Trace, ruleValue: string) {
		super(trace, `invalid place for rule value "${ruleValue}"`)
	}
}

export const setupTracedErrors = (trace: Trace) => ({
	error: (message: string) =>
		new CamelCssTraceableError(trace, message),

	missingSelector: () =>
		new CamelCssMissingSelectorError(trace),

	excessClosingBrace: () =>
		new CamelCssExcessClosingBraceError(trace),

	ruleNamePlacement: (ruleName: string) =>
		new CamelCssRuleNamePlacementError(trace, ruleName),

	ruleValuePlacement: (ruleValue: string) =>
		new CamelCssRuleValuePlacementError(trace, ruleValue),
})
