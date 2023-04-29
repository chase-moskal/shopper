const noop = () => { };
const anoop = async () => { };
export function hitch(handler, { before = noop, after = noop }) {
    return ((...args) => {
        before();
        const result = handler(...args);
        after();
        return result;
    });
}
export function asyncHitch(handler, { before = anoop, after = anoop }) {
    return (async (...args) => {
        await before();
        const result = await handler(...args);
        await after();
        return result;
    });
}
//# sourceMappingURL=hitch.js.map