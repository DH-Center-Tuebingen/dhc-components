import {
    Component,
    createApp,
    h,
    reactive,
} from 'vue';

// Definition to dynamically allow all defined props of a (modal) component in
// useModal() options parameter
type ComponentProps<C> =
  C extends new (...args: any) => { $props: infer P }
    ? P
    : never;

// List of all possible modal option parameters
// They are passed down to a modal instance as props and should be passed to
// Modal base class (Skeleton.vue) using `v-bind="props"`
export type ModalOptions = {
    show?: boolean;
    closeOnOutsideClick?: boolean;
    closeOnEsc?: boolean;
};

type ModalEmits = {
    onClose?: Function;
    // onCancel?: Function;
    // onSubmit?: Function;
};

// This is a "collection" of all supported modal options
// and a predefined set of events that might have a default action defined here
type ModalArgs =
  ModalOptions & ModalEmits;

export const useModal = <C extends Component,>(component: C, options: Partial<ComponentProps<C>>) => {
    const optionsAsArgs = (options || {}) as ModalArgs;
    const state = reactive({
        show: optionsAsArgs?.show || false,
    });

    const show = () => {
        state.show = true;
    };

    const hide = (destroy: boolean = false) => {
        state.show = false;
        if(destroy) {
            app.unmount();
            document.body.removeChild(container);
        }
    };

    // set default close/hide action if none is defined
    if(!optionsAsArgs?.onClose) {
        optionsAsArgs.onClose = hide;
    }

    const container = document.createElement('div');
    const app = createApp({
        render() {
            return h(component, {
                ...options,
                ...optionsAsArgs,
                show: state.show,
            });
        },
    });

    app.mount(container);
    document.body.appendChild(container);

    return {
        show,
        hide,
    };
};

export default useModal;