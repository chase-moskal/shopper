
import {CartText} from "./cart-interfaces"

export const makeDefaultCartText = (): CartText => ({
	cartButtonText: {
		open: {
			title: "Close the cart",
		},
		closed: {
			title: "Open the cart"
		}
	},
	cartPanelText: {
		heading: "Shopping cart",
		cartItemText: {
			remove: {
				title: "Remove cart item",
			}
		},
		cartCalculatedText: {
			subtotal: {
				content: "Subtotal (approximate)"
			}
		},
		cartCheckoutText: {
			title: "Buy cart items",
			content: "Checkout"
		}
	}
})
