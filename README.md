
# shopper

**cart ui for custom shopify frontends**

- frontend tech to implement custom shopify stores
- preact components, mobx stores, some scss

## goals

- **display products for sale on a web page**
	- product display component
	- add to cart button

- **cart system**
	- add and remove products from cart
	- ui to change item quantities
	- big green checkout button

- (wip) **currency conversion system**
	- currency switcher ui can be placed within cart
	- all prices on the site can flip currency based on one control

- (wip) **all state is kept in localstorage**
	- info like cart items, currency, is tracked
	- if you leave the page, and return, state is maintained
	- if you have multiple tabs open, all cart instances should auto-synchronize
		in realtime

## see ["global.ts"](./source/global.ts) for usage example

## security notes

- **dangerouslySetInnerHtml with shopify product descriptions**

	html from the shopify api (product descriptions) is injected without
	sanitization

	this should be safe, so long as the connection to shopify is secured via
	https
