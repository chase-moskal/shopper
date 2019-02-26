
import {h, render} from "preact"
import {MenuSystem, MenuAccountant} from "menutown"

import {createCartMenuAccount} from "./create-cart-menu-account"
import {CreateCartMenuAccountOptions} from "./routines-interfaces"

export async function renderCartMenuSystem({element, ...options}: {
	element: Element
} & CreateCartMenuAccountOptions) {
	const {cartMenuAccount} = await createCartMenuAccount(options)
	const menuAccountant = new MenuAccountant({accounts: [cartMenuAccount]})

	const ui = (
		<MenuSystem accountant={menuAccountant}></MenuSystem>
	)

	const newElement = render(ui, null, element)
	return {menuAccountant, newElement}
}
