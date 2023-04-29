
import {html} from "lit"

import {view} from "../../view.js"
import {camelCss} from "../../camel-css/lit.js"
import camelDemoCss from "../styles/camel-demo.css.js"
import {CamelCssError} from "../../camel-css/errors.js"
import {debounce} from "../../toolbox/debounce/debounce.js"

const startingInput = `
header {
	color: red;

	h1 {
		font-size: 1rem;

		^:hover {
			color: yellow;
		}
	}
}
`

export const CamelDemo = view({
		shadow: true,
		styles: camelDemoCss,
	}, use => () => {

	const [input, setInput] = use.state(startingInput.trim())
	const [debouncedSetInput] = use.state(() => debounce(250, setInput))

	function handleInput(event: InputEvent) {
		const input = <HTMLInputElement>event.target!
		debouncedSetInput(input.value)
	}

	let time: number | undefined
	let output = ""
	let problem = ""
	const start = performance.now()
	try {
		output = camelCss(input)
	}
	catch (error: any) {
		console.warn(error)
		problem = error instanceof CamelCssError
			? `${error.name}: ${error.message}`
			: `unknown error ${error.name}: ${error.message}`
	}
	finally {
		time = performance.now() - start
	}

	const timeDisplay = time !== undefined
		? html`<p class=time>${time.toFixed(2)} ms</p>`
		: null

	const outputOrProblem = problem ?problem :output.trim()

	return html`
		<section>
			<div ?data-problem=${!!problem}>
				<div class=input>
					<strong>input</strong>
					<textarea
						@input=${handleInput}
						@keyup=${handleInput}
						spellcheck=false>${input}</textarea>
				</div>
				<div class=output>
					<strong>output</strong>
					<textarea readonly spellcheck=false>${outputOrProblem}</textarea>
				</div>
			</div>
			${timeDisplay}
		</section>
	`
})
