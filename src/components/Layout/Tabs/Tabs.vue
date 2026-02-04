<template>
    <div>
        <ul
            class="nav"
            :class="layoutClasses"
        >
            <li
                v-for="(tab, index) in tabs"
                :key="`tab-button-${index}`"
                class="nav-item"
            >
                <a
                    class="nav-link"
                    @click.prevent="_ => select(index)"
                    href="#"
                    :class="{ 'active': activeTab === index }"
                >{{ tab }}</a>
            </li>
        </ul>
        <div class="tab-content">
            <div
                v-for="(tab, index) in tabs"
                :key="`tab-content-${index}`"
                :aria-labelledby="`${tab}`"
                :aria-expanded="activeTab === index"
                :aria-selected="activeTab === index"
                class="tab-pane fade"
                :class="{ 'show active': activeTab === index }"
                :data-tab="tab"
            >
                <slot :name="tabs[index]"></slot>
            </div>
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import {
        computed,
        ref,
    } from 'vue';

    import { TabsProps } from './definitions';

    const props = withDefaults(defineProps<TabsProps>(), {
        direction: 'horizontal',
        style: 'tabs',
        width: 'normal',
    });

    const activeTab = ref(0);

    const layoutClasses = computed(() => {
        const classes: Array<string> = [];

        if(props.direction === 'vertical') {
            classes.push('flex-column');
        }

        if(props.style === 'tabs') {
            classes.push('nav-tabs');
        } else if(props.style === 'pills') {
            classes.push('nav-pills');
        } else if(props.style === 'underline') {
            classes.push('nav-underline');
        }

        if(props.width === 'fill') {
            classes.push('nav-fill');
        } else if(props.width === 'fill-evenly') {
            classes.push('nav-justified');
        }

        return classes;
    });

    const select = (index: number) => {
        activeTab.value = index;
    };
</script>