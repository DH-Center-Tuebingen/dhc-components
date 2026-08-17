<template>
    <div>
        <label for="input">{{ label }}</label>
        <input
            id="input"
            type="text"
            v-model="modelValue"
        />
    </div>
</template>

<script lang='ts' setup>
    type TextWithIcon = {
        text: string;
        icon: string;
    }
    
    defineProps<{
        label: TextWithIcon;
    }>()
    
    const modelValue = defineModel<string>({
        required: true
    })

</script>
