<template>
    <Toolbar
        :toolGroups="toolGroups"
    />
</template>

<script
    lang="ts"
    setup
>
    import {
        computed,
        reactive,
        toRefs,
    } from 'vue';

    import { useI18n } from 'vue-i18n';
    const { t } = useI18n();

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
    } from '@fortawesome/free-solid-svg-icons';
    import { faMarkdown } from '@fortawesome/free-brands-svg-icons';

    import { CmdKey, Editor } from '@milkdown/core';
    import { default as Toolbar, Tool } from '@/components/Layout/Toolbar/Toolbar.vue';

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
        if(state.mde) {
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

    const redoGroup: Tool[] = [
        {
            name: 'undo',
            action: () => command(undoCommand.key),
            icon: faUndo,
        }, {
            name: 'redo',
            action: () => command(redoCommand.key),
            icon: faRedo,
        },
    ];

    const headingsGroup: Tool[] = [
        {
            name: 'heading',
            action: () => heading(1),
            icon: [faH, fa1],
        },
        {
            name: 'heading',
            action: () => heading(2),
            icon: [faH, fa2],
        },
        {
            name: 'heading',
            action: () => heading(3),
            icon: [faH, fa3],
        },
        {
            name: 'heading',
            action: () => heading(4),
            icon: [faH, fa4],
        },
        {
            name: 'paragraph',
            action: () => command(turnIntoTextCommand.key),
            icon: faParagraph,
        },
    ];

    const stylingGroup: Tool[] = [
        {
            name: 'bold',
            action: () => command(toggleStrongCommand.key),
            icon: faBold,
        },
        {
            name: 'italic',
            action: () => command(toggleEmphasisCommand.key),
            icon: faItalic,
        },
        {
            name: 'strikethrough',
            action: () => command(toggleStrikethroughCommand.key),
            icon: faStrikethrough,
        },
    ];

    const listGroup: Tool[] = [
        {
            name: 'orderlist',
            action: () => command(wrapInOrderedListCommand.key),
            icon: faListOl,
        },
        {
            name: 'bulletlist',
            action: () => command(wrapInBulletListCommand.key),
            icon: faListUl,
        },
        {
            name: 'outdent_item',
            action: () => command(liftListItemCommand.key),
            icon: faOutdent,
        },
        {
            name: 'indent_item',
            action: () => command(sinkListItemCommand.key),
            icon: faIndent,
        },
    ];

    const markdownClass = computed(() => {
        return state.editMode ?  'opacity-50': 'text-primary';
    });

    const utilsGroup: Tool[] = [
        {
            name: 'editmode',
            action: () => toggleEditmode(),
            icon: faMarkdown,
            class: markdownClass
        },
    ];

    const toolGroups = [
        redoGroup,
        headingsGroup,
        stylingGroup,
        listGroup,
        utilsGroup,
    ];
</script>