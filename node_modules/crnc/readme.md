
<br/>

# ⁓ ***crnc*** ⁓

*currency conversions and formatting library for the web.*  

💰 display prices to users on your websites  
🌎 ui for users to switch their preferred viewing currency  
🔌 easy html install (universal web components)  
⏬ exchange rates are downloaded from the [bank of canada](https://www.bankofcanada.ca/valet/docs)  
🧬 if you don't need the ui, just use the core functions directly  
🛒 used by [shopper](https://github.com/chase-moskal/shopper#readme) for displaying store prices  
💖 free and open source, just for you  

<br/>

### 🚀 [**see the crnc live demo**](https://crnc.chasemoskal.com/)  

🕹️ [also the codepen html example](https://codepen.io/ChaseMoskal/pen/YzYmKLv)  

![crnc example](./crnc-example.webp)

<br/>
<br/>

## 💡 `<crnc-price>` html component

using crnc is easy.  
just sprinkle the `<crnc-price>` element in your html, wherever you need to display a price.  

```html
<!-- a basic example -->
<crnc-price value="9.99"></crnc-price>

<!-- put it wherever you want -->
<div>
  <p>My Cool Product!</p>
  <crnc-price value="1234.56"></crnc-price>
</div>

<!-- here's a price that's on sale! -->
<crnc-price value="9.99" comparison="15.99"></crnc-price>
```

### parameters for the `<crnc-price>` component

- **`value="1234.56"`** *number*  
  the amount of money, in your *base-currency*, for this price.  
  ```html
  <crnc-price value="1234.56"></crnc-price>
  ```

- **`currency="eur"`** ***(optional)*** *currency code string*  
  override the user's currency preference, and demand that this price be shown in the specific currency.  
  however, if the currency is not available (maybe the exchange rates download failed), the *base-currency* will be used instead.  
  ***don't be confused here:*** this is not specifying the currency of the input `value` — instead, this specifies what currency *the user should see.*  
  ```html
  <crnc-price value="1234.56" currency="eur"></crnc-price>
  ```

- **`precision="2"`** ***(optional)*** *number*  
  specify how many decimal digits to display.  
  if set to `0`, it will round the price to the nearest whole number.  
  defaults to `2`.  
  ```html
  <crnc-price value="1234.56" precision="0"></crnc-price>
  ```

- **`comparison="1358.016"`** ***(optional)*** *number*  
  put something on sale!  
  when you provide `comparison`, it represents the "regular" price, and `value` then represents the current sale price.  
  the sale percentage is calculated automatically,  
  something like *( $1234.56 — ~~1358.02~~ — 10% off )* is displayed to the user  
  ```html
  <crnc-price value="1234.56" comparison="1358.016"></crnc-price>
  ```

- **`right`** ***(optional)*** *boolean*  
  sets the currency menu to the right side.  
  this is better for prices that are on the right side of the viewport,  
  to avoid the menu from clipping out of the viewport.  
  ```html
  <crnc-price value="1234.56" right></crnc-price>
  ```

<br/>
<br/>

## ⚡ quick html install

1. paste this html code into your page's `<head>`
    ```html
    <script type=importmap-shim>
      {"imports": {
        "crnc/":"https://unpkg.com/crnc@0.0/",
        "crnc":"https://unpkg.com/crnc@0.0/x/crnc.js"
      }}
    </script>
    <script type=importmap-shim src="https://unpkg.com/crnc@0.0/x/importmap-cloud.json"></script>
    <script defer type=module-shim>
      import "crnc/x/html-install.js"
    </script>

    <script defer src="https://unpkg.com/es-module-shims@1.5/dist/es-module-shims.js"></script>
    ```

    note: this installation technique uses [es-module-shims](https://github.com/guybedford/es-module-shims), and if you're using multiple plugins that use es-module-shims, just don't repeat the last line (only one script for es-module-shims per page).

1. paste this configuration snippet into your page's `<head>`
    ```html
    <crnc-config
      base-currency="usd"
      currencies="cad aud eur gbp jpy"
    ></crnc-config>
    ```
    you can change these values.
    - `base-currency` is the currency that your store users for all its pricing.
    - `currencies` are the other currencies you want to allow conversions for.

1. use the `<crnc-price>` element anywhere in your page's `<body>`
    ```html
    <crnc-price value="1234.56"></crnc-price>
    ```
    - if you're canadian, you may see a result like `$1,579.87 CAD*`

<br/>
<br/>

## 📦 `npm install crnc`

for these techniques, you'll need some experience with web development tools like npm.

### simple local installation with npm:

1. `npm install crnc`
1. in your main javascript, import the crnc html installer
    ```js
    import "crnc/x/html-install.js"
    ```
1. add a crnc config element to your page's `<head>`
    ```html
    <crnc-config
      base-currency="usd"
      currencies="cad aud eur gbp jpy"
    ></crnc-config>
    ```
1. go wild using `<crnc-price>` components throughout your app.
    ```html
    <crnc-price value="1234.56"></crnc-price>
    ```

### custom integration:
1. `npm install crnc`
1. in your main javascript, you can setup crnc manually
    ```js
    import * as crnc from "crnc"

    // currency converter downloads rates, persists currency preference,
    // and of course, converts and formats money.
    const currencyConverter = crnc.makeCurrencyConverter({
      baseCurrency: "usd",
      currencies: "cad eur gbp aud jpy",
    })

    // this is an object of web components.
    const components = crnc.prepareComponents({currencyConverter})

    // you are responsible to register the components to the dom
    // yourself.
    // this gives you the ability to rename components,
    // or extend them however you need.
    crnc.registerComponents(components)
    ```
1. go wild using `<crnc-price>` components throughout your app.
- note: there is no need for a `<crnc-config>` element in this kind of installation.

<br/>
<br/>

## 🏦 available currencies

- all currency codes are in [iso 4217 format](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
- the rates from bank of canada only support the [currencies listed here](./s/currency-tools/bank-of-canada/supported-currencies.ts)
- crnc only supports the currencies [listed here](./s/ecommerce/currency-library.ts) *— ✍️ help add to this!*
- crnc relates user locales to preferred currencies in [this mapping](./s/ecommerce/currency-library.ts) *— ✍️ help add to this!*

<br/>
<br/>

## 💱 currency converter javascript usage

- we use the currency converter to convert and format prices according to the user's locale and currency preference.
- the currency converter assumes you're running an ecommerce situation where all your prices are share a single `baseCurrency`.
- exchange rates are downloaded onto the clientside, and cached, to avoid spamming the bank of canada's api.
- when the user's currency preference is changed, it's persisted into localstorage, and propagates across opened browser tabs.
- if the exchange rates download fails, the currency converter will continue to work, falling back to showing prices in the base currency.
- while the exchange rates are downloading, the converter will display prices in the base currency.

### currency converter usage examples

- create a currency converter
  ```js
  import {makeCurrencyConverter} from "crnc"

  const currencyConverter = makeCurrencyConverter({

    // all values you run through this converter must be in this currency
    baseCurrency: "USD",

    // other currencies you desire (base currency is already assumed)
    currencies: ["CAD", "AUD", "EUR", "GBP", "JPY"],
  })

  // you can wait for the exchange rates to finish downloading.
  // but if you don't, all prices will be displayed in the base currency,
  // until the download is complete.
  await currencyConverter.exchangeRatesDownload
  ```

- display money in the user's preferred currency (initially auto-detected based on locale)
  ```js
  const money = currencyConverter.display(1234.56)
  money.value  // 1571.42
  money.amount // "1,571.42"
  money.price  // "$1,571.42 CAD"
  money.currency.code   // "CAD"
  money.currency.name   // "Canadian Dollar"
  money.currency.symbol // "$"
  ```

- change the currency preference
  ```js
  currencyConverter.setCurrencyPreference("EUR")

  const euros = currencyConverter.display(1234.56)
  euros.value  // 1152.97
  euros.amount // "1,152.97"
  euros.price  // "$1,152.97 EUR"
  euros.currency.code   // "EUR"
  euros.currency.name   // "Euro"
  euros.currency.symbol // "$"
  ```

- display money in a specific currency, ignoring the currency preference
  ```js
  const pounds = currencyConverter.display("1234.56", {currency: "GBP"})
  pounds.value  // 968.90
  pounds.amount // "968.90"
  pounds.price  // "£968.90 GBP"
  pounds.currency.code   // "GBP"
  pounds.currency.name   // "British Pound Sterling"
  pounds.currency.symbol // "£"
  ```

- display money in the base currency (always works)
  ```js
  const dollars = currencyConverter.display(
    1234.56,
    {currency: currencyConverter.baseCurrency},
  )
  dollars.value  // 1234.56
  dollars.amount // "1,234.56"
  dollars.price  // "$1,234.56 USD"
  dollars.currency.code   // "USD"
  dollars.currency.name   // "United States Dollar"
  dollars.currency.symbol // "$"
  ```

- display money with a specific precision
  ```js
  const dollars = currencyConverter.display(
    1234.56,
    {precision: 0},
  )
  dollars.price // "£969 GBP"
  ```

- check what is the current currency preference
  ```js
  currencyConverter.currencyPreference
    // {
    //   code: "CAD",
    //   name: "Canadian Dollar",
    //   symbol: "$",
    // }
  ```

- check what currency is targeted for conversions, despite the currency preference.  
  the currency preference may not be available, in which case the base currency will be targeted.
  ```js
  currencyConverter.targetCurrency
    // {
    //   code: "USD",
    //   name: "United States Dollar",
    //   symbol: "$",
    // }
  ```

- check what currencies are currently available
  ```js
  currencyConverter.availableCurrencies
    // {
    //   USD: {
    //     code: "USD",
    //     name: "United States Dollar",
    //     symbol: "$",
    //   },
    //   CAD: {
    //     code: "CAD",
    //     name: "Canadian Dollar",
    //     symbol: "$",
    //   },
    // }
  ```

- listen for changes (see more options in the [snapstate docs](https://github.com/chase-moskal/snapstate#readme))
  ```js
  currencyConverter.snap.subscribe(() => {
    currencyPreference // "JPY"
    availableCurrencies // {USD: {...}, CAD: {...}}
  })
  ```

### currency converter parameters

- **`baseCurrency`** *string*  
  the native currency used by your ecommerce store. using the currency converter, you will *input* all money numbers in this base currency.

- **`currencies`** ***(optional)*** *array of strings*  
  the array of currencies you want available for conversions. only these currencies will be requested for, when downloading exchange rates.  
  *(default: string containing only the base currency, no rates are downloaded in this case)*

- **`locale`** ***(optional)*** *string*  
  the locale string for formatting numbers, and also for guessing the currency preference. *(default: auto-detected from browser)*

- **`downloadExchangeRates`** ***(optional)*** *async function*  
  async function for fetching exchange rates. *(default: downloads from the bank of canada api)*

- **`listenForStorageChanges`** ***(optional)*** *function*  
  function that instructs the currency converter when it should reload the currency preference from storage, for example, when another tab fires a storage event, so when the user changes the preference, it affects multiple tabs. *(default: adds a storage event listener to the window)*

- **`persistence`** ***(optional)*** *ConverterPersistence object*  
  details about where to cache exchange rates and store the currency preference. *(default: shown below)*
  ```js
  persistence: {

    // which storage object to use
    storage: window.localStorage,

    // number of milliseconds cached exchange rates should remain valid
    cacheLifespan: 1000 * 60 * 60,

    storageKeys: {

      // storage key used to caching exchange rates
      exchangeRatesCache: "crnc-exchange-rates-cache",

      // storage key used to store currency preference
      currencyPreference: "crnc-currency-preference",
    },
  },
  ```

### currency converter properties and functions

- **`currencyConverter.exchangeRatesDownload`** *promise*  
  you can `await` this promise, if you want to wait for the exchange rates to finish downloading.  
  you might not want to though, because the converter can operate, and display prices to users, while the rates are still downloading. when the rates are finished loading, they'll gain access to the additional currencies.

- **`currencyConverter.baseCurrency`** *string*  
  this is the same base currency you set as a parameter.

- **`currencyConverter.currencyPreference`** *string*  
  the currently set preferred currency with which to display prices to the user.  
  however, it may not yet be available, because the exchange rates could still be downloading, or failed.

- **`currencyConverter.targetCurrency`** *string*  
  the currency that will actually be used for displaying prices to the user.  
  it might not be equal to the *currencyPreference,* when exchange rates for it aren't loaded, in which case it'll fall back onto the *baseCurrency.*

- **`currencyConverter.availableCurrencies`** *CurrencyLibrary object*  
  an object containing details about all the currently available currencies.  
  before exchange rates have loaded, this will only contain information about the *baseCurrency.*

- **`currencyConverter.setCurrencyPreference( currency )`** *function*  
  use this function to set the *currencyPreference.*  
  this will also persist the preference in the storage mechanism you setup with the *persistence* parameter.  
  *currency* is a *string* currency code.

- **`currencyConverter.display( valueInBaseCurrency, options )`** *function*  
  convert and format a monetary value, for presentation to the user.  
  - parameters:
    - `valueInBaseCurrency` *number*  
      the value to present to the user. like `1234.56` for $1,234.56.
    - `options` ***(optional)*** *ConverterDisplayParams object*
      - `currency` ***(optional)*** *string*  
        specify a currency to override the *targetCurrency.*  
        ***don't be confused here:*** this is not specifying the currency of the input value — instead, this specifies the requested *output* currency.  
      - `precision` ***(optional)*** *integer number*  
        force a specific amount of precision to display the number.  
        eg, `3` gives you "$1,234.560",  
        eg, `0` gives you "$1,235",  
        defaults to `2`.
  - returns: *Money object*
    - `value` *number*  
      the amount of money, as a javascript number. like `1234.56`
    - `amount` *string*  
      the amount of money, as a human-friendly string. like `"1,234.56"`
    - `price` *string*  
      "the works" string, like `"$1,234.56 USD"`
    - `currency` *CurrencyDetails object*
      - `code` *string*  
        currency code, like "USD".
      - `name` *string*  
        full name of the currency, like "United States Dollar".
      - `symbol` *string*
        currency symbol, like "$".

<br/>
<br/>

## 🛠️ core functions for custom integrations

### currency tools

- [downloadExchangeRates](./s/currency-tools/download-exchange-rates.ts)  
  `import {downloadExchangeRates} from "crnc"`  
  downloads exchange rates from the [bank of canada's open api](https://www.bankofcanada.ca/valet/docs).  

- [convertCurrency](./s/currency-tools/convert-currency.ts)  
  `import {convertCurrency} from "crnc"`  
  exchange a money value from one currency to another.  

- [formatCurrency](./s/currency-tools/format-currency.ts)  
  `import {formatCurrency} from "crnc"`  
  express a money value as a human-friendly string.  
  (adds dollar signs and commas and stuff)  

- [convertAndFormatCurrency](./s/currency-tools/convert-and-format-currency.ts)  
  `import {convertAndFormatCurrency} from "crnc"`  
  exchange a money value, and format it, in one shot.  
  (simply a convenience function, combines convertCurrency and formatCurrency)  

### ecommerce helpers

- [assumeUserCurrency](./s/ecommerce/assume-user-currency.ts)  
  `import {assumeUserCurrency} from "crnc"`  
  assume what currency the user might want to see based on locale.  

<br/>
<br/>

## 💖 made with open source love, just for you

please consider contributing by submitting issues or pull requests.

email me if you'd like to chat.

&nbsp; 🍻 chase moskal
