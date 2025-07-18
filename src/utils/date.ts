import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat);

export default dayjs;

export const acceptedFormats = ['YYYY-MM-DD[T]HH:mm:ss.SSS[Z]', 'DD.MM.YYYY'];

const validateString = (date: string|null) => {
    if(!date) {
        return true;
    }

    return dayjs(date, acceptedFormats, true).isValid();
}

export const validate = (date: string | Array<string> | null) => {
    if(Array.isArray(date)) {
        return date.every(d => validateString(d));
    } else {
        return validateString(date);
    }
}