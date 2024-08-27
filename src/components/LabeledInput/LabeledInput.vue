<template>
    <div>
        <label for="input">{{ label }}</label>
        <input
            id="input"
            type="text"
            v-model="value"
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
    
    defineModel<string>('value', {
        required: true
    })

</script>
