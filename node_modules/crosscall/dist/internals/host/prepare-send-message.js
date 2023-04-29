export function prepareSendMessage({ state, shims, namespace, }) {
    return async function sendMessage({ origin, message }) {
        const id = state.messageId++;
        const payload = { ...message, id, namespace };
        await shims.postMessage(payload, origin);
        return id;
    };
}
//# sourceMappingURL=prepare-send-message.js.map