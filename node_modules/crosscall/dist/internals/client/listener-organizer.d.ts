import { Listener } from "../../types.js";
export declare class ListenerOrganizer {
    readonly ids: Map<Listener<any>, number>;
    readonly listeners: Map<number, Listener<any>>;
    add(id: number, listener: Listener): void;
    remove(id: number, listener: Listener): void;
}
