
import {CSSResultGroup, TemplateResult} from "lit"

export interface ViewOptions {
	shadow?: boolean
	styles?: CSSResultGroup
}

export type StateMap = Map<number, [any, any]> // [currentState, previousState]
export type SetupMap = Map<number, () => void>

export type StateSettingFunction<xValue> = (previousValue: xValue) => xValue

export type ValueOrFunction<xValue> = xValue | ((previousValue: xValue) => xValue)

export type StateSetter<xValue> = (
	valueOrFunction: ValueOrFunction<xValue>
) => void

export type StateGetter<xValue> = () => xValue

export type StateTuple<xValue> = [

	// current value
	xValue,

	// setter
	StateSetter<xValue>,

	// getter
	StateGetter<xValue>,

	// previous value
	xValue,
]

export interface UseView {
	state<xValue>(initial: xValue | (() => xValue)): StateTuple<xValue>
	setup(e: (rerender: () => void) => () => void): void
}

export interface Renderer<xProps extends any[]> {
	(...props: xProps): TemplateResult | void
}

export interface View<xProps extends any[]> extends Renderer<xProps> {}

export type Sauce<xProps extends any[]> = (
	(use: UseView) => Renderer<xProps>
)
