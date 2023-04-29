export function prepareMessageListener({ namespace, hostOrigin, messageHandlers, }) {
    return async function messageListener({ origin, data: message }) {
        const isMessageForUs = typeof message === "object"
            && message.namespace === namespace;
        if (isMessageForUs) {
            if (origin !== hostOrigin)
                throw new Error(`message rejected from "${origin}"`);
            try {
                const handler = messageHandlers[message.signal];
                if (!handler)
                    throw new Error(`unknown signal "${message.signal}"`);
                await handler(message);
            }
            catch (error) {
                error.message = `crosscall client error: ${error.message}`;
                throw error;
            }
        }
        return isMessageForUs;
    };
}
//# sourceMappingURL=prepare-message-listener.js.map