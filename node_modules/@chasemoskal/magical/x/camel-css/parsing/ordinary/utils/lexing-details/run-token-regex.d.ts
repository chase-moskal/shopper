import { Source } from "../../types.js";
export declare function runTokenRegex({ source, regex, index, setIndex, }: {
    source: Source;
    regex: RegExp;
    index: number;
    setIndex: (newIndex: number) => void;
}): RegExpExecArray | null;
