
import {css} from "lit-element"

export const shopperCartStyles = css`

/*
FUNDAMENTAL STYLES
==================
*/

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

:host {
	font-family: var(--shopper-font-family, sans-serif);
}

/*
CART ITEM TABLE
===============
*/

table {
	width: 100%;
	margin: 1em auto;
}

th, td {
	padding: 0.25rem;
}

th {
	font-style: sans-serif;
	font-size: 0.8em;
	opacity: 0.35;
	text-transform: uppercase;
	text-align: left;
}

td {
	border: 1px solid rgba(0,0,0, 0.1);
}

th:nth-child(1), td:nth-child(1),
th:nth-child(2), td:nth-child(2) {
	text-align: center;
}

th:nth-child(3), td:nth-child(3) {
	width: 99%;
}

th:nth-last-child(1), td:nth-last-child(1) {
	text-align: right;
	white-space: nowrap;
}

/*
TABLE: REMOVE BUTTONS
=====================
*/

.remove-button {
	opacity: 0.5;
	width: 100%;
	background: transparent;
	border: none;
	cursor: pointer;
	color: #444;
}

.remove-button:hover, .remove-button:focus {
	opacity: 1;
}

.remove-button svg {
	width: 100%;
	min-width: 1.5em;
	height: 1.5em;
}

/*
TABLE: SUBTOTAL
===============
*/

.cart-subtotal {
	text-align: right;
	border-top: 1px solid grey;
}

.cart-subtotal th {
	width: 99%;
	text-align: right;
}

.cart-subtotal td {
	white-space: nowrap;
}

/*
TABLE: MEDIA QUERIES
====================
*/

@media (max-width: 420px) {
	thead {
		display: none;
	}
	tr {
		display: block;
		margin-top: 1em;
	}
	th, td {
		padding: 0.1rem;
		display: inline-block;
	}
	td {
		border: none;
	}
}

/*
CART CHECKOUT
=============
*/

.cart-checkout {
	text-align: right;
}

.cart-checkout button {
	font-size: 1.2em;
	padding: 0.5em 1em;
	font-weight: bold;
}

`
