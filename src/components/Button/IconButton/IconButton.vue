<template>
    <button
        class="icon-button"
        :class="buttonClass"
        style="user-select: none; cursor: pointer;"
        :aria-pressed="active"
        :disabled="disabled"
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
                :active="active"
            >
            </slot>
            <template v-if="!slots.icon">
                <div
                    v-if="!isActive"
                    class="icon"
                >
                    <FontAwesomeIcon
                        :icon="icon"
                        :size="size"
                        :fixed-width="fixedWidth"
                    />
                </div>
                <div
                    v-else
                    class="icon"
                >
                    <FontAwesomeIcon
                        :icon="activeIcon"
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
    import type { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
    import { computed, ModelRef, useSlots } from 'vue';
    import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue';


    const slots = useSlots();

    const value: ModelRef<boolean | undefined, string> = defineModel();
    const props = withDefaults(defineProps<{
        active?: boolean;
        activeButtonClass?: string;
        activeIcon?: string | IconDefinition;
        activeIconCategory?: string;
        buttonClass?: string;
        disabled?: boolean;
        fixedWidth?: boolean;
        icon: string | IconDefinition;
        iconCategory?: string;
        loading?: boolean;
        size?: SizeProp;
        small?: boolean;
    }>(), {
        active: undefined,
        activeButtonClass: 'primary',
        activeIconCategory: 'fas',
        buttonClass: 'secondary',
        disabled: false,
        fixedWidth: true,
        iconCategory: 'fas',
        loading: false,
        small: false,
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
    }

    const icon = computed(() => {
        return resolveIconProp(props.icon, props.iconCategory);
    });

    const activeIcon = computed(() => {
        return resolveIconProp(props.activeIcon ?? props.icon, props.activeIconCategory);
    });

    const buttonClass = computed(() => {
        const classes = [
            'btn',
            `btn-${isActive.value ? props.activeButtonClass : props.buttonClass}`,
        ]
        
        if(props.small) {
            classes.push('btn-sm');
        }

        if(isActive.value) {
            classes.push('active');
        }

        return classes;
    });

    const isActive = computed(() => {
        return props.active != null ? props.active : value.value;
    });
</script>