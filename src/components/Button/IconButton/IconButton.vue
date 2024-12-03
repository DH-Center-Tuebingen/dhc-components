<template>
    <div
        class="icon-button"
        style="user-select: none; cursor: pointer;"
        :aria-pressed="active"
        @click="_ => value = !value"
    >
        <div
            v-if="!altIcon || modelValue"
            class="icon"
            :class="activeClass"
        >
            <i :class="iconClass" />
        </div>
        <div
            v-else
            class="icon"
            :class="activeClass"
        >
            <i :class="altIconClass" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ModelRef } from 'vue';

const props = withDefaults(defineProps<{
    iconCategory?: string;
    icon: string;
    altIcon?: string;
    altIconCategory?: string;
}>(), {
    iconCategory: 'fas',
    altIconCategory: 'fas',
});

const value: ModelRef<boolean, string> = defineModel({ required: true });
const iconClass = computed(() => {
    return `${props.iconCategory} fa-fw fa-${props.icon}`;
});

const altIconClass = computed(() => {
    return `${props.altIconCategory} fa-fw fa-${props.altIcon}`;
});

const activeClass = computed(() => {
    return {
        'active': value.value,
        'text-primary': value.value,
    };
});

const active = computed(() => {
    return Boolean(value.value);
});
</script>