import { css } from "lit-element";
export const priceDisplayStyles = css `

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

*:focus {
	outline: var(--focus-outline, 2px solid cyan);
}

:host {
	display: inline-block;
}

.price-display {
	display: flex;
	flex-direction: var(--price-display-flex-direction, column);
	align-items: var(--price-display-align-items, flex-start);
}

.price-display > div {
	flex: 1 1 auto;
}

.price-area {
	position: relative;
}

.price-display > .price-area > span {
	display: inline-block;
}

.symbol {
	vertical-align: top;
}

.price-area .amount {
	font-size: 1.5em;
}

.compared .amount {
	font-size: 1em;
}

button {
	border: none;
	background: transparent;
	font: inherit;
	color: inherit;
	text-align: inherit;
	line-height: 1em;
}

.code {
	padding: 0.1em;
	display: inline-block;
	cursor: pointer;
	border: 1px solid transparent;
	border-radius: 3px;
}

.code:hover {
	border: var(
		--price-display-code-hover-border,
		1px solid rgba(128,128,128, 0.5)
	);
}

.code .down {
	opacity: 0.5;
	margin-left: 0.2em;
}

.menu {
	list-style: none;
	position: absolute;
	font-size: var(--price-display-menu-font-size, 1rem);
	top: 100%;
	left: 0;
	width: 100%;
	min-width: var(--price-display-menu-min-width, 14em);
	z-index: 1;
	text-align: left;
	color: var(--price-display-menu-color, #222);
	white-space: normal;
}

.menu::before {
	position: absolute;
	content: "";
	display: block;
	width: 0px;
	height: 0px;
	border: 10px solid transparent;
	border-bottom-color: var(--price-display-menu-background, white);
	top: -20px;
	right: var(--price-display-menu-border-radius, 5px);
}

:host([right]) .menu {
	left: unset;
	right: 0;
}

.menu > li > button {
	display: block;
	width: 100%;
	cursor: pointer;
	background: var(--price-display-menu-background, white);
}

.menu > li:first-child > button {
	border-radius:
		var(--price-display-menu-border-radius, 5px)
		var(--price-display-menu-border-radius, 5px)
		0 0;
}

.menu > *:last-child {
	border-radius:
		0 0
		var(--price-display-menu-border-radius, 5px)
		var(--price-display-menu-border-radius, 5px);
}

.menu-note,
.menu > li > button {
	padding: 0.6rem;
}

.menu-note {
	padding: 0.2rem 0.6rem;
}

.menu > li > button:hover,
.menu > li > button:focus {
	background: var(--price-display-menu-hover-background, deepskyblue);
	color: var(--price-display-menu-hover-color, white);
}
.menu > li > button:active {
	background: var(--price-display-menu-active-background, #0080ab);
	color: var(--price-display-menu-active-color, unset);
}

.menu > li > button > span {
	vertical-align: middle;
}

.menu-symbol {
	font-weight: bold;
}

.menu-star {
	opacity: 0.75;
}

.menu-name {
	margin-left: 0.5em;
}

.menu-note {
	font-size: var(--price-display-menu-font-size, 0.8em);
	font-style: var(--price-display-menu-font-style, italic);
	color: var(--price-display-menu-note-color, #222222bd);
	background: var(--price-display-menu-note-background, #f9e996);
}

.blanket {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0,0,0, 0.5);
	z-index: 1;
	backdrop-filter: var(--price-display-blanket-backdrop, blur(5px));
	-webkit-backdrop-filter: var(--price-display-blanket-backdrop, blur(5px));
}

.discount-area {
	display: flex;
	font-size: var(--price-display-discount-area-font-size, 1em);
	flex-direction: var(--price-display-discount-area-flex-direction, row);
}

.discount-area > * {
	margin: 0 0.1em;
}

.compared {
	font-size: var(--price-display-compared-font-size, 1em);
	opacity: var(--price-display-compared-opacity, 0.3);
}

.compared .amount {
	text-decoration: line-through;
}

.compared, .percent-off {
	display: flex;
	align-items: center;
}

.compared .symbol {
	font-size: 0.7em;
	align-self: flex-start;
}

.percent-off {
	opacity: var(--price-display-percent-off-opacity, 0.5);
	font-size: var(--price-display-percent-off-font-size, 1em);
	padding: var(--price-display-percent-off-padding, 0 0.2em);
	color: var(--price-display-percent-off-color, inherit);
	background: var(--price-display-percent-off-background, transparent);
	border: var(--price-display-percent-off-border, none);
	border-radius: var(--price-display-percent-off-border-radius, 3px);
}

`;
//# sourceMappingURL=price-display-styles.js.map