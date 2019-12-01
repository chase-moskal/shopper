
import {select} from "../toolbox/select.js"
import {ShopperCart} from "../components/shopper-cart.js"

export function wireCartToMenuDisplay({cartSelector}: {
	cartSelector: string
}) {
	try {
		const shopperCart = select<ShopperCart>(cartSelector)
		if (!shopperCart) return false
		shopperCart.onFirstAdd = () => {
			const parent: any = shopperCart.parentElement
			if (parent
				&& parent.tagName.toLowerCase() === "menu-display"
				&& !parent.open
				&& parent.toggle
			) {
				parent.toggle()
			}
		}
	}
	catch (error) {
		error.message = `failed to wire cart to menu-display: ${error.message}`
		console.error(error)
	}
}
