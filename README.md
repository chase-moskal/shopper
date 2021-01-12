
# 🛒 ***shopper** – shopify cart ui*

shopper lets you plug your shopify store onto your website
- [**⚡ live demo**](https://chasemoskal.com/shopper/)
- easy html install, works on any website, customizable visuals
- full shopping cart experience with shopify checkout button
- display all your store's products, or individual collections, or individual products
- built-in currency conversions for displaying prices to users

shopper is experimental open source technology
- future versions may be subject to change
- contributions welcome

## 📦 install and configure shopper with html

1. **load shopper with `<script>` elements** (and some polyfills)

    ```html
    <script async defer src="https://unpkg.com/sorry-not-sorry"></script>
    <script defer src="https://unpkg.com/whatwg-fetch@3.5.0/dist/fetch.umd.js"></script>
    <script defer src="https://unpkg.com/@webcomponents/webcomponentsjs@2.5.0/webcomponents-bundle.js"></script>

    <script type="importmap-shim" src="https://unpkg.com/shopper@0.2.0-dev.0/x/importmap.json"></script>
    <script type="module-shim">
      import "menutown"
      import "https://unpkg.com/shopper@0.2.0-dev.0/x/shopper.js"
    </script>
    <script defer src="https://unpkg.com/es-module-shims@0.8.0/dist/es-module-shims.js"></script>
    ```

    place this in your html document's `<head>` section

2. **configure shopper with a `<shopper-config>` element**

    place this in your html `<body>` section to get started

    ```html
    <shopper-config
      mock
      base-currency="cad"
      currencies="cad,usd,gbp,eur"
    ></shopper-config>
    ```

    the above config is in `mock` mode, which lets you play around with fake products

    the next step is to replace this configuration with the one below, however substituting the shopify data for your own, to connect your real shopify store

    ```html
    <shopper-config
      base-currency="cad"
      currencies="cad,usd,gbp,eur"
      shopify-domain="dev-bakery.myshopify.com"
      shopify-storefront-access-token="5f636be6b04aeb2a7b96fe9306386f25"
    ></shopper-config>
    ```

    you can find your shopify details somewhere in your shopify account ¯\\\_(ツ)\_/¯  
    (somebody please write instructions for this, contributions welcome!)

3. **place `<shopper-cart>` element somewhere on your page**

    this is all you need

    ```html
    <shopper-cart></shopper-cart>
    ```

    however, optionally, you may wish instead to place the cart inside a menu system (like in the demo)

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

- `shopper` is published as an npm package
- shopper saves data to `localStorage` to keep track of your cart details between page loads

## 💖 made with open source love

- please file issues and collaborate!
- created by chase moskal
