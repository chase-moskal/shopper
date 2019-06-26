
# shopper — wip

## all new shopper

### concept overview

- frontend tech to implement custom shopify stores
- uses [shopify js-buy-sdk](https://github.com/Shopify/js-buy-sdk)
- integrates with the shopify cart system
- cart interface is implemented via web components
- [**view live shopper demo**](https://chasemoskal.com/shopper/)

### planned capabilities

- display produts for sale on a web page
- cart system
	- displays prices and subtotal
	- supports currency conversion via crnc
	- big green checkout button
- checkout through shopify

### implementation plan

```html
<shopper-product-list api-key="xxx-xxx-xxx" collection-id="xxx-xxx-xxx">
<shopper-cart api-key="xxx-xxx-xxx">
<shopper-cart-button>
<shopper-cart-system>
<shopper-cart-panel>
```

- `ShopifyEcommerceAdapter` — make api calls to shopify
- `loadProductsAndCollections` — load products and collections as json
- `ShopperWrangler()` — controls and coordinates shopper components on the page
