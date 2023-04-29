export declare class CrosscallApiError extends Error {
    readonly name: string;
}
export declare const err: (message: string) => CrosscallApiError;
