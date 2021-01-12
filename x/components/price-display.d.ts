import { LitElement } from "lit-element";
import { Currencies } from "crnc/x/interfaces.js";
import { Reader } from "../toolbox/pubsub.js";
import { SetCurrency, PriceModelState } from "../interfaces.js";
export declare function preparePriceDisplay({ state, reader, currencies, setCurrency, }: {
    currencies: Currencies;
    state: PriceModelState;
    setCurrency: SetCurrency;
    reader: Reader<PriceModelState>;
}): typeof LitElement;
