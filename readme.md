
<br/>

# 🛒 shopper

### [🚀 live demo of shopper](https://shopper.chasemoskal.com/)  

[🕹️ also see the codepen demo](https://codepen.io/ChaseMoskal/pen/wvpVQLz)  

💰 plug your shopify store onto any website!  
🛍️ full shopping cart experience with shopify checkout button  
✨ easy html installation! works on any website  
💱 users get [currency conversions](https://github.com/chase-moskal/crnc#readme) to view prices  
💖 free and open source, just for you  

<br/>
<br/>

## ✨ easy html install

1. **add `<script>` elements in your html `<head>`**

    ```html
   <script type="importmap-shim">
      {"imports": {
        "shopper/": "https://unpkg.com/shopper@0.2/",
        "shopper": "https://unpkg.com/shopper@0.2/x/shopper.js"
      }}
    </script>
    <script type="importmap-shim" src="https://unpkg.com/shopper@0.2/x/importmap-cloud.json"></script>

    <script defer type=module-shim>
      import "shopper/x/install-xiome-menu-system.js"
      import "shopper/x/install-shopper.js"
    </script>

    <script defer src="https://unpkg.com/es-module-shims@1.5/dist/es-module-shims.wasm.js"></script>
    ```

    note: this technique uses [es-module-shims](https://github.com/guybedford/es-module-shims), and if you're already using es-module-shims for something else on the page, just don't repeat that last line (you only want that once per page).

1. **place a `<shopper-config>` element in your html `<head>`**

    ```html
    <shopper-config
      mock
      base-currency="cad"
      currencies="usd gbp eur"
    ></shopper-config>
    ```

    the above config is in `mock` mode, which lets you play around with fake products

    we'll explain how to connect your real store in the next section

1. **place the `<shopper-cart>` element somewhere on your page**

    this is all you need

    ```html
    <shopper-cart></shopper-cart>
    ```

    however, you may wish instead to place the cart inside a menu system (like in the demo)

    ```html
    <xio-menu sticky>
      <xio-menu-item>

        <shopper-button></shopper-button>
        <shopper-cart slot="panel"></shopper-cart>

      </xio-menu-item>
    </xio-menu>
    ```

    also, the cart can take a `checkout-in-same-window` attribute, if you want to avoid a popup during checkout

    ```html
    <shopper-cart checkout-in-same-window></shopper-cart>
    ```

1. **list products for sale**

    list all store products with a `<shopper-collection>` element and the `all` attribute

    ***note:*** your products have to be in *any* collection, for them to appear this way.

    ```html
    <shopper-collection all></shopper-collection>
    ```

    list a single collection. get the `link` by copying and pasting the url from your shopify admin panel

    ```html
    <shopper-collection link="https://dev-bakery.myshopify.com/admin/collections/424441479"></shopper-collection>
    ```

    display a single product for sale.

    ```html
    <shopper-product link="https://dev-bakery.myshopify.com/admin/products/10232162183"></shopper-product>
    ```

    again, you simply copy the link from the product page's url in the shopify dashboard.

    you actually don't need the whole link, just the numbers from the end part of the url.

1. **customize the display of products**

    ```html
    <shopper-product
      link="10232162183"
      href="/products/avocado-toast"
      show-image
      image-size="300x200"
    ></shopper-product>
    ```

    - `link` — product url from the shopify admin dashboard
    - `href` — make the item clickable, taking the user to any url
    - `show-image` — attach this attribute if you want the product's first image to be displayed
    - `image-size` — specify the dimensions the image should be loaded at
      - if omitted, the image will be full-resolution
      - `image-size="200"` will constrain the image to `200x200`
      - `image-size="300x200"` will constrain the image to `300x200`

    ```html
    <shopper-collection
      show-images
      image-sizes="300x200"
    ></shopper-collection>
    ```

<br/>
<br/>

## 📡 connect shopper to your real shopify store

- **replace your `<shopper-config>`**  
    use the example below, but use your own values!

    ```html
    <shopper-config
      base-currency="cad"
      currencies="usd gbp eur"
      shopify-domain="dev-bakery.myshopify.com"
      shopify-storefront-access-token="5f636be6b04aeb2a7b96fe9306386f25"
    ></shopper-config>
    ```

- **get your `baseCurrency` correct!**  
    this is the same as your store base currency setting in shopify.

- **if you provide `currencies`, they'll be available for the user to choose**  
    this is how you specify which currencies you want to allow the currency conversion system to use.  
    see [crnc](https://github.com/chase-moskal/crnc#readme) for more details.  

- **obtain your `shopify-domain` and `shopify-storefront-access-token`**
    - login to your shopify store's admin area
    - copy your `shopify-domain` from your browser address bar's url
    - create a new private app (a connection point for your website)
        1. click on the "apps" section on the left sidebar
        1. click the sneaky "Manage private apps" link
        1. check on the agreements and stuff to enable private apps
        1. click "Create new private app"
        1. enter the app name, and developer email
        1. skip the whole "Admin API" section
        1. enable "Storefront API" and check on all "Read" permissions
        1. save your app
    - copy your app's "Storefront access token" (NOT TO BE CONFUSED with the "API Token") and use this as your `shopify-storefront-access-token`

<br/>
<br/>

## 💅 customize shopper's appearance with css

- **shopper looks very plain and ugly by default**  
    that's because it's designed to be customized.  
    shopper only comes with bare-bones layout styles, so it's as easy as possible to customize to match your store  
- **shopper's web components render to light-dom**  
    this allows complete css customization  
- **basic css knowledge is required for visual customizations**  
    the recommended workflow, is to right-click inspect-element anything you want to customize, look at it's element names and class names, and then write some CSS rules on your page.  
    you have to be a bit of a nerd to get this done.  
    we're open to somebody writing some standard themes so people can avoid this step in the future  

<br/>
<br/>

## 👩‍🔧 under the hood

- published as an npm package `shopper`
- written in typescript
- es modules
- universally-compatible web components
- only makes network requests to shopify, and to https://www.bankofcanada.ca/valet/docs to fetch exchange rates via [crnc](https://github.com/chase-moskal/crnc#readme)
- saves cart data to `localStorage` to keep track of your cart between page loads

<br/>
<br/>

## 💖 made with open source love, just for you

- please file issues and collaborate 🍻
- we should make some example css themes that look good so people don't have to customize the css
- we should publish an optimized rollup build for end-use (not suitable for consumption from apps with their own build)
