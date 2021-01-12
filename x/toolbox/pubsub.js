var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function pubsub() {
    let listeners = [];
    return {
        publish: ((...args) => __awaiter(this, void 0, void 0, function* () {
            const operations = listeners.map(listener => listener(...args));
            yield Promise.all(operations);
        })),
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
            get state() { return Object.freeze(Object.assign({}, state)); },
        },
        update: () => publish(Object.freeze(Object.assign({}, state))),
    };
}
//# sourceMappingURL=pubsub.js.map