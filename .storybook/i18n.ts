import { createI18n } from "vue-i18n";

import * as en from "@/i18n/en.json" with { type: "json" };
import * as de from "@/i18n/de.json" with { type: "json" };


const i18n = createI18n<[typeof en], 'en' | 'de'>({
    locale: "en",
    fallbackLocale: "en",
    messages: {
        en,
        de
    },
    legacy: false,
});

export default i18n;

