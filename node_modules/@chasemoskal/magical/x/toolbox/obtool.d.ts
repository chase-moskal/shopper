export declare function obtool<Input extends {}>(input: Input): {
    map<OutputValue>(mapper: (value: Input[keyof Input], key: string) => OutputValue): { [P in keyof Input]: OutputValue; };
};
