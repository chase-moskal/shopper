
import {html} from "lit"
import {view} from "../../view.js"
import counterStylesCss from "../styles/counter-styles.css.js"

export const CounterView = view({
		shadow: true,
		styles: counterStylesCss,
	}, use => (start: number) => {

	const [count, setCount] = use.state(start)
	const increment = () => setCount(previous => previous + 1)

	return html`
		<div>
			<p>count ${count}</p>
			<button @click=${increment}>increment</button>
		</div>
	`
})
