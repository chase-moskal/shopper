import { Topic, EventMediator } from "../../types.js";
export declare class ReactorTopic implements Topic<ReactorTopic> {
    generatePower(a: number, b: number): Promise<number>;
    radioactiveMeltdown(): Promise<void>;
    alarm: EventMediator;
}
export declare function exampleHost(): Promise<void>;
