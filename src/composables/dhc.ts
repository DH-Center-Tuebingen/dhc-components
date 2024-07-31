import { getCurrentInstance } from 'vue';

export function useDhcClasses(){
    const componentName = getCurrentInstance()?.type?.__name?.toLowerCase() ?? 'unknown';
    return `dhc-component dhc-${componentName}`;
}