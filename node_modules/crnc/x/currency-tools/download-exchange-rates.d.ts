import { DownloadExchangeRatesParams, DownloadExchangeRatesResults } from "../interfaces.js";
/**
 * Download exchange rates
 * - from bank of canada valet service https://www.bankofcanada.ca/valet/docs
 */
export declare function downloadExchangeRates({ currencies, }: DownloadExchangeRatesParams): Promise<DownloadExchangeRatesResults>;
