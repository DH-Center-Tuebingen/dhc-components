<template>
    <AttributeWrapper :name="name" :field="field" :value="value" :errorMessage="''">
        <input
            v-model="value"
            type="number"
        />
    </AttributeWrapper>
</template>

<script lang="ts" setup>
    import AttributeWrapper from './AttributeWrapper.vue';
    import { useAttribute } from '@/composables/attribute';

    const activeValue = defineModel<number>();

    const props = defineProps<{
        name: string,
    }>();


    const { value, field, isDirty } = useAttribute(props.name, activeValue);

</script>