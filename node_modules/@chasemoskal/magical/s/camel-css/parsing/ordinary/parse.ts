
import {Token} from "./types.js"
import {Expression} from "../../types.js"
import {CamelCssMissingClosingBraceError, setupTracedErrors} from "../../errors.js"

export function* parse(tokens: Iterable<Token.Any>) {
	type StackFrame = {
		selector: undefined | string
		ruleName: undefined | string
		rules: {[key: string]: string}
		childFrames: StackFrame[]
	}

	let frame: undefined | StackFrame
	const stack: StackFrame[] = []

	for (const token of tokens) {
		const error = setupTracedErrors(token.trace)
		switch (token.type) {

			case Token.Type.Open: {
				frame = {
					selector: token.selector.replaceAll(/\s+/gm, " "),
					ruleName: undefined,
					rules: {},
					childFrames: [],
				}
				stack.push(frame)
			} break

			case Token.Type.RuleName: {
				if (!frame)
					throw error.ruleNamePlacement(token.name)
				frame.ruleName = token.name
			} break

			case Token.Type.RuleValue: {
				if (!frame || !frame.ruleName)
					throw error.ruleValuePlacement(token.value)
				frame.rules[frame.ruleName] = token.value
				frame.ruleName = undefined
			} break

			case Token.Type.Close: {
				const completedFrame = stack.pop()
				const parentFrame = stack.length > 0
					? stack[stack.length - 1]
					: undefined
				frame = parentFrame

				if (!completedFrame)
					throw error.excessClosingBrace()

				if (!completedFrame.selector)
					throw error.missingSelector()

				if (parentFrame)
					parentFrame.childFrames.push(completedFrame)
				else {
					function recursiveFrameToExpression(frame: StackFrame): Expression {
						return [
							frame.selector!,
							frame.rules,
							frame.childFrames.map(recursiveFrameToExpression),
						]
					}
					yield recursiveFrameToExpression(completedFrame)
				}
			} break
		}
	}

	if (stack.length > 0)
		throw new CamelCssMissingClosingBraceError(stack.length)
}
