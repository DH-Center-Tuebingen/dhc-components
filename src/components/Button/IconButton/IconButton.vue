<template>
    <button
        class="icon-button"
        :class="buttonClass"
        style="user-select: none; cursor: pointer;"
        :aria-pressed="active"
        :disabled="isDisabled"
        :title="title"
        @click="clicked()"
    >
        <LoadingSpinner
            v-if="loading"
            :size="size"
        />
        <template v-else>
            <!-- Can be used to render your own custom icon, e.g. if you need to create an icon composition.  -->
            <slot
                name="icon"
                :active="isActive"
            >
            </slot>
            <template v-if="!slots.icon">
                <div
                    v-if="!isActive"
                    class="icon"
                >
                    <div
                        v-if="hasMultipleIcons"
                        class="icon-group d-flex gap-1"
                    >
                        <FontAwesomeIcon
                            v-for="iconPart of icon"
                            :key="iconPart"
                            :icon="iconPart"
                            :size="size"
                        />
                    </div>
                    <FontAwesomeIcon
                        v-else-if="!isStackedIcon"
                        :icon="icon"
                        :size="size"
                        :fixed-width="fixedWidth"
                    />
                    <StackedIcon
                        v-else
                        :data="icons"
                        :size="size"
                        :fixed-width="fixedWidth"
                    />
                </div>
                <div
                    v-else
                    class="icon"
                >
                    <FontAwesomeIcon
                        v-if="!isStackedIcon"
                        :icon="activeIcon"
                        :size="size"
                        :fixed-width="fixedWidth"
                    />
                    <StackedIcon
                        v-else
                        :data="icons"
                        :size="size"
                        :fixed-width="fixedWidth"
                    />
                </div>
            </template>
        </template>
    </button>
</template>

<script
    setup
    lang="ts"
>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
    import { computed, ModelRef, useSlots } from 'vue';
    import StackedIcon from '@/components/Layout/StackedIcon/StackedIcon.vue';
    import LoadingSpinner from '@/components/Indicators/LoadingSpinner/LoadingSpinner.vue';

    import { IconButtonProps } from './definitions';

    const slots = useSlots();
    const emit = defineEmits(['action']);

    const value: ModelRef<boolean | undefined, string> = defineModel();
    const props = withDefaults(defineProps<IconButtonProps>(), {
        active: undefined,
        activeButtonClass: 'primary',
        activeIconCategory: 'fas',
        buttonClass: 'secondary',
        disabled: false,
        fixedWidth: true,
        iconCategory: 'fas',
        loading: false,
        small: false,
        unbutton: false,
    });

    function resolveIconProp(prop: string | IconDefinition, category: string) {
        if(typeof prop === 'string') {
            return `${category} fa-fw fa-${prop}`;
        } else {
            return prop;
        }
    }

    function clicked() {
        if(value.value !== undefined) {
            value.value = !value.value;
        }
        emit('action');
    }

    const hasMultipleIcons = computed(() => {
        return Array.isArray(props.icon) && (typeof props.icon[0] !== 'string');
    });

    const isStackedIcon = computed(() => {
        return !props.icon && props.icons?.items;
    });

    const icon = computed(() => {
        if(Array.isArray(props.icon)) {
            return props.icon;
        } else {
            return resolveIconProp(props.icon ?? '', props.iconCategory);
        }
    });

    const activeIcon = computed(() => {
        if(props.activeIcon && Array.isArray(props.activeIcon)) {
            return props.activeIcon;
        } else if(props.icon && Array.isArray(props.icon)) {
            return props.icon;
        } else {
            return resolveIconProp(props.activeIcon ?? props.icon ?? '', props.activeIconCategory);
        }
    });

    const buttonClass = computed(() => {
        const classes = [
            'btn',
            `btn-${isActive.value ? props.activeButtonClass : props.buttonClass}`,
        ];

        if(props.small) {
            classes.push('btn-sm');
        }

        if(isActive.value) {
            classes.push('active');
        }

        if(props.unbutton) {
            classes.push('bg-transparent border-0 p-0');
            if(!isActive.value) {
                classes.push(`text-${props.buttonClass}`);
            } else {
                classes.push(`text-${props.activeButtonClass}`);
            }
        }

        return classes;
    });

    const isActive = computed(() => {
        return props.active != null ? props.active : value.value;
    });

    const isDisabled = computed(() => {
        if(typeof props.disabled === 'boolean') {
            return props.disabled;
        } else {
            return props.disabled();
        }
    })
</script>