/**
 * The ResizeObserver is used to observe changes to Element's content area so that 
 * you can react to changes in the size of the element's content area.
 * It is more elaborate than the window resize event as it observes the size
 * of the element's content area and
 * 
 * When dealing with resizing, we recommend using the ResizeObserver Composable.
 */
import {
    ref,
    onMounted,
    onUnmounted,
} from 'vue';

export default function useResizeObserver(callback: ResizeObserverCallback) {
    const canvasRef = ref(null);
    let observer: ResizeObserver | null = null;

    onMounted(() => {
        if (canvasRef.value) {
            observer = new ResizeObserver(callback);
            observer.observe(canvasRef.value);
        }
    });

    onUnmounted(() => {
        if (observer) { observer.disconnect(); }
    });

    return canvasRef
}