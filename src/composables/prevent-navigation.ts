/**
 * A custom hook to prevent navigation when a form is dirty.
 * 
 * @param {function} func - Takes a function that retuens a truthy value if the form is dirty. 
 * Note it is a function so that it can be reactive (otherwise we could not track structures like 
 * e.g. state.dirty).
 */

import { onBeforeUnmount, onMounted } from 'vue';

export function usePreventNavigation(validation: Function, {
    debug = false
} = {}) {

    const msgHeader = 'usePreventNavigation: ';

    // Keep this here until we know this is working properly.
    // Managing unbeforereload with vue and router is a bit tricky.
    const debugLog = (msg: string) => console.trace(
        `%c${msgHeader}${msg}`,
        'background: #3999ed; color: #f2f2f2; padding: 2px 6px; border-radius: 3px;'
    );

    const preventNavigation = (function (e: BeforeUnloadEvent) {
        if (debug) {
            debugLog('preventNavigation');
        }

        if (validation()) {
            e.preventDefault();
            e.returnValue = '';
        }
    }).bind(this);

    const add = () => {
        if (debug) {
            debugLog('add');
        }
        window.addEventListener('beforeunload', preventNavigation);
    };
    const remove = () => {
        if (debug) {
            debugLog('remove');
        }

        window.removeEventListener('beforeunload', preventNavigation);
    };

    onMounted(add);
    onBeforeUnmount(remove);
}