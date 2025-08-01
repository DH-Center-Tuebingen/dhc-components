import { Ref } from 'vue';

/**
 *  Hook to add hotkeys to a number-like input field.
 */
export function useNumberInputHotkeys(proxyValue: Ref, isFloat = false) {
    const onKeydown = (event: KeyboardEvent) => {
        let step = 1;
        if(event.shiftKey) {
            step = 10;
        } else if(event.ctrlKey && isFloat) {
            step = 0.1;
        } else if(event.altKey && isFloat) {
            step = 0.01;
        }

        const value = parseFloat(proxyValue.value) || 0;
        if(event.key === 'ArrowUp') {
            proxyValue.value = parseFloat((value + step).toFixed(2));
            event.preventDefault();
        } else if(event.key === 'ArrowDown') {
            proxyValue.value = parseFloat((value - step).toFixed(2));
            event.preventDefault();
        }
    };

    return {
        onKeydown
    };
}