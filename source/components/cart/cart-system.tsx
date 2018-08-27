
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {reaction, IReactionDisposer} from "mobx"

import {CartButton} from "./cart-button"
import {CartPanel} from "./panel/cart-panel"
import {PerformCheckout} from "./panel/panel-interfaces"
import {CartSystemProps} from "./cart-interfaces"

import {makeDefaultCartText} from "./make-default-cart-text"
import {makeDefaultScrollTracker} from "./make-default-scroll-tracker"

/**
 * Cart system component class
 * - is a section element
 * - takes as props a cart object, checkout machine, scroll tracker, etc
 * - contains CartButton and CartPanel components, mediates their relationship
 * - handles cart button click event to toggle cart panel open or closed
 * - handles cart system scroll tracking
 * - ultimately performs the checkout, using the cart panel checkout callback
 *   and checkout machine as tools
 * - takes a cart text object and distributes the text labels to child
 *   components
 */
@observer
export class CartSystem extends Component<CartSystemProps, any> {

	private disposers: IReactionDisposer[] = []

	private readonly scrollTracker = this.props.scrollTracker
		|| makeDefaultScrollTracker()

	private readonly cartText = this.props.cartText
		|| makeDefaultCartText()

	/**
	 * Mount
	 */
	componentWillMount() {
		const {cart} = this.props
		const {scrollTracker, disposers} = this

		// reaction when the cart panel opens or closes, to set scroll tracking
		disposers.push(reaction(() => cart.panelOpen, panelOpen => {
			scrollTracker.setTracking(!panelOpen)
		}))

		// set scroll tracker initial state
		scrollTracker.setTracking(!cart.panelOpen)

		// mount the scroll tracker
		scrollTracker.mount()
	}

	/**
	 * Unmount
	 */
	componentWillUnmount() {
		const {scrollTracker, disposers} = this

		// shutdown scroll tracker
		scrollTracker.unmount()

		// dispose all disposers
		for (const dispose of disposers) dispose()
		this.disposers = []
	}

	/**
	 * Perform checkout function
	 * - call the checkout machine to obtain checkout url
	 * - open the checkout url in a new window or same window
	 */
	private readonly performCheckout: PerformCheckout = async(): Promise<string> => {
		const {cart, checkoutMachine, checkoutInNewWindow} = this.props

		const checkoutLocation: Location = checkoutInNewWindow
			? window.open("", "_blank").location
			: window.location

		const checkoutUrl = await checkoutMachine.checkout(cart.activeItems)
		cart.clear()
		cart.togglePanelOpen(false)
		checkoutLocation.href = checkoutUrl

		return checkoutUrl
	}

	/**
	 * Handle cart button click
	 * - toggle the cart panel open or closed
	 */
	private readonly handleCartButtonClick = () => this.props.cart.togglePanelOpen()

	/**
	 * Render
	 * - section element with scroll tracking
	 * - contains cart button and cart panel
	 */
	render() {
		const {
			performCheckout,
			handleCartButtonClick: onClick,
			cartText,
			scrollTracker
		} = this
		const {cart} = this.props
		const {cartButtonText, cartPanelText} = cartText
		return (
			<section
				className="cart-system"
				data-panel-open={cart.panelOpen ? "true" : "false"}
				data-items-in-cart={cart.activeItems.length}
				style={{top: scrollTracker.scroll}}>
					<CartButton {...{cart, onClick, cartButtonText}}/>
					<CartPanel {...{cart, performCheckout, cartPanelText}}/>
			</section>
		)
	}
}
