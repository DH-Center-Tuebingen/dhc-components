import { createI18n, I18n } from 'vue-i18n';
import * as de from './de.json';
import * as en from './en.json';

declare global {
    interface Window {
        globalLocale: string;
    }
}

export type Messages = Record<string, Record<string, any>>;

export const initI18n = (messages: Messages, extendGlobal: boolean = false): I18n<Messages, {}, {}, string, false> => {
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
    return createI18n({
        locale: window?.globalLocale || 'en',
        fallbackLocale: 'en',
        legacy: false,
        messages: messages as any,
    });
};
