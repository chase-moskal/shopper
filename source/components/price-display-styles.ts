
import {css} from "lit-element"

export const priceDisplayStyles = css`

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
	align-items: var(--price-display-align-items, center);
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
	border-radius: 3px;
	overflow: hidden;
}

:host([right]) .menu {
	left: unset;
	right: 0;
}

.menu > li > button {
	display: block;
	width: 100%;
	padding: 0.6em;
	background: var(--price-display-menu-background, white);
	color: var(--price-display-menu-color, #222);
	cursor: pointer;
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

.menu-name {
	/* font-size: 0.8em; */
	margin-left: 0.5em;
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
	flex-direction: var(--price-display-discount-area-flex-direction, row);
}

.discount-area > * {
	margin: 0 0.1em;
}

.compared {
	font-size: var(--price-display-compared-font-size, 1em);
	opacity: var(--price-display-compared-opacity, 0.7);
}

.compared .amount {
	text-decoration: line-through;
}

.compared, .percent-off {
	display: flex;
	align-items: center;
}

.compared .symbol {
	align-self: flex-start;
}

.percent-off {
	opacity: var(--price-display-percent-off-opacity, 1);
	font-size: var(--price-display-percent-off-font-size, 1em);
	padding: var(--price-display-percent-off-padding, 0 0.1em);
	color: var(--price-display-percent-off-color, inherit);
	background: var(--price-display-percent-off-background, transparent);
	border: var(--price-display-percent-off-border, none);
	border-radius: var(--price-display-percent-off-border-radius, 3px);
}

`
