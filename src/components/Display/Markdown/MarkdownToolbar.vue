<template>
    <div class="d-flex flex-row flex-wrap gap-2 align-items-center bg-primary bg-opacity-10 px-2 py-1 user-select-none ">
        <template v-for="(commandGroup, index) of commandGroups">
            <button
                v-for="command of commandGroup"
                :key="command.name"
                class="btn border-0 clickable px-1"
                :class="getClassFromCommand(command)"
                @click="command.command"
            >
                <template v-if="Array.isArray(command.icon)">
                    <div class="icon-group d-flex gap-1">
                        <FontAwesomeIcon
                            v-for="icon of command.icon"
                            :key="icon"
                            :icon="icon"
                        />
                    </div>
                </template>
                <FontAwesomeIcon
                    v-else
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
    import { fa1, fa2, fa3, fa4, faBold, faH, faIndent, faItalic, faListOl, faListUl, faOutdent, faParagraph, faRedo, faStrikethrough, faUndo } from '@fortawesome/free-solid-svg-icons'
    import { faMarkdown } from '@fortawesome/free-brands-svg-icons'

    import Separator from '@/components/Visuals/Separator.vue';


    const props = defineProps<{
        editor: Object
    }>();

    const emit = defineEmits<{
        (e: 'toggle', value: boolean): void;
    }>();

    const { t } = useI18n();
    const {
        editor,
    } = toRefs(props);

    // DATA
    const state = reactive({
        mde: computed(_ => {
            return editor.value;
        }),
        editMode: false,
    });

    // FUNCTIONS
    const command = (action :string, data = {}) => {
        state.mde.action(callCommand(action, data));
    };

    const heading = i => {
        command(wrapInHeadingCommand.key, i);
    };

    const toggleEditmode = () => {
        state.editMode = !state.editMode;
        emit('toggle', state.editMode);
    };

    // As we need to dynamically change classes
    // it's most suitable to pass a computed prop.
    // Therefore we need to extract the value on change
    // so we use this helper function.
    const getClassFromCommand = command => {
        let cssClass = '';
        if (command.class) {
            cssClass = command.class;
            if (cssClass.value) {
                cssClass = cssClass.value;
            }
        }

        return cssClass;
    };

    const redoGroup = [
        {
            name: 'undo',
            command: _ => command(undoCommand.key),
            icon: faUndo,
        }, {
            name: 'redo',
            command: _ => command(redoCommand.key),
            icon: faRedo,
        },
    ];

    const headingsGroup = [
        {
            name: 'heading',
            command: _ => heading(1),
            icon: [faH, fa1],

        },
        {
            name: 'heading',
            command: _ => heading(2),
            icon: [faH, fa2],

        },
        {
            name: 'heading',
            command: _ => heading(3),
            icon: [faH, fa3],

        },
        {
            name: 'heading',
            command: _ => heading(4),
            icon: [faH, fa4],

        },
        {
            name: 'paragraph',
            command: _ => command(turnIntoTextCommand.key),
            icon: faParagraph,

        },
    ];

    const stylingGroup = [
        {
            name: 'bold',
            command: _ => command(toggleStrongCommand.key),
            icon: faBold,

        },
        {
            name: 'italic',
            command: _ => command(toggleEmphasisCommand.key),
            icon: faItalic,

        },
        {
            name: 'strikethrough',
            command: _ => command(toggleStrikethroughCommand.key),
            icon: faStrikethrough,

        },
    ];

    const listGroup = [
        {
            name: 'orderlist',
            command: _ => command(wrapInOrderedListCommand.key),
            icon: faListOl,

        },
        {
            name: 'bulletlist',
            command: _ => command(wrapInBulletListCommand.key),
            icon: faListUl,

        },
        {
            name: 'outdent_item',
            command: _ => command(liftListItemCommand.key),
            icon: faOutdent,

        },
        {
            name: 'indent_item',
            command: _ => command(sinkListItemCommand.key),
            icon: faIndent,

        },
    ];

    const markdownClass = computed(_ => {
        return state.editMode ? 'opacity-50' : '';
    });

    const utilsGroup = [
        {
            name: 'editmode',
            command: _ => toggleEditmode(),
            icon:  faMarkdown,
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