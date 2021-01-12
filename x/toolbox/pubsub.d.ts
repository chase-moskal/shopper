export declare type AnyListener = (...args: any) => void | Promise<void>;
export interface Unsubscribe {
    (): void;
}
export interface Subscribe<Listener extends AnyListener = AnyListener> {
    (func: Listener): Unsubscribe;
}
export interface Pubsub<Listener extends AnyListener = AnyListener> {
    publish: Listener;
    subscribe: Subscribe<Listener>;
}
export interface Pubsubs {
    [key: string]: Pubsub;
}
export declare type Pubify<P extends Pubsubs> = {
    [K in keyof P]: P[K]["publish"];
};
export declare type Subify<P extends Pubsubs> = {
    [K in keyof P]: P[K]["subscribe"];
};
export interface Reader<S extends {} = {}> {
    state: Readonly<S>;
    subscribe: Subscribe<(state: S) => void>;
}
export interface ReaderContext<S extends {} = {}> {
    reader: Reader<S>;
    update: () => void;
}
export declare function pubsub<Listener extends AnyListener = AnyListener>(): Pubsub<Listener>;
export declare function pubsubs<O extends Pubsubs>(obj: O): {
    publishers: Pubify<O>;
    subscribers: Subify<O>;
};
/**
 * Produce a "reader" for a given state object
 * - a reader is a pubsub context (controls to publish/subscribe to changes)
 */
export declare function makeReader<S extends {} = {}>(state: S): ReaderContext<S>;
