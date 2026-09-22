/// <reference types="vite/client" />


/**
 * Helps Typescript to automatically detect and import vue components.
 */
declare module '*.vue' {
	import type { DefineComponent } from 'vue';

	const component: DefineComponent<{}, {}, any>;
	export default component;
}
