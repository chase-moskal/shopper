
import {LitElement, html, css} from "lit"

import {mixinCss} from "../mixins/css.js"
import {CounterView} from "./views/counter-view.js"
import {CamelDemo} from "./views/camel-demo.js"

@mixinCss(css`
:host > * + * { margin-top: 0.5em; }
div { margin-bottom: 2em; }
`)
export class DemoApp extends LitElement {
	render() {
		return html`

			<p>example view:</p>
			<div>
				${CounterView(0)}
			</div>

			<p>example element:</p>
			<div>
				<counter-element start=2></counter-element>
			</div>

			<h2>camel css demo</h2>
			<div>
				${CamelDemo()}
			</div>
		`
	}
}
