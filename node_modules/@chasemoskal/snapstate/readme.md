
<br/>

# 🔮 snapstate

*tiny robust state management*

📦 **`npm install @chasemoskal/snapstate`**

👁️ watch for changes to properties  
🕵️ track only the properties you are reading, automatically  
♻️ keeps you safe from circular updates  
⛹️ updates are debounced, avoiding duplicate updates  
🌳 carve large state trees into substates  
🧬 implemented with recursive es proxies  
🔬 typescript-native types, es modules  
💖 free and open source, just for you  

snapstate is designed to be a modern replacement for mobx. mobx was amazing, but has grown comically large at like 50 KB. mobx is also *global,* among other complications that we don't prefer.

snapstate is 1.5 KB, minified and gzipped.

<br/>

## 🕵️ tracking changes to properties

- first, let's create some state.
  ```js
  import {snapstate} from "@chasemoskal/snapstate"

  const snap = snapstate({
    count: 0,
    coolmode: "enabled",
    also: {
      nesting: {
        isAllowed: true,
      },
    },
  })
  ```
- `snap.track` allows us to track changes to the state
  ```js
  snap.track(state => {
    console.log(state.count)
     //               ☝️
     // snapstate detects this property read,
     // and will run our track callback
     // whenever this property changes
  })
   // 0 —— runs once initially

  snap.state.count += 1
   // 1 —— automatically runs the relevant tracker functions

  snap.state.coolmode = "super"
   // *nothing happens*
   // our track callback doesn't care about this property :)
  ```
- if you prefer driving stick-shift, we can make a manual track and even avoid the initial run.
  ```js
  snap.track(

    // observer: listen specifically to "count"
    ({count}) => ({count}),

    // reaction: responding to changes
    ({count}) => console.log(`count changed: ${count}`),
  )

  snap.state.count += 1
   // 1
  ```
- of course, we can stop tracking things when we want.
  ```js
  const untrack = snap.track(({count}) => console.log(count))
   // 0

  snap.state.count += 1
   // 1

  untrack()
  snap.state.count += 1
   // *nothing happens*
  ```

<br/>

## 💾 control which parts of your app can write to state

this is a pillar of good state management.

if every part of our app can write to the state, all willy-nilly, it quickly becomes a convoluted mess that is hard to debug.

- `snap.readable` is just like `snap.state`, except that it's read-only.
  ```js
  const snap = snapstate({count: 0})

  snap.state.count += 1
   // this is allowed

  snap.readable.count += 1
   // SnapstateReadonlyError —— no way, bucko!
  ```
- we can pass the `readable` around to the parts of our application that should only have read-access to the state (like our components).
- but components will also need access to `track`, `subscribe`, and the rest of it —
- so snapstate has a handy `restricted` function, which makes a read-only version of a snapstate.
  ```js
  import {snapstate, restricted} from "@chasemoskal/snapstate"
  const snap = snapstate({count: 0})

  myFrontendComponents({
    snap: restricted(snap),
  })
  ```
- it's easy to formalize actions with snapstate.
  ```js
  const snap = snapstate({count: 0})

  // only our actions have write-access to state
  const actions = {
    increment() {
      snap.state.count += 1
    },
  }

  myFrontendComponents({

    // components only have read-only access to the state
    snap: restricted(snap),

    // components can call our formalized actions to change the state
    actions,
  })
  ```
- note: `snap.state` and `snap.writable` are aliases for each other.

<br/>

## 👁️ subscribe to *any* change in the whole state tree

- subscriptions will execute whenever any state is changed in the tree.
  ```js
  snap.subscribe(state => {
    console.log("something has changed")
  })
  ```
- of course you can unsubscribe, too.
  ```js
  const unsubscribe = snap.subscribe(state => {
    console.log("something has changed")
  })

  unsubscribe()
  ```

<br/>

## ✋ untrack and unsubscribe all

- delete all trackers
  ```js
  snap.untrackAll()
  ```
- delete all subscriptions
  ```js
  snap.unsubscribeAll()
  ```

<br/>

## ⛹️ debouncing and waiting

- tracking and subscription callbacks are debounced.  
  this prevents consecutive changes from firing more callbacks than necessary.
  ```js
  const snap = snapstate({count: 0})
  snap.track(({count}) => console.log(count))
  snap.state.count += 1
  snap.state.count += 1
  snap.state.count += 1
   // 1 —— only runs once
  ```
- but be advised — this might mean you have to wait before seeing the effects of your callbacks
  ```js
  const snap = snapstate({count: 0})

  let called = false
  snap.subscribe(() => called = true)

  snap.state.count += 1
  console.log(called)
   // false —— *what the heck!?*

  await snap.wait()
   // true —— oh! i just had to wait, for the debouncer!
  ```

<br/>

## ♻️ circular-safety

