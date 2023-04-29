
import {LitElement, html} from "lit"
import {property} from "lit/decorators.js"

import styles from "./quantity-input.css.js"
import {QuantityChangeEvent} from "./events/quantity-change-event.js"

export class QuantityInput extends LitElement {
	static readonly tag = "quantity-input"
	static readonly QuantityChangeEvent = QuantityChangeEvent
	static readonly styles = styles

	@property({type: Number, reflect: true})
	step: number = 1

	@property({type: Number, reflect: true})
	min: number = 1

	@property({type: Number, reflect: true})
	max: number = 25

	#value: number = this.min

	@property({type: Number, reflect: true})
	set value(value: number) {
		const oldValue = this.#value
		this.#value = this.#cap(value)
		this.requestUpdate("value", oldValue)
	}

	get value() {
		return this.#value
	}

	onquantitychange: (event: QuantityChangeEvent) => void

	firstUpdated() {
		this.#validateProperties()
		if (this.onquantitychange)
			this.addEventListener(
				QuantityInput.QuantityChangeEvent.event,
				this.onquantitychange
			)
	}

	#roundStep = (n: number, step: number, up: boolean) => {
		return up
			? n + (step - (n % step))
			: n - (n % step)
	}

	#validateProperties = () => {
		const warn = (message: string) => {
			console.warn(`<${QuantityInput.tag}>: ${message}`)
		}
		const mustBeInteger = (n: number, label: string) => {
			if (n % 1 !== 0) {
				const int = Math.floor(n)
				warn(`${label}=${n} must be integer (using ${label}=${int})`)
				n = int
			}
			return n
		}
		this.step = mustBeInteger(this.step, "step")
		this.min = mustBeInteger(this.min, "min")
		this.max = mustBeInteger(this.max, "max")
		this.#value = mustBeInteger(this.#value, "value")
		if (this.step < 1) {
			warn(`step=${this.step} must be at least 1 (using step=1)`)
			this.step = 1
		}
		const value = this.#value
		const {step, min, max} = this
		const up = true
		const down = false
		const lockstep = (n: number, label: string, up: boolean) => {
			if (n % step !== 0) {
				const newValue = this.#roundStep(n, step, up)
				warn(`${label}=${n} not allowed with step=${step} `
					+ `(using ${label}=${newValue})`)
				n = newValue
			}
			return n
		}
		this.min = lockstep(min, "min", up)
		this.max = lockstep(max, "max", down)
		this.#value = lockstep(value, "value", down)
		if (this.max < this.min) {
			this.max = this.min + step
			warn(`max=${max} cannot be less than min=${min} `
				+ `(using max=${this.max})`)
		}
		this.value = this.#value
	}
	
	#cap = (value: number) => {
		value = this.#roundStep(value, this.step, false)
		value = value >= this.max ? this.max : value
		value = value <= this.min ? this.min : value
		return value
	}
	
	#fireQuantityChange = () => {
		this.dispatchEvent(new QuantityInput.QuantityChangeEvent(this.#value))
	}
	
	increment = () => {
		this.value = this.value + this.step
		this.#fireQuantityChange()
	}
	
	decrement = () => {
		this.value = this.value - this.step
		this.#fireQuantityChange()
	}
	
	#textAsInteger = (text: string): number | false => {
		return /^[\d]+$/.test(text)
			? parseInt(text)
			: false
	}
	
	#handleInputChange = () => {
		const originalValue = this.#value
		const input = this.shadowRoot.querySelector<HTMLInputElement>("#textinput")
		const {value: text} = input
		const converted = this.#textAsInteger(text)
		const newValue = converted === false
			? originalValue
			: this.#cap(converted)
		if (newValue.toString() !== text)
			input.value = newValue.toString()
		if (newValue !== originalValue) {
			this.#value = newValue
			this.#fireQuantityChange()
		}
	}

	render() {
		return html`
			<input
				id=textinput
				type=text
				inputmode=numeric
				.value=${this.#value.toString()}
				min=${this.min}
				max=${this.max}
				step=${this.step}
				@change=${this.#handleInputChange}
				/>

			<div id=buttons>
				<button
					part=button
					@click=${this.increment}>
						△
				</button>
				
				<button
					part=button
					@click=${this.decrement}>
						▽
				</button>
			</div>
		`
	}
}
