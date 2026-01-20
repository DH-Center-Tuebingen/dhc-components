import { createI18n } from 'vue-i18n';
import * as de from './de.json';
import * as en from './en.json';

declare global {
    interface Window {
        globalLocale: string;
    }
}

export const initI18n = (messages: object, extendGlobal: boolean = false) => {
    if(extendGlobal) {
        if(messages.de) {
            messages.de = {
                ...de,
                ...messages.de,
            };
        }
        if(messages.en) {
            messages.en = {
                ...en,
                ...messages.en,
            };
        }
    }
    return createI18n<false, typeof messages>({
        locale: window?.globalLocale || 'en',
        fallbackLocale: 'en',
        legacy: false,
        messages: messages,
    });
};
