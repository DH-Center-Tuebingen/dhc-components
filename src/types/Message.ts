export enum MessageType {
    Error,
    Info,
    Success,
    Warning,
}

export type ErrorMessage = {
    text: string;
    type: MessageType;
}