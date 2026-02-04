import {
    createVNode,
    provide,
    render,
} from 'vue';

// This should not be used here, bootstrap should not be bundled into the library!
import {
    Toast,
} from 'bootstrap';

import { only } from '../../../utils/common';

import ToastComponent from './Toast.vue';

type ToastStore = {
    wrapper: HTMLElement | null;
}

const store: ToastStore = {
    wrapper: null,
};

const defaultConfig = {
    icon: false,
    simple: false,
    duration: 5000,
    autohide: true,
    channel: 'default',
    container: 'toast-container',
    container_classes: 'position-absolute start-0 bottom-0',
    is_tag: true,
};

const perToastConfig = [
    'icon',
    'simple',
    'duration',
    'autohide',
    'channel',
];

export function pushToast(message: string, title: string, config: any = {}) {
    const toastId = `toast-${window.crypto.randomUUID()}`;
    const toastContainer = document.createElement('div');
    const finalConfig:any = reduceToastConfig({ ...defaultConfig, ...config });
    render(createVNode(ToastComponent, {
        message: message,
        title: title,
        id: toastId,
        ...finalConfig,
    }), toastContainer);

    if(store.wrapper) {
        store.wrapper.appendChild(toastContainer);
        const toastElem = document.getElementById(toastId);
        if(!toastElem) {
            throw new Error('Could not find created toast element in DOM!');
        }
        toastElem.addEventListener('hidden.bs.toast', (e: Event) => {
            if(!e.target) {return;}
            const target = e.target as HTMLElement;
            const parentNode = target.parentNode as HTMLElement;
            parentNode?.remove();
        });
        const bsToast = new Toast(toastElem);
        finalConfig.instance = bsToast;
        bsToast.show();
        return bsToast;
    } else {
        throw new Error('Toast wrapper not initialized!');
    }
}

function initializeWrapper(config: any) {
    let wrapper: HTMLElement | null = null;
    if(config.is_tag) {
        const containers = document.getElementsByTagName(config.container);
        if(!containers || containers.length < 1) {
            throw new Error(`Could not find elements with tag ${config.container} in DOM!`);
        }
        wrapper = containers[0];
        const toastContainer = document.createElement('div');
        if(wrapper) {
            toastContainer.classList.add('toast-container');
            wrapper.appendChild(toastContainer);
        }
    } else {
        wrapper = document.getElementById(config.container);
    }

    if(wrapper == null) {
        throw new Error(`Could not find element with ID ${config.container} in DOM!`);
    } else {
        wrapper.classList.add(...config.container_classes.split(' '));
        store.wrapper = wrapper;
    }
}

function reduceGlobalConfig(config: any) {
    return only(config, Object.keys(defaultConfig));
}

function reduceToastConfig(config: any) {
    return only(config, perToastConfig);
}

const createToast = (config: any) => ({
    config: config,
    $toast(message: string, title: string, config: any = {}) {
        const reducedLocal = reduceToastConfig(config);
        const combined = reduceToastConfig({ ...this.config, ...reducedLocal });
        return pushToast(message, title, combined);
    },
});

const toastSymbol = Symbol();
let toastInstance: any = null;

export function provideToast(toastConfig: any = {}) {
    const reducedConfig = reduceGlobalConfig({ ...defaultConfig, ...toastConfig });
    const toast = createToast(reducedConfig);
    toastInstance = toast;
    provide(toastSymbol, toast);
}

export function useToast() {
    // const toast = inject(toastSymbol);
    const toast = toastInstance;
    if(!toast) { throw new Error('No toast provided!'); }

    if(!store.wrapper) {
        initializeWrapper(toast.config);
    }

    return toast;
}