- you are prevented from writing to state while reacting to it.
  ```js
  const snap = snapstate({count: 0})

  snap.track(state => {
    state.count += 1
     // SnapstateReadonlyError —— not a chance, buster!

     // "state" is actually "snap.readable" in this context,
     // (same with subscribe)
  })
  ```
- you might think you're clever, and could outsmart snapstate. *you'd be wrong!*
  ```js
  snap.track(({count}) => {
    // here's you being clever, thinking you can access the *outer* snap.state
    snap.state.count += 1
     // SnapstateCircularError —— dead in your tracks!
  })
  ```
- as we've established, you can't make circular references in `track` callbacks.
- you also can't make circles with track reactions.
  ```js
  snap.track(
    ({count}) => ({count}),
    () => {
      snap.state.count += 1
    },
  )
  snap.state.count += 1
  await snap.wait()
   // SnapstateCircularError —— thwarted again, buddy!
  ```
- and you can't make circles in subscriptions, either.
  ```js
  snap.subscribe(() => snap.state.count += 1)
  snap.state.count += 1
  await snap.wait()
   // SnapstateCircularError —— just give up
  ```
- you can catch these async errors on the `snap.wait()` promise.

<br/>

## ✂️ substate: carve your state into subsections

- it's awkward to pass your whole application state to every little part of your app.
- so you can snip off chunks, to pass along to the components that need it.
  ```js
  import {snapstate, substate} from "@chasemoskal/snapstate"

  const snap = snapstate({
    outerCount: 1,
    coolgroup: {
      innerCount: 2,
    }
  })

  const coolgroup = substate(snap, tree => tree.coolgroup)

  // note: coolgroup has no access to "outerCount"
  console.log(coolgroup.state.innerCount)
   // 2

  coolgroup.track(state => console.log(state.innerCount))
  coolgroup.state.innerCount += 1
  await coolgroup.wait()
   // 3
  ```
- a substate's `subscribe` function only listens to its subsection of the state.
- a substate's `untrackAll` function only applies to tracking called on the subsection.
- a substate's `unsubscribeAll` function only applies to subscriptions called on the subsection.
- substates can also be `restricted`.
  ```js
  const restrictedCoolgroup = restricted(coolgroup)
  restrictedCoolgroup.state.innerCount += 1
   // SnapstateReadonlyError
  ```

<br/>

## 👨‍⚖️ super-strict typescript readonly

- introducing `snap.readonly`. it's `snap.readable`'s strict and demanding mother-in-law.
- `readonly` literally *is* `readable`, but with more strict typescript typing.
- you see, typescript is *extremely strict* about its typescript "readonly" properties.  
  so much so, that it's very painful to use typescript "readonly" structures throughout your app.
- for this reason, snapstate provides `snap.readable` by default, which will throw errors only at runtime when you're being naughty attempting to write properties there — but the typescript compiler doesn't complain with `readable`.
- if your shirt is fully tucked-in, you can use `snap.readonly` to produce compile-time typescript errors.
- anywhere you find a `readable` (for example in track and subscribe callbacks), you could set its type to `Read<typeof readable>` to make typescript super strict about it.

<br/>

## 📜 beware of arrays, maps, and other fancy objects

- snapstate only tracks changes when properties are set on plain objects.
- what this means, is that methods like `array.push` aren't visible to snapstate.
  ```js
  const snap = snapstate({myArray: []})

  // bad -- updates will not respond.
  snap.state.myArray.push("hello")
  ```
- to update an array, we must wholly replace it:
  ```js
  // good -- updates will respond.
  snap.state.myArray = [...snap.state.myArray, "hello"]
  ```
- this also means that the properties on any class instances won't be tracked.
  ```js
  const snap = snapstate({
    date: new Date(), // properties within this aren't tracked
    myCoolObject: new MyCoolObject(), // properties within this aren't tracked
  })
  ```
- this is an entirely survivable state of affairs, but we may eventually do the work to implement special handling for arrays, maps, sets, and other common objects. *(contributions welcome!)*

<br/>

## 🧬 using proxies in your state, if you must

- snapstate doesn't like proxies in the state, so it destroys them on-sight (by making object copies).
- this is to prevent circularity issues, since snapstate's readables are made of proxies.
- if you'd like to *specifically allow* a particular proxy, you can convince snapstate to allow it into the state tree, by having your proxy return `true` when `symbolToAllowProxyIntoState` is accessed.
- snapstate will check for this symbol whenever it ingests objects into the state.
- here's an example:
  ```js
  import {snapstate, symbolToAllowProxyIntoState} from "@chasemoskal/snapstate"

  const snap = snapstate({
    proxy: new Proxy({}, {
      get(t, property) {
        if (property === symbolToAllowProxyIntoState)
          return true
        else if (property === "hello")
          return "world!"
      },
    })
  })

  console.log(snap.state.proxy.hello)
   // "world!"
  ```

<br/>

## 💖 made with open source love

mit licensed.

please consider contributing by opening issues or pull requests.

&nbsp; // chase
