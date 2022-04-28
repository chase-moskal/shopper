
# shopper changelog

### v0.2.0

- significant refactor
- definitely breaking
  - move `<price-display>` elements into [crnc](https://github.com/chase-moskal/crnc#readme) as `crnc-price`.
  - new entry point is an index, not a direct install script, `shopper/x/install-shopper.js` will register components, so now you can import things from `import {} from "shopper"` which points to `shopper/x/shopper.js`.
  - `<shopper-cart>` is now a shadow dom component. this was necessary to implement shadow slots.
- maybe breaking?
  - refactor the way crnc is integrated, now via its `currencyConverter`.
  - shopper cart has new `require-terms-checked` attribute, which requires a terms checkbox to be ticked before checkout is possible. there are new slots related to this:
      ```html
      <shopper-cart require-terms-checked>
        <div slot=before-checkout>these are the terms: i am the captain now</div>
        <div slot=terms-consent>yes, i understand these terms above.</div>
        <div slot=after-checkout>note: shipments to mars have a ten million dollar fee.</div>
      </shopper-cart>
      ```
- probably not breaking
  - license change: from isc license, to mit license.
  - all new ci/cd routine via github actions.

### v0.2.0-dev.11

- upgrade to xiome menu system, removing menutown
- modernize to `lit` package, removing `lit-html` and `lit-element`
- improve customizability, expose more css variables and `::part`s
- switch to mit license, from isc

### v0.2.0-dev.11

- add: sale attribute

### v0.2.0-dev.10

breaking:
- add: div inside shopper-product `.product-content` that contains `.title` and `.box`

### v0.2.0-dev.9

- increase: product limit to 249 (up from 20)
- implement: persistent state across tabs
- implement: new `link` attr is easier to use than `uid` (now you can just use links from shopify to reference collections and products)

### v0.2.0-dev.8

lots of little feature and aesthetic additions that i didn't keep track of

### v0.1.0-dev.18

massive refactor, everything is different now

### v0.1.0-dev.6

breaking changes
- decimate the old menu system usage, now menutown must be used
- split `shopper.scss` into `shopper-demo.scss` and `shopper-mixins.scss`

other changes
- integrate menutown menu system
- add `source/routines` functions for menutown integration 

### v0.1.0-dev.5

breaking changes:
- rename `collections` to `collectionsToLoad`
- rename `ecommerceShopifyStore` to `ecommerceShopifyShop`
- organize the ecommerce helper functions


other changes:
- all stores have `store` suffix
- update readme and comments
- update vscode tasks
- replace axx build system with npm scripts
- use pug layout instead of index.html
- add new deploy script

### v0.0.0

- initial release
