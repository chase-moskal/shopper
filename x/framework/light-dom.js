import { html } from "lit-element";
export function LightDom(C) {
    return class LightDomComponent extends C {
        static get styles() { return [...super.styles]; }
        // use light dom (opt out of shadow dom)
        createRenderRoot() { return this; }
        // render the styles straight to the light dom
        render() {
            const { styles } = this.constructor;
            return html `
				${super.render()}
				<style>${styles}</style>
			`;
        }
    };
}
//# sourceMappingURL=light-dom.js.map