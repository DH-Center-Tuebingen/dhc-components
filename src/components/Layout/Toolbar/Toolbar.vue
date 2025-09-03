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
    import type { Ref } from 'vue';
    import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
    import { StackedIcon } from '@/components/Layout/StackedIcon/definitions';

    import IconButton from '@/components/Button/IconButton/IconButton.vue';
    import Spacer from '@/components/Layout/Spacer/Spacer.vue';

    export type Tool = {
        name: string,
        action: () => void,
        icon?: IconDefinition | IconDefinition[],
        icons?: StackedIcon,
        class?: Ref<string>,
        disabled?: boolean
        title?: string
    };

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