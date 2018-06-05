
# ***shopperman*** <br/> <small>cart ui for custom shopify frontends</small>

### basically

frontend tech to implement custom shopify stores

preact components, mobx stores, some scss

### goals

- **display a product for sale on a web page**
	- *buy now* button
	- *add to cart* button

- **cart system**
	- add and remove products from cart
	- ui to change item quantities
	- big green checkout button

- **currency conversion system**
	- currency switcher ui can be placed within cart
	- all prices on the site can flip currency based on one control

- **all state is kept in localstorage**
	- info like cart items, currency, is tracked
	- if you leave the page, and return, state is maintained
	- if you have multiple tabs open, all cart instances should auto-synchronize in realtime
