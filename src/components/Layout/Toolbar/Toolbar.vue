<template>
    <div
        class="d-flex flex-row flex-wrap gap-2 align-items-center bg-primary bg-opacity-10 px-2 user-select-none rounded">
        <template v-for="(toolGroup, index) of toolGroups">
            <IconButton
                v-for="tool of toolGroup"
                :key="tool.name"
                class="btn border-0 clickable px-1"
                :icon="tool.icon"
                :icons="tool.icons"
                :disabled="tool.disabled"
                :title="tool.title"
                :button-class="getClassFromTool(tool)"
                :fixed-width="true"
                @action="tool.action"
            />

            <Spacer
                v-if="index !== toolGroups.length - 1"
                :key="`separator-${index}`"
                class="align-self-stretch border-secondary border-opacity-25"
            />
        </template>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import { Tool } from './definitions';

    import IconButton from '@/components/Button/IconButton/IconButton.vue';
    import Spacer from '@/components/Layout/Spacer/Spacer.vue';

    defineProps<{
        toolGroups: Tool[][];
    }>();

    // As we need to dynamically change classes
    // it's most suitable to pass a computed prop.
    // Therefore we need to extract the value on change
    // so we use this helper function.
    const getClassFromTool = (tool: Tool) => {
        let cssClass = '';
        if(tool.class) {
            let cssClassRef = tool.class;
            if(cssClassRef.value) {
                cssClass = cssClassRef.value;
            }
        }

        return cssClass;
    };

</script>