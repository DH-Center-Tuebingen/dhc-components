<template>
    <div
        class="attribute-wrapper"
        :class="classes"
    >
        <slot :value="value" />
        <AttributeError
            v-if="errorMessage"
            :message="errorMessage ?? ''"
        />
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import AttributeError from './AttributeError.vue';

    const props = defineProps<{
        name: string,
        field: object
    }>();


    const classes = computed(() => {
        return {
            dirty: props.field?.meta?.dirty ?? false,
        };
    })
</script>

<style>

    .attribute-wrapper {
        background-color: white;
        border-radius: 5px;
        border: 1px solid #ccc;
        display: flex;
        flex-direction: column
    }

    .attribute-wrapper.dirty {
        outline: 3px solid #007bff;
    
    }

    input {
        background-color: none;
        border: none;
    }

    .attribute-wrapper > * {
        flex: 1;
        padding: .2rem .5rem;
    }

</style>