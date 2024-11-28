<template>
    <div
        class="d-flex flex-row flex-wrap gap-2 align-items-center bg-primary bg-opacity-10 px-2 py-1 user-select-none ">
        <template v-for="(commandGroup, index) of commandGroups">
            <button
                v-for="command of commandGroup"
                :key="command.name"
                class="btn border-0 clickable px-1"
                :class="getClassFromCommand(command)"
                @click="command.command"
            >
                <template v-if="command.icons">
                    <div class="icon-group d-flex gap-1">
                        <FontAwesomeIcon
                            v-for="(icon, index) of command.icons"
                            :key="command.name + index"
                            :icon="icon"
                        />
                    </div>
                </template>
                <FontAwesomeIcon
                    v-else-if="command.icon"
                    :icon="command.icon"
                    fixed-width
                />
            </button>

            <separator
                v-if="index !== commandGroups.length - 1"
                :key="`separator-${index}`"
                class="separator align-self-stretch"
            />
        </template>
    </div>
</template>

<script lang="ts" setup>

    import {
        computed,
        reactive,
        toRefs,
    } from 'vue';

    import type { Ref } from 'vue';

    import { useI18n } from 'vue-i18n';

    import {
        toggleEmphasisCommand,
        toggleStrongCommand,
        turnIntoTextCommand,
        wrapInHeadingCommand,
        wrapInBulletListCommand,
        wrapInOrderedListCommand,
        sinkListItemCommand,
        liftListItemCommand,
    } from '@milkdown/preset-commonmark';

    import { toggleStrikethroughCommand } from '@milkdown/preset-gfm';

    import {
        redoCommand,
        undoCommand,
    } from '@milkdown/plugin-history';

    import {
        callCommand,
    } from '@milkdown/utils';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import {
        fa1,
        fa2,
        fa3,
        fa4,
        faBold,
        faH,
        faIndent,
        faItalic,
        faListOl,
        faListUl,
        faOutdent,
        faParagraph,
        faRedo,
        faStrikethrough,
        faUndo
    } from '@fortawesome/free-solid-svg-icons'
    import { faMarkdown } from '@fortawesome/free-brands-svg-icons'

    import Separator from '@/components/Visuals/Separator.vue';
    import { CmdKey, Editor } from '@milkdown/core';
    import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


    const props = defineProps<{
        editor: Editor | undefined;
    }>();

    const emit = defineEmits<{
        (e: 'toggle', value: boolean): void;
    }>();

    // const { t } = useI18n();
    const {
        editor,
    } = toRefs(props);

    // DATA
    const state = reactive({
        mde: computed(() => {
            return editor.value;
        }),
        editMode: false,
    });

    // FUNCTIONS
    const command = (action: CmdKey<any>, data = {}) => {
        if (state.mde) {
            state.mde.action(callCommand(action, data));
        }

    };

    const heading = (i: number) => {
        command(wrapInHeadingCommand.key, i);
    };

    const toggleEditmode = () => {
        state.editMode = !state.editMode;
        emit('toggle', state.editMode);
    };

    type CommandType = {
        name: string,
        command: () => void,
        icon?: IconDefinition,
        icons?: IconDefinition[],
        class?: Ref<string>,
    };

    // As we need to dynamically change classes
    // it's most suitable to pass a computed prop.
    // Therefore we need to extract the value on change
    // so we use this helper function.
    const getClassFromCommand = (command: CommandType) => {
        let cssClass = '';
        if (command.class) {
            let cssClassRef = command.class;
            if (cssClassRef.value) {
                cssClass = cssClassRef.value;
            }
        }

        return cssClass;
    };

    const redoGroup: CommandType[] = [
        {
            name: 'undo',
            command: () => command(undoCommand.key),
            icon: faUndo,
        }, {
            name: 'redo',
            command: () => command(redoCommand.key),
            icon: faRedo,
        },
    ];

    const headingsGroup: CommandType[] = [
        {
            name: 'heading',
            command: () => heading(1),
            icons: [faH, fa1],

        },
        {
            name: 'heading',
            command: () => heading(2),
            icons: [faH, fa2],

        },
        {
            name: 'heading',
            command: () => heading(3),
            icons: [faH, fa3],

        },
        {
            name: 'heading',
            command: () => heading(4),
            icons: [faH, fa4],

        },
        {
            name: 'paragraph',
            command: () => command(turnIntoTextCommand.key),
            icon: faParagraph,

        },
    ];

    const stylingGroup: CommandType[] = [
        {
            name: 'bold',
            command: () => command(toggleStrongCommand.key),
            icon: faBold,

        },
        {
            name: 'italic',
            command: () => command(toggleEmphasisCommand.key),
            icon: faItalic,

        },
        {
            name: 'strikethrough',
            command: () => command(toggleStrikethroughCommand.key),
            icon: faStrikethrough,

        },
    ];

    const listGroup: CommandType[] = [
        {
            name: 'orderlist',
            command: () => command(wrapInOrderedListCommand.key),
            icon: faListOl,

        },
        {
            name: 'bulletlist',
            command: () => command(wrapInBulletListCommand.key),
            icon: faListUl,

        },
        {
            name: 'outdent_item',
            command: () => command(liftListItemCommand.key),
            icon: faOutdent,

        },
        {
            name: 'indent_item',
            command: () => command(sinkListItemCommand.key),
            icon: faIndent,

        },
    ];

    const markdownClass = computed(() => {
        return state.editMode ? 'opacity-50' : '';
    });

    const utilsGroup: CommandType[] = [
        {
            name: 'editmode',
            command: () => toggleEditmode(),
            icon: faMarkdown,
            class: markdownClass
        },
    ];

    const commandGroups = [
        redoGroup,
        headingsGroup,
        stylingGroup,
        listGroup,
        utilsGroup,
    ];
</script>