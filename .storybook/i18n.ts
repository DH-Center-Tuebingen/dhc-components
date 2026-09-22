import { createI18n, useI18n } from "vue-i18n";

import * as en from "@/i18n/en.json";
import * as de from "@/i18n/de.json";

window.useI18n = useI18n;

const messages = {
    en,
    de,
};

const i18n = createI18n({
    locale: "en",
    fallbackLocale: "en",
    messages,
    legacy: false,
});

export default i18n;

