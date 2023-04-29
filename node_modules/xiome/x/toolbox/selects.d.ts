/**
 * Select a single dom element
 */
export declare function select<H extends HTMLElement = HTMLElement>(selector: string, context?: any): H;
/**
 * Select multiple dom elements
 */
export declare function selects<H extends HTMLElement = HTMLElement>(selector: string, context?: any): H[];
