
# 🛒 ***shopper** – shopify cart ui*

[**⚡ live demo**](https://chasemoskal.com/shopper/) — shopper is a shopify cart system for selling shopify products on your own websites

## 📦 install and configure shopper with html

1. **load shopper with `<script>` elements** (and some polyfills)

	```html
	<script defer src="https://cdn.jsdelivr.net/npm/whatwg-fetch@3.0.0/dist/fetch.umd.js"></script>
	<script defer src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.4.0/webcomponents-bundle.js"></script>

	<script type="importmap-shim" src="https://unpkg.com/shopper@0.1.0-dev.21/dist/importmap.json"></script>
	<script type="module-shim">
		import "menutown"
		import "shopper"
	</script>

	<script defer src="https://unpkg.com/es-module-shims@0.4.6/dist/es-module-shims.js"></script>
	```

2. **configure shopper with a `<shopper-config>` element**

	```html
	<shopper-config
		shopify-domain="dev-bakery.myshopify.com"
		shopify-storefront-access-token="5f636be6b04aeb2a7b96fe9306386f25"
	></shopper-config>
	```

	you can find your shopify details somewhere in your shopify account ¯\\\_(ツ)\_/¯

	also, you can add a `mock` attribute to play with dummy data (instead of connecting to a real shopify account)

3. **place `<shopper-cart>` element somewhere on your page**

	this is all you need

	```html
	<shopper-cart></shopper-cart>
	```

	however, optionally, you may wish to place the cart inside a menu system (like in the demo)

	```html
	<menu-system initially-hidden sticky>
		<menu-display>

			<shopper-button slot="button"></shopper-button>
			<shopper-cart></shopper-cart>

		</menu-display>
	</menu-system>
	```

	also, the cart can take a `checkout-in-same-window` attribute, if you want to avoid a popup during checkout

	```html
	<shopper-cart checkout-in-same-window></shopper-cart>
	```

4. **list products for sale**

	list all store products with a collection element and the `all` attribute

	```html
	<shopper-collection all></shopper-collection>
	```

	list a single collection by its shopify uid

	```html
	<shopper-collection uid="Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ=="></shopper-collection>
	```

	display a single product for sale

	```html
	<shopper-product uid="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzEwMjMyMTYyMTgz"></shopper-product>
	```

## 💅 customize shopper's appearance with css

- shopper components render directly to the light-dom, so your page's css can easily override styles within shopper's components ✔

## 👩‍🔧 under the hood

- `shopper` is published as an npm package, so you can roll-it-up or webpack it at your leisure
- shopper saves data to `localStorage` to keep track of your cart details between page loads
- shopper's official public interface is what's available via html configuration (consider shopper's javascript modules as internal implementations which might change, so you can choose to use the javascript modules directly for advanced customizations at your own risk)

## 💖 made with open source love

- [twitch.tv/chasemoskal](https://www.twitch.tv/chasemoskal) catch me live streaming open source work like this
- please file issues and collaborate!
