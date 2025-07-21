<template>
    <div
        class="twt border border-2 rounded-pill"
        @click="setNext()"
    >
        <div class="d-flex gap-2 rounded-pill position-relative w-100 h-100">
            <div
                class="toggle-icon fade-in rounded-circle position-absolute"
                :class="getStateClasses()"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ModelRef, onMounted } from 'vue';

    const value: ModelRef<number | undefined> = defineModel();

    const props = withDefaults(defineProps<{
        initialValue?: number;
    }>(),{});

    onMounted(() => {
        set(props.initialValue);
    });

    const set = (state: number | undefined) => {
        value.value = state === undefined ? -1 : state;
    };

    const setNext = () => {
        let state = value.value === undefined ? -1 : value.value;
        state++;
        if(state == 2) {
            state = -1;
        }
        set(state);
    };

    const getStateClasses = (): Array<string> => {
        const classes = ['top-50', 'translate-middle', 'bg-opacity-75'];
        if(value.value === -1) {
            classes.push('bg-secondary');
            classes.push('start-50');
        } else if(value.value === 0) {
            classes.push('bg-danger');
            classes.push('start-0');
        } else if(value.value === 1) {
            classes.push('bg-success');
            classes.push('start-100');
        }
        return classes;
    };
</script>

<style lang="scss" scoped>
    $width: 6rem;
    $widthFactor: 3;
    $actualWidth: calc($width * $widthFactor);
    $ratio: calc(3 * $widthFactor);
    $aspect: calc($ratio / 1);
    $height: calc($actualWidth / $aspect);

    .twt {
        width: $actualWidth;
        aspect-ratio: $aspect;
        padding: 0 calc($height / 2);
    }

    .toggle-icon {
        height: calc(0.75 * $height);
        aspect-ratio: 1/1;
    }

    .fade-in {
        transition: left 0.25s ease-in;
    }
</style>