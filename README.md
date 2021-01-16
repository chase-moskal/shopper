
# 🛒 ***shopper** – shopify cart ui for any website*

**put your shopify store on any website — and customize it!**

&nbsp; &nbsp; [⚡ live demo](https://chasemoskal.com/shopper/)  
&nbsp; &nbsp; 🛍️ full shopping cart experience with shopify checkout button  
&nbsp; &nbsp; 🔧 easy html installation! works on any website  
&nbsp; &nbsp; 🏷️ display all your store's products, or individual collections, or individual products  
&nbsp; &nbsp; 💱 built-in currency conversions for displaying prices to users  

**shopper is experimental open source technology**
- built on the [shopify buy js sdk](https://shopify.github.io/js-buy-sdk/)
- aims to be used by people who only know basic html and css
- future versions of shopper may be subject to change
- contributions welcome
- [discord chat](https://discord.gg/vFFDqHT2AB)

## 📦 install and configure shopper with simple html

1. **add `<script>` elements in your html `<head>`**

    ```html
    <script type="importmap-shim" src="https://unpkg.com/shopper@0.2.0-dev.2/x/importmap.json"></script>
    <script defer type="module-shim">
      import "menutown"
      import "https://unpkg.com/shopper@0.2.0-dev.2/x/shopper.js"
    </script>
    <script defer src="https://unpkg.com/es-module-shims@0.8.0/dist/es-module-shims.js"></script>
    ```

1. **configure shopper with a `<shopper-config>` element**

    also place this in your html `<head>`

    ```html
    <shopper-config
      mock
      base-currency="cad"
      currencies="cad,usd,gbp,eur"
    ></shopper-config>
    ```

    the above config is in `mock` mode, which lets you play around with fake products

    we'll explain how to connect your real store in the next section

1. **place `<shopper-cart>` element somewhere on your page**

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

1. **list products for sale**

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

## 📡 connect shopper to your real shopify store

- **replace your `<shopper-config>`**  
    use the example below, but replace `shopify-domain` and `shopify-storefront-access-token` with your own values

    ```html
    <shopper-config
      base-currency="cad"
      currencies="cad,usd,gbp,eur"
      shopify-domain="dev-bakery.myshopify.com"
      shopify-storefront-access-token="5f636be6b04aeb2a7b96fe9306386f25"
    ></shopper-config>
    ```

- **obtain your `shopify-domain` and `shopify-storefront-access-token`**
    - login to your shopify store's admin area
    - copy your `shopify-domain` from your browser address bar's url
    - create a new private app (a connection point for your website)
        1. click on the "apps" section on the left sidebar
        2. click the sneaky "Manage private apps" link
        3. check on the agreements and stuff to enable private apps
        4. click "Create new private app"
        5. enter the app name, and developer email
        6. skip the whole "Admin API" section
        7. enable "Storefront API" and check on all "Read" permissions
        8. save your app
    - copy your app's "Storefront access token" (NOT TO BE CONFUSED with the "API Token") and use this as your `shopify-storefront-access-token`

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

## 👩‍🔧 under the hood

- published as an npm package `shopper`
- written in typescript
- es modules
- universally-compatible web components
- only makes network requests to shopify, and to exchangeratesapi.io to fetch exchange rates
- saves cart data to `localStorage` to keep track of your cart between page loads
- if you want to support some older browsers, you can improve compatibility by adding these scripts above the others
    ```html
    <script async defer src="https://unpkg.com/sorry-not-sorry"></script>
    <script defer src="https://unpkg.com/whatwg-fetch@3.5.0/dist/fetch.umd.js"></script>
    <script defer src="https://unpkg.com/@webcomponents/webcomponentsjs@2.5.0/webcomponents-bundle.js"></script>
    ```

## ⚠️ known deficiencies, limitations, problems, and priorities

- there are aspects of shopper that are very well thought-out — but it's not all that way — some of it was purpose-built rather quickly. i'm open to sweeping refactors, let's chat about it
- there's no way to disable the currency conversion system
- we're missing many fine-grained customizable details, for example, the maximum allowable quantity for items in the cart is hardcoded to 10 — but this should be a simple customizable attribute
- there are annoying bugs for *some* mobile users with setting quantities in the cart
- we should make some example css themes that look good so people don't have to customize the css
- we should probably finish the optimized rollup bundle and recommend its usage in this readme
- we should install a localstorage cache mechanism for the currency exchange rates

## 💖 made with open source love by chase moskal

- please file issues and collaborate 🍻
- join the [discord chat!](https://discord.gg/vFFDqHT2AB)
