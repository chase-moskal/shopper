var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _value, _roundStep, _validateProperties, _cap, _fireQuantityChange, _textAsInteger, _handleInputChange;
import styles from "./quantity-input.css.js";
import { LitElement, property, html } from "lit-element";
import { QuantityChangeEvent } from "./events/quantity-change-event.js";
export class QuantityInput extends LitElement {
    constructor() {
        super(...arguments);
        this.step = 1;
        this.min = 1;
        this.max = 25;
        _value.set(this, this.min);
        _roundStep.set(this, (n, step, up) => {
            return up
                ? n + (step - (n % step))
                : n - (n % step);
        });
        _validateProperties.set(this, () => {
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
            __classPrivateFieldSet(this, _value, mustBeInteger(__classPrivateFieldGet(this, _value), "value"));
            if (this.step < 1) {
                warn(`step=${this.step} must be at least 1 (using step=1)`);
                this.step = 1;
            }
            const value = __classPrivateFieldGet(this, _value);
            const { step, min, max } = this;
            const up = true;
            const down = false;
            const lockstep = (n, label, up) => {
                if (n % step !== 0) {
                    const newValue = __classPrivateFieldGet(this, _roundStep).call(this, n, step, up);
                    warn(`${label}=${n} not allowed with step=${step} `
                        + `(using ${label}=${newValue})`);
                    n = newValue;
                }
                return n;
            };
            this.min = lockstep(min, "min", up);
            this.max = lockstep(max, "max", down);
            __classPrivateFieldSet(this, _value, lockstep(value, "value", down));
            if (this.max < this.min) {
                this.max = this.min + step;
                warn(`max=${max} cannot be less than min=${min} `
                    + `(using max=${this.max})`);
            }
            this.value = __classPrivateFieldGet(this, _value);
        });
        _cap.set(this, (value) => {
            value = __classPrivateFieldGet(this, _roundStep).call(this, value, this.step, false);
            value = value >= this.max ? this.max : value;
            value = value <= this.min ? this.min : value;
            return value;
        });
        _fireQuantityChange.set(this, () => {
            this.dispatchEvent(new QuantityInput.QuantityChangeEvent(__classPrivateFieldGet(this, _value)));
        });
        this.increment = () => {
            this.value = this.value + this.step;
            __classPrivateFieldGet(this, _fireQuantityChange).call(this);
        };
        this.decrement = () => {
            this.value = this.value - this.step;
            __classPrivateFieldGet(this, _fireQuantityChange).call(this);
        };
        _textAsInteger.set(this, (text) => {
            return /^[\d]+$/.test(text)
                ? parseInt(text)
                : false;
        });
        _handleInputChange.set(this, () => {
            const originalValue = __classPrivateFieldGet(this, _value);
            const input = this.shadowRoot.querySelector("#textinput");
            const { value: text } = input;
            const converted = __classPrivateFieldGet(this, _textAsInteger).call(this, text);
            const newValue = converted === false
                ? originalValue
                : __classPrivateFieldGet(this, _cap).call(this, converted);
            if (newValue.toString() !== text)
                input.value = newValue.toString();
            if (newValue !== originalValue) {
                __classPrivateFieldSet(this, _value, newValue);
                __classPrivateFieldGet(this, _fireQuantityChange).call(this);
            }
        });
    }
    set value(value) {
        const oldValue = __classPrivateFieldGet(this, _value);
        __classPrivateFieldSet(this, _value, __classPrivateFieldGet(this, _cap).call(this, value));
        this.requestUpdate("value", oldValue);
    }
    get value() {
        return __classPrivateFieldGet(this, _value);
    }
    firstUpdated() {
        __classPrivateFieldGet(this, _validateProperties).call(this);
        if (this.onquantitychange)
            this.addEventListener(QuantityInput.QuantityChangeEvent.event, this.onquantitychange);
    }
    render() {
        return html `
			<input
				id=textinput
				type=text
				inputmode=numeric
				.value=${__classPrivateFieldGet(this, _value).toString()}
				min=${this.min}
				max=${this.max}
				step=${this.step}
				@change=${__classPrivateFieldGet(this, _handleInputChange)}
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
_value = new WeakMap(), _roundStep = new WeakMap(), _validateProperties = new WeakMap(), _cap = new WeakMap(), _fireQuantityChange = new WeakMap(), _textAsInteger = new WeakMap(), _handleInputChange = new WeakMap();
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
//# sourceMappingURL=quantity-input.js.map