export const channelList = [
    'success',
    'info',
    'warning',
    'danger',
    'primary',
    'secondary',
    'dark',
] as const;
export type channels = typeof channelList[number];

export interface ToastProps {
    id?: string,
    icon?: boolean,
    simple?: boolean,
    message: string,
    title: string,
    duration?: number,
    autohide?: boolean,
    channel?: channels,
    hideTimeout?: boolean,
}