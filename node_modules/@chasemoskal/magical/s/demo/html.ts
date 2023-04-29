
import {css} from "lit"
import {DemoApp} from "./demo-app.js"
import {themeElements} from "../theme-elements.js"
import {registerElements} from "../register-elements.js"
import {CounterElement} from "./elements/counter-element.js"

const theme = css`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
`

const elements = themeElements(
	theme,
	{
		DemoApp,
		CounterElement,
	}
)

registerElements(elements)

console.log("🪄 magical: successful startup")
