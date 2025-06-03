<template>
    <div
        class="d-flex flex-row flex-wrap gap-2 align-items-center bg-primary bg-opacity-10 px-2 user-select-none rounded">
        <template v-for="(toolGroup, index) of toolGroups">
            <button
                v-for="tool of toolGroup"
                :key="tool.name"
                class="btn border-0 clickable px-1"
                :class="getClassFromTool(tool)"
                @click="tool.action"
            >
                <template v-if="tool.icons">
                    <div class="icon-group d-flex gap-1">
                        <FontAwesomeIcon
                            v-for="(icon, index) of tool.icons"
                            :key="tool.name + index"
                            :icon="icon"
                        />
                    </div>
                </template>
                <FontAwesomeIcon
                    v-else-if="tool.icon"
                    :icon="tool.icon"
                    fixed-width
                />
            </button>

            <Separator
                v-if="index !== toolGroups.length - 1"
                :key="`separator-${index}`"
                class="separator align-self-stretch border-secondary border-opacity-25"
            />
        </template>
    </div>
</template>

<script
    setup
    lang="ts"
>

    import type { Ref } from 'vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

    import Separator from '@/components/Visuals/Separator.vue';

    export type Tool = {
        name: string,
        action: () => void,
        icon?: IconDefinition,
        icons?: IconDefinition[],
        class?: Ref<string>,
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