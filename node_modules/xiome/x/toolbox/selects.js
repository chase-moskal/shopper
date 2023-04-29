/**
 * Select a single dom element
 */
export function select(selector, context = document) {
    return context.querySelector(selector);
}
/**
 * Select multiple dom elements
 */
export function selects(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}
//# sourceMappingURL=selects.js.map