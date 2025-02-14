<template>
    <textarea
        class="auto-text-area form-control"
        ref="textarea"
        :value="modelValue"
        style="resize: none;"
        @input="onInput"
    />
</template>

<script setup lang="ts">
    import { nextTick } from 'process';
    import { onMounted, useTemplateRef } from 'vue';

    const model = defineModel({
        type: String,
        required: true,
    });
    
    const props = defineProps<{
        maxHeight: number;
    }>();

    const textarea = useTemplateRef<HTMLElement>('textarea');

    onMounted(() => {
        /**
         * We need to wait for 
         */
        requestAnimationFrame(() => {
            nextTick(() => {
                autoExpand();
            });
        });
    });

    const autoExpand = () => {
        if (textarea.value) {           
            textarea.value.style.overflow = 'hidden';
            textarea.value.style.height = '0';
            textarea.value.style.height = (textarea.value.scrollHeight + 2) + 'px';
            textarea.value.style.overflow = 'auto';

            if(props.maxHeight)
                {textarea.value.style.maxHeight = props.maxHeight + 'px';}
        }
    };

    const onInput = (event: Event) => {
        const target = event.target as HTMLTextAreaElement;
        model.value = target.value;
        autoExpand();
    };
</script>