import { CartItem, ShopperState, ShopperActions, ShopperGetters } from "../interfaces";
export declare function prepareActions({ state, update, getters, checkout, defaultQuantityMax, }: {
    update: () => void;
    state: ShopperState;
    getters: ShopperGetters;
    defaultQuantityMax: number;
    checkout: (items: CartItem[]) => Promise<string>;
}): ShopperActions;
