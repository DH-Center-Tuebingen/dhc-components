import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);

export default dayjs;

export const acceptedFormats = ['YYYY-MM-DD[T]HH:mm:ss.SSS[Z]', 'DD.MM.YYYY'];

const validateString = (date: string|null) => {
    if(!date) {
        return true;
    }

    return dayjs(date, acceptedFormats, true).isValid();
}

const toDayjs = (value: string | number) => {
    if(value) {
        if(value as number) {
            value = (value as number) * 1000;
        }
        return dayjs.utc(value);
    }
}

export const validate = (date: string | Array<string> | null) => {
    if(Array.isArray(date)) {
        return date.every(d => validateString(d));
    } else {
        return validateString(date);
    }
}

export const date2string = (value: string | number) => {
    const parsedValue = toDayjs(value);
    if(parsedValue) {
        return parsedValue.toDate().toString();
    }
}

export const ago = (value: string | number) => {
    const parsedValue = toDayjs(value);
    if(parsedValue) {
        return parsedValue.fromNow();
    }
}