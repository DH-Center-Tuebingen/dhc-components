import { computed, DefineComponent, ref } from 'vue';
import ContextMenu from '../components/System/ContextMenu/ContextMenu.vue';

export function useContextMenu() {

    const activeComponent = ref<DefineComponent | null>(null);

    const activeContextComponent = computed(() => {
        return activeComponent.value;
    });

    const setContextComponent = (component: DefineComponent) => {
        activeComponent.value = component;
    }

    return {
        component: ContextMenu,
        activeContextComponent,
        setContextComponent,
    }
}