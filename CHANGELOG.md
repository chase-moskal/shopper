
# shopper changelog

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
