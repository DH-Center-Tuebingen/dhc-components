<template>
    <MilkdownProvider>
        <MilkdownEditor
            ref="editorRef"
            :class="classes"
            :data="data"
            :readonly="readonly"
            :additional-tools="additionalTools"
            @update="emitUpdate"
        />
    </MilkdownProvider>
</template>

<script lang="ts">
    import {
        ref,
        watch,
    } from 'vue';

    import { Tool } from '@/components/Layout/Toolbar/definitions';
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
            additionalTools: {
                required: false,
                type: Array<Tool>,
            },
        },
        emits: ['update'],
        setup(props, context) {
            const getEditorMarkdown = () => {
                if (editorRef.value) {return editorRef.value.getMarkdown();}
                return '';
            };

            const emitUpdate = (data: string) => {
                context.emit('update', data);
            };

            const editorRef = ref<InstanceType<typeof MilkdownEditor>>();
            watch(() => props.data, (newData, oldData) => {
                if (editorRef.value && editorRef.value.setMarkdown) {
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