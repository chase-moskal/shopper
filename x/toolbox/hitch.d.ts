export declare type Hitcher = () => void;
export declare type AsyncHitcher = () => Promise<void>;
export declare function hitch<T extends (...args: any[]) => any>(handler: T, { before, after }: {
    before?: Hitcher;
    after?: Hitcher;
}): T;
export declare function asyncHitch<T extends (...args: any[]) => Promise<any>>(handler: T, { before, after }: {
    before?: AsyncHitcher;
    after?: AsyncHitcher;
}): T;
