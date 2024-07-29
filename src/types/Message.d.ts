export enum MessageType {
    Error,
    Info,
    Success,
    Warning,
}

export interface ErrorMessage {
    text: string;
    type: MessageType;
}