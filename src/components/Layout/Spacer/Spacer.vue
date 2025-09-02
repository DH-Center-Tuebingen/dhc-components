<template>
    <div
        class="spacer"
        :class="classes"
    >
        <span v-if="!isLine">
            {{ type }}
        </span>
    </div>
</template>

<script setup lang="ts">
    import {
        computed,
    } from 'vue';

    import { SpacerProps } from './definitions';

    const props = withDefaults(defineProps<SpacerProps>(), {
        dir: 'vertical',
        width: 1,
        spacing: 2,
        type: 'line',
    });

    const isVertical = computed(() => props.dir === 'vertical');
    const isLine = computed(() => props.type === 'line');

    const classes = computed(() => {
        const classList = [];
        if(isLine.value) {
            classList.push(`border-${props.width}`);

            if(isVertical.value) {
                classList.push('border-start');
            } else {
                classList.push('border-top');
            }
        }

        if(isVertical.value) {
            classList.push('d-inline', `mx-${props.spacing}`);
        } else {
            classList.push(`my-${props.spacing}`);
        }

        return classList;
    });
</script>