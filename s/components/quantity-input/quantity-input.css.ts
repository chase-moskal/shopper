
import {css} from "lit-element"
export default css`

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

*:focus {
	outline: var(--focus-outline, 2px solid cyan)
}

:host {
	--button-scale: 1;
	--button-padding: 0.1em;
	--button-hover-background: #8882;
	--button-active-background: #7772;
	--border-radius: 0.2rem;
	--border-color: inherit;
	display: inline-flex;
	flex-direction: row;
	width: 3em;
}

#textinput, button {
	font-size: 1em;
}

#textinput {
	display: block;
	width: 100%;
	color: inherit;
	background: transparent;
	box-sizing: content-box;
	text-align: center;
	border: 1px solid var(--border-color);
	border-radius: var(--border-radius) 0 0 var(--border-radius)
}

#buttons {
	flex: 0 0 auto;
	display: flex;
	flex-direction: column;
	border-left: 0;
}

button {
	display: block;
	color: inherit;
	background: none;
	flex: 1 0 auto;
	font-size: calc(0.6em * var(--button-scale));
	padding: var(--button-padding);
	border: 1px solid var(--border-color);
	border-left: 0;
	line-height: 0.8em;
}

button:hover,
button:focus {
	background: var(--button-hover-background);
}

button:active {
	background: var(--button-active-background);
}

button:nth-child(1) {
	border-bottom: 0;
	border-top-right-radius: var(--border-radius);
}

button:nth-child(2) {
	border-top: 0;
	border-left: 0;
	border-bottom-right-radius: var(--border-radius);
}

`
