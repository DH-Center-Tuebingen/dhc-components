<template>
    <button
        class="icon-button user-select-none"
        :class="buttonClasses"
        style="cursor: pointer;"
        :aria-pressed="active"
        :disabled="isDisabled"
        :title="title"
        @mouseenter="startHover"
        @mouseleave="endHover"
        @click="clicked()"
    >
        <LoadingSpinner
            v-if="loading"
            :size="size"
        />
        <template v-else-if="hasIcon">
            <!-- Can be used to render your own custom icon, e.g. if you need to create an icon composition.  -->
            <slot
                v-if="slots.icon"
                name="icon"
                :active="isActive"
            >
            </slot>
            <template v-else-if="icon">

                <div class="icon">
                    <FontAwesomeIcon
                        v-if="!isStackedIcon"
                        :icon="active && activeIcon ? activeIcon : icon"
                        :size="size"
                        :fixed-width="fixedWidth"
                    />
                    <StackedIcon
                        v-else-if="icons"
                        :data="icons"
                        :size="size"
                        :fixed-width="fixedWidth"
                    />
                </div>

            </template>
        </template>
        <template v-if="hasText">
            <Transition name="fade-hover-text">
                <span
                    v-show="showHoveredText"
                    class="button-text-content"
                    ref="text-content"
                >
                    <slot v-if="slots.default">
                    </slot>
                    <template v-else-if="text">
                        {{ text }}
                    </template>
                </span>
            </Transition>
        </template>
    </button>
</template>

<script
    setup
    lang="ts"
>
    import type { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
    import type { ButtonColors } from 'src/types/Colors';

    import {
        computed,
        onMounted,
        ref,
        useSlots,
        useTemplateRef
    } from 'vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import StackedIcon from '@/components/Layout/StackedIcon/StackedIcon.vue';
    import LoadingSpinner from '@/components/Indicators/LoadingSpinner/LoadingSpinner.vue';

    const slots = useSlots();
    const emit = defineEmits(['action']);

    const value = defineModel<boolean | undefined
    >();
    const props = withDefaults(defineProps<{
        active?: boolean;
        activeButtonClass?: ButtonColors;
        activeIcon?: string | IconDefinition;
        activeIcons?: typeof StackedIcon;
        buttonClass?: ButtonColors;
        disabled?: boolean | Function;
        fixedWidth?: boolean;
        hoverTransitionTime?: number
        icon?: string | IconDefinition;
        icons?: typeof StackedIcon;
        loading?: boolean;
        outlined?: boolean;
        size?: SizeProp;
        small?: boolean;
        text?: string;
        textFirst?: boolean;
        textOnHover?: boolean;
        title?: string;
        unbutton?: boolean;
    }
    >(), {
        active: undefined,
        activeButtonClass: 'primary',
        buttonClass: 'secondary',
        disabled: false,
        fixedWidth: true,
        hoverTransitionTime: 300,
        loading: false,
        small: false,
        unbutton: false,
        outlined: false,
        text: '',
        textOnHover: false,
        textFirst: false,
    });

    
    const clicked = () => {
        if (value.value !== undefined) {
            value.value = !value.value;
        }
        emit('action');
    };
    
    const textContentRef = useTemplateRef("text-content")
    const isHovered = ref(false);
    const startHover = () => {
        isHovered.value = true;
    }

    const endHover = () => {
        isHovered.value = false;
    }

    const isStackedIcon = computed(() => Boolean(props.icons?.items));

    onMounted(() => {

    })

    const icon = computed(() => {
        if (props.active) {
            if (props.activeIcons) return props.activeIcons;
            if (props.activeIcon) return props.activeIcon
        }

        if (props.icons) return props.icons;
        if (props.icon) return props.icon;
    });

    const showHoveredText = computed(() => {
        return !props.textOnHover || isHovered.value;
    });

    const buttonClasses = computed(() => {
        const baseName = props.outlined ? 'btn-outline' : 'btn';
        const btnColor = isActive.value ? props.activeButtonClass : props.buttonClass;
        const classes = [
            'btn',
            `${baseName}-${btnColor}`,
        ];

        if (props.small) {
            classes.push('btn-sm');
        }

        if (isActive.value) {
            classes.push('active');
        }

        if (props.unbutton) {
            classes.push('bg-transparent border-0 p-0');
            if (!isActive.value) {
                classes.push(`text-${props.buttonClass}`);
            } else {
                classes.push(`text-${props.activeButtonClass}`);
            }
        }

        if (props.text) {
            classes.push('d-flex');
            classes.push('align-items-center');
            classes.push('justify-content-center');
            classes.push('gap-1');

            if (props.textFirst) {
                classes.push('flex-row-reverse');
            }
        }

        return classes;
    });

    const isActive = computed(() => {
        return props.active != null ? props.active : value.value;
    });

    const isDisabled = computed(() => {
        if (typeof props.disabled === 'boolean') {
            return props.disabled;
        } else {
            return props.disabled();
        }
    });

    const hasIcon = computed(() => {
        return props.icon !== undefined || slots.icon !== undefined || (props.icons && props.icons.items);
    });
    
    const hasText = computed(() => {
        return props.text !== undefined || slots.default !== undefined;
    });
</script>

<style scoped>

    .fade-hover-text-enter-active,
    .fade-hover-text-leave-active {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .fade-hover-text-enter-from {
        opacity: 0;
        transform: translateX(-5px);
    }

    .fade-hover-text-leave-to {
        opacity: 0;
    }
</style>