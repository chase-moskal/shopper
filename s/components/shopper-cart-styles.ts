
import {css} from "lit"

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
	border: var(--shopper-cart-table-border, 1px solid rgba(0,0,0, 0.1));
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
	color: inherit;
}

.shopper-cart .remove-button:hover,
.shopper-cart .remove-button:focus {
	opacity: 1;
}

.shopper-cart .remove-button svg {
	width: 100%;
	min-width: 1.5em;
	height: 1.5em;
	stroke-width: 4px;
}

/*
TABLE: QUANTITY
===============
*/

.shopper-cart quantity-input {
	display: flex;
	width: 3em;
	--border-color: transparent;
}

/*
TABLE: QUANTITY
===============
*/

.shopper-cart table 

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

@media (max-width: 600px) {
	.shopper-cart thead {
		display: none;
	}
	.shopper-cart table tr {
		margin-top: 2em;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		border-top: 1px solid #8884;
	}
	.shopper-cart tr > * {
		display: block;
		flex: 0 0 auto;
	}
	.shopper-cart .remove-cell {
		display: flex;
		align-items: center;
	}
	.shopper-cart quantity-input {
		font-size: 1.2em;
		width: 3em;
		--button-scale: 1.5;
	}
	.shopper-cart .product-title {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 1.2em;
		flex: 1 1 auto;
		width: unset !important;
		font-weight: bold;
		text-align: right;
	}
	.shopper-cart .line-price {
		flex: 1 0 auto;
		width: 100%;
	}
	.shopper-cart .cart-subtotal td {
		width: 100%;
	}
	.shopper-cart table * {
		border: none;
	}
	/* .shopper-cart .product-title {
		flex: 1 0 100%;
		display: block;
	} */
	/* .shopper-cart tr {
		display: block;
		margin-top: 2em;
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
	.shopper-cart quantity-input {
		display: flex;
		font-size: 1em;
		width: 5em;
		--button-scale: 1.2;
		--button-padding: 0.3em 0.6em;
		--border-color: #3332;
	}
	.shopper-cart tr {
		display: flex;
		flex-direction: column;
		margin-top: 2em;
	}
	.shopper-cart .product-title {
		order: -1;
	} */
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
