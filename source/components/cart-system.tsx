
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {observable, action, autorun} from "mobx"

import CartStore from "./cart-store"
import CartButton, {CartButtonStore} from "./cart-button"
import CartManipulator, {CartManipulatorStore} from "./cart-manipulator"

export class CartSystemStore {
	@observable cartStore: CartStore
	@observable cartButtonStore: CartButtonStore
	@observable cartManipulatorStore: CartManipulatorStore
	@observable isPanelOpen: boolean

	@action togglePanel() {
		this.isPanelOpen = !this.isPanelOpen
	}

	constructor({cartStore = new CartStore()}: {cartStore?: CartStore} = {}) {
		this.cartStore = cartStore
		this.cartButtonStore = new CartButtonStore()
		this.cartManipulatorStore = new CartManipulatorStore({cartStore})
		this.isPanelOpen = false

		// keep length up to date
		autorun(() => {
			const length = [...this.cartStore.cartItems].length
			this.cartButtonStore.setNumberOfCartItems(length)
		})
	}
}

@observer
export default class CartSystem extends Component<{store: CartSystemStore}, any> {

	private readonly handleCartButtonClick = (event: MouseEvent) => this.props.store.togglePanel()

	render() {
		const {store} = this.props
		return (
			<div className="cart-system">
				<CartButton store={store.cartButtonStore} onClick={this.handleCartButtonClick}/>
				<div className="cart-panel" data-open={store.isPanelOpen ? "true" : "false"}>
					<CartManipulator store={store.cartManipulatorStore}/>
					<a className="cart-checkout">Checkout</a>
				</div>
			</div>
		)
	}
}
