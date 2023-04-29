export function once(handler) {
    let done = false;
    let value;
    return async () => {
        if (done)
            return value;
        else {
            value = await handler();
            done = true;
            return value;
        }
    };
}
//# sourceMappingURL=once.js.map