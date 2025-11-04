import { createI18n } from 'vue-i18n';

declare global {
    interface Window {
        globalLocale: string;
    }
}

export const initI18n = (messages: object) => {
    return createI18n<false, typeof messages>({
        locale: window?.globalLocale || 'en',
        fallbackLocale: 'en',
        legacy: false,
        messages: messages,
    });
};
