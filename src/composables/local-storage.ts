import { onMounted, Reactive, reactive, Ref, ref, watch } from 'vue';

function isRef(value: any) {
    return (typeof value !== 'object');
}

function getRefValue(value: any) {
    return isRef(value) ? ref(value) : reactive({ ...value });
}

function resetToDefault(storage: Ref<any> | Reactive<any>, defaultValue: any) {
    return (isRef(defaultValue)) ? storage.value = defaultValue : Object.assign(storage, defaultValue);
}

type LocalStorageOptions = {
    onLoaded?: (storage: any) => void;
}

export function useLocalStorage(name: string, defaultValue = {}, options = {} as LocalStorageOptions) {
    const _isRef = isRef(defaultValue);

    let loaded = false;
    const storage: Ref<any> | Reactive<any> = getRefValue(defaultValue);

    function load() {
        const data = localStorage.getItem(name);
        let parsedData;
        if (data) {
            try {
                parsedData = JSON.parse(data);

                // This will apply the stored value to the stored value
                // and is useful if the default value changes, it should 
                // remain functional, as the default value should 'dictate'
                // the structure of the stored value.


                if (!_isRef) {
                    parsedData = { ...defaultValue, ...parsedData };
                }
            } catch (e) {
                parsedData = defaultValue;
            }
        } else {
            parsedData = defaultValue;
        }

        if (_isRef) {
            storage.value = parsedData.value;
        } else {
            Object.assign(storage, parsedData);
        }
    }

    onMounted(() => {
        load();
        if (options.onLoaded) {
            options.onLoaded(storage);
        }
        loaded = true;
    });

    function save() {
        let stored = storage;
        if (storage?.__v_isRef) {
            stored = { isRef: true, value: storage.value };
        }

        localStorage.setItem(name, JSON.stringify(stored));
    }

    function reset() {
        localStorage.removeItem(name);
        resetToDefault(storage, defaultValue);
    }

    watch(storage, () => {
        if (loaded) {
            save();
        }
    });

    return {
        load,
        save,
        reset,
        value: storage,
    };
}

export function useOptionalLocalStorage(use: boolean, name: string, defaultValue = {}, options = {} as LocalStorageOptions) {
    if (use) {
        return useLocalStorage(name, defaultValue, options);
    } else {
        const value = getRefValue(defaultValue);
        return {
            load: () => { },
            save: () => { },
            reset: () => resetToDefault(value, defaultValue),
            value
        };
    }
}