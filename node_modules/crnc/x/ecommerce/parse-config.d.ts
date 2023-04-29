export declare function parseConfig({ baseCurrency, errorLabel, ...raw }: {
    baseCurrency: string;
    currencies?: string;
    errorLabel?: string;
}): {
    baseCurrency: string;
    currencies: string[];
};
