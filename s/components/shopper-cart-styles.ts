
import {css} from "lit-element"

export const shopperCartStyles = css`

/*
FUNDAMENTAL STYLES
==================
*/

.shopper-cart, .shopper-cart * {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.shopper-cart {
	font-family: var(--shopper-font-family, sans-serif);
}

/*
CART ITEM TABLE
===============
*/

.shopper-cart table {
	width: 100%;
	margin: 1em auto;
}

.shopper-cart th,
.shopper-cart td {
	padding: 0.25rem;
}

.shopper-cart th {
	opacity: 0.5;
	font-size: 0.7em;
	font-style: sans-serif;
	text-transform: uppercase;
	text-align: left;
}

.shopper-cart td {
	border: 1px solid rgba(0,0,0, 0.1);
}

.shopper-cart th:nth-child(1),
.shopper-cart td:nth-child(1),
.shopper-cart th:nth-child(2),
.shopper-cart td:nth-child(2) {
	text-align: center;
}

.shopper-cart th:nth-child(3),
.shopper-cart td:nth-child(3) {
	width: 99%;
}

.shopper-cart th:nth-last-child(1),
.shopper-cart td:nth-last-child(1) {
	text-align: right;
	white-space: nowrap;
}

/*
TABLE: REMOVE BUTTONS
=====================
*/

.shopper-cart .remove-button {
	opacity: 0.5;
	width: 100%;
	background: transparent;
	border: none;
	cursor: pointer;
	color: #444;
}

.shopper-cart .remove-button:hover,
.shopper-cart .remove-button:focus {
	opacity: 1;
}

.shopper-cart .remove-button svg {
	width: 100%;
	min-width: 1.5em;
	height: 1.5em;
}

/*
TABLE: SUBTOTAL
===============
*/

.shopper-cart .cart-subtotal {
	text-align: right;
	border-top: 1px solid grey;
}

.shopper-cart .cart-subtotal th {
	width: 99%;
	text-align: right;
}

.shopper-cart .cart-subtotal td {
	white-space: nowrap;
}

/*
TABLE: MEDIA QUERIES
====================
*/

@media (max-width: 800px) {
	.shopper-cart thead {
		display: none;
	}
	.shopper-cart tr {
		display: block;
		margin-top: 1em;
	}
	.shopper-cart th,
	.shopper-cart td {
		padding: 0.1rem;
		display: inline-block;
	}
	.shopper-cart td {
		border: none;
	}
	.shopper-cart .product-title {
		font-weight: bold;
	}
	.shopper-cart price-display {
		margin-left: 1em;
	}
}

/*
CART CHECKOUT
=============
*/

.shopper-cart .cart-checkout {
	text-align: right;
}

.shopper-cart .cart-checkout button {
	font-size: 1.2em;
	padding: 0.5em 1em;
	font-weight: bold;
}

`
