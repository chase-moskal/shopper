export function pubsub() {
    let listeners = [];
    return {
        publish: (async (...args) => {
            const operations = listeners.map(listener => listener(...args));
            await Promise.all(operations);
        }),
        subscribe(func) {
            listeners.push(func);
            return () => {
                listeners = listeners.filter(listener => listener !== func);
            };
        }
    };
}
export function pubsubs(obj) {
    const publishers = {};
    const subscribers = {};
    for (const [key, original] of Object.entries(obj)) {
        publishers[key] = original.publish;
        subscribers[key] = original.subscribe;
    }
    return { publishers, subscribers };
}
/**
 * Produce a "reader" for a given state object
 * - a reader is a pubsub context (controls to publish/subscribe to changes)
 */
export function makeReader(state) {
    const { publish, subscribe } = pubsub();
    return {
        reader: {
            subscribe,
            get state() { return Object.freeze({ ...state }); },
        },
        update: () => publish(Object.freeze({ ...state })),
    };
}
//# sourceMappingURL=pubsub.js.map