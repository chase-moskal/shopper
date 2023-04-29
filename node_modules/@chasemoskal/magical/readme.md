
🪄 magical
==========

*web toolkit for [lit](https://lit.dev/) apps*

🕹️ [**live demo — magical.chasemoskal.com**](https://magical.chasemoskal.com/)  
📦 `npm install @chasemoskal/magical`  
💖 *made with open source love*  

magical is a collection of tools we build, maintain, and use every day to make great [lit](https://lit.dev/) applications.

<br/>

## 🤖 magic `element`

every magic element is also a lit element.

but magic elements have a `realize` method instead of a *render* method.

in your `realize` method, use `this.use`, to get access to a "hooks" interface for state management.

```ts
import {MagicElement, mixinCss, UseElement} from "@chasemoskal/magical"

import {html} from "lit"
import {property} from "lit/decorators.js"
import stylesCss from "./styles.css.js"

@mixinCss(stylesCss)
export class CounterElement extends MagicElement {

  @property({type: Number})
  start = 0

  realize() {
    const {use} = this
    const [count, setCount] = use.state(this.start)
    const increment = () => setCount(x => x + 1)

    use.setup(() => {
      const listener = () => console.log("resized")
      window.addEventListener("resize", listener)
      return () => window.removeEventListener("resize", listener)
    })

    return html`
      <div>
        <p>count ${count}</p>
        <button @click=${increment}>increment</button>
      </div>
    `
  }
}
```

there are some things to know about:
- you should never access `use` outside of `realize`
- like any hooks interface, your `use` calls must be in the same order every time
  - so don't put `use.state` or `use.setup` calls inside a for loop or in a callback function or anything like that
  - best practice is to keep use calls at the top-level
- `use.state` returns an array with four things:
  - the current value
  - the setter function
    - you can pass it a new value
    - or a function that takes the previous value and returns a new value
  - the getter function
    - the getter is useful getting the latest version of state in a callback
  - the previous value
    - you could compare current===previous to see if the value has changed
- `use.setup`
  - use this to run a setup routine every time the component connects to the dom
  - the setup function you provide should return a function that tears down and cleans up any mess, called when the component disconnects from the dom

<br/>

## ✨ magic `view`

views have the same `use` hook interface, but views are not components or elements.

they're *lit directives.*

but like elements, views too can have a shadow dom, and their own css styles.

```ts
import {view} from "@chasemoskal/magical"

import {html} from "lit"
import stylesCss from "./styles.css.js"

export const CounterView = view({
    shadow: true,
    styles: stylesCss,
  }).render(use => (start: number) => {

  const [count, setCount] = use.state(start)
  const increment = () => setCount(x => x + 1)

  return html`
    <div>
      <p>count ${count}</p>
      <button @click=${increment}>increment</button>
    </div>
  `
})
```

the important thing to understand, is how they are used:
- views are used like this:
    ```ts
    // 🧐
    return html`
      <div>
        ${CounterView(2)}
      </div>
    `
    ```
    - this is great, because CounterView is fully typescript-typed
    - and it's directly imported, so it's easy to trace where views are being used (vscode find all references)
    - typescript will sniff out and complain about places you need to change when you update those parameters
- whereas using an element would be like this:
    ```ts
    // 🤮
    return html`
      <div>
        <counter-element start=2></counter-element>
      </div>
    `
    ```
    - this is OK for an html-only interface, but for real app development?
    - this sucks, no typescript typing
    - no imports, no vscode find all references
    - have to worry about dom registrations
    - views solve all of this

compared against elements:
- views are typescript functions, so their parameters are fully typed, vscode auto-refactoring works
- views are less cumbersome, because they don't need to be registered to the dom

compared against simple render functions:
- views have state
- views are independent rendering contexts
- views can have shadow dom and their own stylesheets

i think a good way to think about elements and views is like this:
- elements are entrypoints at the html-level
- most of our app features are implemented as views
- our views are comprised of simple render functions

<br/>

## 📻 magic `event`

we have this handy helper for making custom dom events.

```js
import {MagicEvent} from "@chasemoskal/magical"

export class ProfileChanged extends
  MagicEvent<{count: number}>("profile_changed") {}

// dispatch the event
MyCoolEvent
  .target(window)
  .dispatch({count: 1})

// listen for the event
const unlisten = MyCoolEvent
  .target(window)
  .listen(event => {
    console.log("profile changed", event.detail.count)
  })
```

<br/>

## 🐫 camel `css`

we wanted sass-like css nesting, but in our web components.

so we built a parser and compiler for a new css language.

it can run serverside, as part of a build script, or our preferred method — live on the clientside, compiling stylesheets for our elements and views.

camel css can be a drop-in replacement for lit's css tagged-template function:

```js
import {css} from "@chasemoskal/magical"

const styles = css`
div {
  p { color: red; }
}
`
```

camel-css uses `^` instead of sass's `&`

<br/>

## 🪄 more magical tools

### ⚙️ `registerElements` and `themeElements`

for the love of god, if you're writing a web components library, do not call `customElements.define` in those component modules.

be polite, and allow us the opportunity to augment your elements, rename them, apply a css theme, and then we can register our augmented elements.

so, when we're making a library, we like to have a function like `getElements` that returns all the library's elements classes.

then it's easy for anybody to apply a css theme and register the elements:

```js
import {registerElements, themeElements} from "@chasemoskal/magical"

registerElements(
  themeElements(
    themeCss,
    getElements(),
  )
)
```

- registerElements will automatically take `CamelCaseComponent` names and convert them into `camel-case-component` names

### 🎨 `mixins` for your lit elements

*TODO documentation for these*

- `mixinCss`
- `mixinLightDom`
- `mixinRefreshInterval`
- `mixinContextRequired`

### 🏀 `debounce`

i've made like ten versions of this, and i think this is my masterpiece. it even has unit tests.

```js
import {debounce} from "@chasemoskal/magical"

const action = () => console.log("action!")
const debouncedAction = debounce(1000, action)
// debouncedAction is a promise that resolves
// after the 1000 millseconds of no activity

debouncedAction()
debouncedAction()
await debouncedAction()
//> "action!"
// the action only fires once
```

this debouncer
- typescript
- works with functions or async functions
- returns promises
- the promises resolve with the actual value

<br/>
<br/>

------

&nbsp; &nbsp; 💖 *made with open source love*
