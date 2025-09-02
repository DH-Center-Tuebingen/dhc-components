import {
    array,
    mixed,
    number,
    object,
    string,
    setLocale,
} from 'yup';

import { initI18n } from '../../../i18n/i18n';
import * as de from '../i18n/de.json';
import * as en from '../i18n/en.json';

const i18n = initI18n({
    de,
    en,
});
const t = i18n.global.t;

setLocale({
    mixed: {
        default: '${path} is invalid',
        required: t('validation.field_is_required'),
        notType: ({ type }) => {
            return t(`validation.field_is_not_${type}`);
        }
    },
    number: {
        integer: t('validation.field_is_integer')
    }
});

const url = () => string().url();

const integer = () => number().integer();

export {
    array,
    integer,
    mixed,
    number,
    object,
    string,
    url,
};
