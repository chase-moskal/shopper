export function prepareRequestFunction({ state, namespace, hostOrigin, postMessage, }) {
    if (!postMessage)
        throw new Error(`crosscall client requires postMessage`);
    async function sendMessage(message) {
        const id = state.messageId++;
        const payload = { ...message, id, namespace };
        await postMessage(payload, hostOrigin);
        return id;
    }
    return async function request(message) {
        const id = await sendMessage(message);
        return new Promise((resolve, reject) => {
            state.requests.set(id, { resolve, reject });
        });
    };
}
//# sourceMappingURL=prepare-request-function.js.map