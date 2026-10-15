<template>
    <div>
        <nav
            class="nav nav-justified"
            :class="layoutClasses"
        >
            <a
                v-for="({ key, label }) in tabs"
                :key="`tab-button-${key}`"
                :id="createLabelId(key)"
                class="nav-link d-flex align-items-center justify-content-center"
                @click.prevent="_ => select(key)"
                href="#"
                :class="{ 'active': activeTab === key }"
                :draggable="false"
            >{{ label }}</a>
        </nav>
        <div
            class="tab-content"
            :class="tabClasses"
        >
            <div
                v-for="({ key }) in tabs"
                :key="`tab-content-${key}`"
                :aria-labelledby="createLabelId(key)"
                :aria-expanded="activeTab === key"
                :aria-selected="activeTab === key"
                class="tab-pane fade"
                :class="{ 'show active': activeTab === key }"
                :data-tab="key"
            >
                <slot :name="key"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {
        computed,
        ref,
        useId,
    } from 'vue';

    export type TabsProps = {
        activeTab: string,
        tabs: Array<{ key: string, label: string }>;
        direction?: 'horizontal' | 'vertical';
        style?: 'none' | 'tabs' | 'pills' | 'underline';
        width?: 'normal' | 'fill' | 'fill-evenly';
        contentClass?: string,
    };

    const props = withDefaults(defineProps<TabsProps>(), {
        activeTab: '',
        direction: 'horizontal',
        style: 'tabs',
        width: 'normal',
        contentClass: ""
    });

    const activeTab = ref((props.activeTab !== '') ? props.activeTab : ((props.tabs.length > 0) ? props.tabs[0].key : ''));

    const layoutClasses = computed(() => {
        const classes: Array<string> = [];

        if (props.direction === 'vertical') {
            classes.push('flex-column');
        }

        if (props.style === 'tabs') {
            classes.push('nav-tabs');
        } else if (props.style === 'pills') {
            classes.push('nav-pills');
        } else if (props.style === 'underline') {
            classes.push('nav-underline');
        }

        if (props.width === 'fill') {
            classes.push('nav-fill');
        } else if (props.width === 'fill-evenly') {
            classes.push('nav-justified');
        }

        return classes;
    });

    const id = useId();

    const createLabelId = (key: string) => {
        return id + "-" + key;
    }

    const select = (key: string) => {
        activeTab.value = key;
    };

    const tabClasses = computed(() => {
        if (props.contentClass) return props.contentClass;

        if (props.style === 'tabs') {
            return "border border-top-0 rounded-bottom p-3 bg-body"
        } else {
            return "";
        }
    })
</script>