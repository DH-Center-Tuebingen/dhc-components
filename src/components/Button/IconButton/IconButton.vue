<template>
    <button
        class="icon-button user-select-none"
        :class="buttonClasses"
        style="cursor: pointer;"
        :aria-pressed="active"
        :disabled="isDisabled"
        :title="title"
        @click="clicked()"
    >
        <LoadingSpinner
            v-if="loading"
            :size="size"
        />
        <template v-else-if="!withoutIcon">
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
        <span v-if="text">
            {{ text }}
        </span>
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
        outlined: false,
        text: '',
        withoutIcon: false,
    });

    function resolveIconProp(prop: string | IconDefinition, category: string) {
        if(props.withoutIcon) {
            return;
        }

        if(typeof prop === 'string') {
            let stringDefinition = `${category} fa-${prop}`;
            if(props.fixedWidth) {
                stringDefinition += ' fa-fw';
            }
            return stringDefinition;
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
        if(props.withoutIcon) {
            return false;
        }

        return Array.isArray(props.icon) && (typeof props.icon[0] !== 'string');
    });

    const isStackedIcon = computed(() => {
        if(props.withoutIcon) {
            return false;
        }

        return !props.icon && props.icons?.items;
    });

    const icon = computed(() => {
        if(props.withoutIcon) {
            return;
        }

        if(Array.isArray(props.icon)) {
            return props.icon;
        } else {
            return resolveIconProp(props.icon ?? '', props.iconCategory);
        }
    });

    const activeIcon = computed(() => {
        if(props.withoutIcon) {
            return;
        }

        if(props.activeIcon && Array.isArray(props.activeIcon)) {
            return props.activeIcon;
        } else if(props.icon && Array.isArray(props.icon)) {
            return props.icon;
        } else {
            return resolveIconProp(props.activeIcon ?? props.icon ?? '', props.activeIconCategory);
        }
    });

    const buttonClasses = computed(() => {
        const baseName = props.outlined ? 'btn-outline' : 'btn';
        const btnColor = isActive.value ? props.activeButtonClass : props.buttonClass;
        const classes = [
            'btn',
            `${baseName}-${btnColor}`,
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

        if(props.text) {
            classes.push('d-flex');
            classes.push('align-items-center');
            classes.push('justify-content-center');
            classes.push('gap-1');
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