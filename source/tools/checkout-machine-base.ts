
import {CartItem} from "../stores/cart-item"

/**
 * CHECKOUT MACHINE ABSTRACT CLASS
 * - has a checkout method which takes items and returns a checkout url string
 */
export abstract class CheckoutMachineBase {
	abstract checkout(items: CartItem[]): Promise<string>
}
