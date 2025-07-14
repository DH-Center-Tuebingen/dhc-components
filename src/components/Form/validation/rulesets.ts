import { number } from 'yup';

import { initI18n } from '../../../i18n/i18n';
import * as de from '../i18n/de.json';
import * as en from '../i18n/en.json';

const i18n = initI18n({
    de,
    en,
});
const t = i18n.global.t;

export const isNumber = () => number().typeError(t('validation.field_is_number'));

export const isInteger = () => number().integer().typeError(t('validation.field_is_integer'));