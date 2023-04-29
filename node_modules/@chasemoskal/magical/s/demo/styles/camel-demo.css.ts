
import {css} from "../../camel-css/lit.js"

export default css`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

section {
	> div {
		display: flex;
		gap: 0.5em;

		> div {
			flex: 1 1 auto;
			display: flex;
			flex-direction: column;
			color: white;

			textarea {
				width: 100%;
				height: 18em;
				padding: 0.2em;
				tab-size: 2;
				color: inherit;
				background: transparent;
				border-radius: 0.4em;
				border: 1px solid currentColor;
			}
		}

		> .output {
			color: #71ffa4;
			textarea:focus {
				outline: 0;
			}
		}
	}

	[data-problem] {
		.output {
			color: #ff6f57;
		}
	}

	.error {
		color: #ff6f57;
	}

	.time {
		font-size: 0.8em;
		color: white;
		opacity: 0.5;
		font-style: italic;
		text-align: right;
		padding: 0 1em;
	}
}

`
