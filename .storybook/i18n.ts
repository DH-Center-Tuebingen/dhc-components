import { createI18n } from "vue-i18n";

import 'bootstrap/dist/css/bootstrap.min.css';

const messages = {
    en: {
        global: {
            login_title: "Login",
            email_or_nick: "Email or Nickname",
            password: "Password",
            login: "Login",
            remember_me: "Remember me",
        },
        validation: {
            field_is_required: "Field is required",
        }
    },
};

const i18n = createI18n({
    locale: "en",
    fallbackLocale: "en",
    messages,
    legacy: false,
});

export default i18n;

