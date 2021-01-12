import { LitElement } from "lit-element";
export declare function dashify(camel: string): string;
export declare function registerComponents(components: {
    [key: string]: typeof LitElement;
}): void;
