import { createI18n } from 'vue-i18n';

export const initI18n = (messages: object) => {
    return createI18n({
        locale: window?.globalLocale || 'en',
        fallbackLocale: 'en',
        legacy: false,
        messages: messages,
    });
};

