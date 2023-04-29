var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _QuantityInput_value, _QuantityInput_roundStep, _QuantityInput_validateProperties, _QuantityInput_cap, _QuantityInput_fireQuantityChange, _QuantityInput_textAsInteger, _QuantityInput_handleInputChange;
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import styles from "./quantity-input.css.js";
import { QuantityChangeEvent } from "./events/quantity-change-event.js";
class QuantityInput extends LitElement {
    constructor() {
        super(...arguments);
        this.step = 1;
        this.min = 1;
        this.max = 25;
        _QuantityInput_value.set(this, this.min);
        _QuantityInput_roundStep.set(this, (n, step, up) => {
            return up
                ? n + (step - (n % step))
                : n - (n % step);
        });
        _QuantityInput_validateProperties.set(this, () => {
            const warn = (message) => {
                console.warn(`<${QuantityInput.tag}>: ${message}`);
            };
            const mustBeInteger = (n, label) => {
                if (n % 1 !== 0) {
                    const int = Math.floor(n);
                    warn(`${label}=${n} must be integer (using ${label}=${int})`);
                    n = int;
                }
                return n;
            };
            this.step = mustBeInteger(this.step, "step");
            this.min = mustBeInteger(this.min, "min");
            this.max = mustBeInteger(this.max, "max");
            __classPrivateFieldSet(this, _QuantityInput_value, mustBeInteger(__classPrivateFieldGet(this, _QuantityInput_value, "f"), "value"), "f");
            if (this.step < 1) {
                warn(`step=${this.step} must be at least 1 (using step=1)`);
                this.step = 1;
            }
            const value = __classPrivateFieldGet(this, _QuantityInput_value, "f");
            const { step, min, max } = this;
            const up = true;
            const down = false;
            const lockstep = (n, label, up) => {
                if (n % step !== 0) {
                    const newValue = __classPrivateFieldGet(this, _QuantityInput_roundStep, "f").call(this, n, step, up);
                    warn(`${label}=${n} not allowed with step=${step} `
                        + `(using ${label}=${newValue})`);
                    n = newValue;
                }
                return n;
            };
            this.min = lockstep(min, "min", up);
            this.max = lockstep(max, "max", down);
            __classPrivateFieldSet(this, _QuantityInput_value, lockstep(value, "value", down), "f");
            if (this.max < this.min) {
                this.max = this.min + step;
                warn(`max=${max} cannot be less than min=${min} `
                    + `(using max=${this.max})`);
            }
            this.value = __classPrivateFieldGet(this, _QuantityInput_value, "f");
        });
        _QuantityInput_cap.set(this, (value) => {
            value = __classPrivateFieldGet(this, _QuantityInput_roundStep, "f").call(this, value, this.step, false);
            value = value >= this.max ? this.max : value;
            value = value <= this.min ? this.min : value;
            return value;
        });
        _QuantityInput_fireQuantityChange.set(this, () => {
            this.dispatchEvent(new QuantityInput.QuantityChangeEvent(__classPrivateFieldGet(this, _QuantityInput_value, "f")));
        });
        this.increment = () => {
            this.value = this.value + this.step;
            __classPrivateFieldGet(this, _QuantityInput_fireQuantityChange, "f").call(this);
        };
        this.decrement = () => {
            this.value = this.value - this.step;
            __classPrivateFieldGet(this, _QuantityInput_fireQuantityChange, "f").call(this);
        };
        _QuantityInput_textAsInteger.set(this, (text) => {
            return /^[\d]+$/.test(text)
                ? parseInt(text)
                : false;
        });
        _QuantityInput_handleInputChange.set(this, () => {
            const originalValue = __classPrivateFieldGet(this, _QuantityInput_value, "f");
            const input = this.shadowRoot.querySelector("#textinput");
            const { value: text } = input;
            const converted = __classPrivateFieldGet(this, _QuantityInput_textAsInteger, "f").call(this, text);
            const newValue = converted === false
                ? originalValue
                : __classPrivateFieldGet(this, _QuantityInput_cap, "f").call(this, converted);
            if (newValue.toString() !== text)
                input.value = newValue.toString();
            if (newValue !== originalValue) {
                __classPrivateFieldSet(this, _QuantityInput_value, newValue, "f");
                __classPrivateFieldGet(this, _QuantityInput_fireQuantityChange, "f").call(this);
            }
        });
    }
    set value(value) {
        const oldValue = __classPrivateFieldGet(this, _QuantityInput_value, "f");
        __classPrivateFieldSet(this, _QuantityInput_value, __classPrivateFieldGet(this, _QuantityInput_cap, "f").call(this, value), "f");
        this.requestUpdate("value", oldValue);
    }
    get value() {
        return __classPrivateFieldGet(this, _QuantityInput_value, "f");
    }
    firstUpdated() {
        __classPrivateFieldGet(this, _QuantityInput_validateProperties, "f").call(this);
        if (this.onquantitychange)
            this.addEventListener(QuantityInput.QuantityChangeEvent.event, this.onquantitychange);
    }
    render() {
        return html `
			<input
				id=textinput
				type=text
				inputmode=numeric
				.value=${__classPrivateFieldGet(this, _QuantityInput_value, "f").toString()}
				min=${this.min}
				max=${this.max}
				step=${this.step}
				@change=${__classPrivateFieldGet(this, _QuantityInput_handleInputChange, "f")}
				/>

			<div id=buttons>
				<button
					part=button
					@click=${this.increment}>
						△
				</button>
				
				<button
					part=button
					@click=${this.decrement}>
						▽
				</button>
			</div>
		`;
    }
}
_QuantityInput_value = new WeakMap(), _QuantityInput_roundStep = new WeakMap(), _QuantityInput_validateProperties = new WeakMap(), _QuantityInput_cap = new WeakMap(), _QuantityInput_fireQuantityChange = new WeakMap(), _QuantityInput_textAsInteger = new WeakMap(), _QuantityInput_handleInputChange = new WeakMap();
QuantityInput.tag = "quantity-input";
QuantityInput.QuantityChangeEvent = QuantityChangeEvent;
QuantityInput.styles = styles;
__decorate([
    property({ type: Number, reflect: true })
], QuantityInput.prototype, "step", void 0);
__decorate([
    property({ type: Number, reflect: true })
], QuantityInput.prototype, "min", void 0);
__decorate([
    property({ type: Number, reflect: true })
], QuantityInput.prototype, "max", void 0);
__decorate([
    property({ type: Number, reflect: true })
], QuantityInput.prototype, "value", null);
export { QuantityInput };
//# sourceMappingURL=quantity-input.js.map