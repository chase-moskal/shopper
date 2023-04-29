export declare function makeTicketbooth(): {
    readonly ticket: number;
    pullTicket(): number;
    pullSession(): () => boolean;
};
