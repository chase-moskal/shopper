
import * as mobx from "mobx"
import * as preact from "preact"
import * as mobxPreact from "mobx-preact"

import {default as CartStore} from "./components/cart-store"
import {default as CartButton, CartButtonStore} from "./components/cart-button"
import {default as CartSystem, CartSystemStore} from "./components/cart-system"
import {default as CartList, CartManipulatorStore} from "./components/cart-manipulator"

window["mobx"] = mobx
window["preact"] = preact
window["mobxPreact"] = mobxPreact

window["shopperman"] = {
	CartStore,
	CartButton,
	CartButtonStore,
	CartList,
	CartManipulatorStore,
	CartSystem,
	CartSystemStore
}
