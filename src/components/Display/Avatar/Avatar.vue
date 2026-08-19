<template>
    <span class="d-inline-flex">
        <!-- :src="`api/download/avatar?path=${user.avatar}`" -->
        <img
            v-if="imageAvailable"
            alt="user avatar"
            :width="size"
            :height="size"
            :class="classes"
            class="object-fit-cover"
            :src="image"
            @error="imageNotFound = true"
        >
        <div
            v-else
            :style="initialsStyles.container"
            :class="classes"
            class="d-flex justify-content-center align-items-center"
        >
            <span :style="initialsStyles.text">
                {{ initials }}
            </span>
        </div>
    </span>
</template>

<script
    setup
    lang="ts"
>
    import { CSSProperties, computed, ref } from 'vue';
    import { getUserColor } from '@/utils/user.ts';

    const props = withDefaults(defineProps<{
        name: string,
        image?: string,
        max?: number,
        rounded?: boolean,
        shadow?: boolean,
        size?: number,
    }>(), {
        max: 2,
        rounded: true,
        shadow: false,
        size: 64,
    });
    

    const initials = computed(() => {
        const upperInitials = props.name.split(' ').map(word => word.charAt(0));
        if (upperInitials.length == 1) {
            return upperInitials.pop();
        } else if (upperInitials.length > props.max) {
            // if name has more initials than max property, prioritize last name
            // instead of middle names (e.g. John van Doe with a default max of 2)
            // would result in 'JD' instead of 'Jv';
            return upperInitials.slice(0, props.max - 1).join('') + upperInitials.pop();
        }
        return upperInitials.join('');
    });

    const backgroundColor = computed(() => {
        return getUserColor(props.name);
    });

    const classes = computed(() => {
        const classes: Array<string> = [];
        if (props.rounded) {
            classes.push('rounded-circle');
        }
        return classes;
    });
    
    const imageNotFound = ref(false);
    const imageAvailable = computed(() => props.image && !imageNotFound.value)

    const initialsStyles = computed(() => {
        const halfSize = props.size / 2;

        const containerStyles: CSSProperties = {
            height: `${props.size}px`,
            width: `${props.size}px`,
            'background-color': backgroundColor.value,
        };
        const textStyles: CSSProperties = {
            'font-weight': 'bold',
            'font-size': `${halfSize}px`,
            'line-height': `${halfSize}px`,
            'text-shadow': props.shadow ? '1px 1px 5px rgba(0, 0, 0, 0.25)' : '',
            color: '#ffffff',
        };

        return {
            container: containerStyles,
            text: textStyles,
        };
    });
</script>

<style lang="scss"></style>