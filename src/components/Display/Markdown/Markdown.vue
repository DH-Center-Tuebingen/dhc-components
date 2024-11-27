<template>
    <MilkdownProvider>
        <MilkdownEditor
            ref="editorRef"
            :class="classes"
            :data="data"
            :readonly="readonly"
            @update="emitUpdate"
        />
    </MilkdownProvider>
</template>
  
<script lang="ts">
    import {
        ref,
        watch,
    } from 'vue';
    import MilkdownEditor from './MarkdownEditor.vue';
    import { MilkdownProvider } from '@milkdown/vue'; 

    export default {
        components: {
            MilkdownProvider,
            MilkdownEditor,
        },
        props: {
            data: {
                required: true,
                type: String,
            },
            classes: {
                required: false,
                type: String,
                default: 'milkdown-wrapper h-100',
            },
            readonly: {
                required: false,
                type: Boolean,
                default: false,
            },
        },
        emits: ['update'],
        setup(props, context) {
            const getEditorMarkdown = _ => {
                return editorRef.value.getMarkdown();
            };

            const emitUpdate = data => {
                context.emit('update', data);
            };

            const editorRef = ref({});
            watch(_ => props.data, (newData, oldData) => {
                if(editorRef.value && editorRef.value.setMarkdown) {
                    editorRef.value.setMarkdown(newData);
                }
            });

            return {
                editorRef,
                getEditorMarkdown,
                emitUpdate,
            };
        },
    };
</script>