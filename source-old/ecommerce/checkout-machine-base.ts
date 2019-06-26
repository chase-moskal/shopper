
import {CartItemStore} from "../stores/cart-item-store"

/**
 * CHECKOUT MACHINE ABSTRACT CLASS
 * - has a checkout method which takes items and returns a checkout url string
 */
export abstract class CheckoutMachineBase {
	abstract checkout(items: CartItemStore[]): Promise<string>
}
