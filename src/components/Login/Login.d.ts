import type { CheckboxInput } from '../../types/Input';
import type { ErrorMessage } from '../../types/Message';
import { TextWithIcon } from '../LabeledInput/LabeledInput';

export interface LoginProps {
    invalidClass?: string;
    loading: boolean;
    disabled: boolean;
    error: boolean
    username: string;
    password: string;
    stayLoggedIn: boolean;
    stayLoggedInText: string;
    message?: ErrorMessage;
    passwordLabel: TextWithIcon;
    stayLoggedInText: string;
    submitText: string;
    title: string;
    userLabel: TextWithIcon;
}