<template>
    <header
        class="card-header d-flex justify-content-between align-items-center py-1 px-3"
        :class="{ 'border-0': !showContent, 'flex-row-reverse': isOwn }"
    >
        <div>
            <slot
                name="author"
                :comment="author"
            >
                <UsernameInfo
                    :user="author"
                    :reversed="isOwn"
                />
            </slot>
        </div>
        <div
            class="small d-flex gap-2 align-content-center"
            :class="isOwn ? 'flex-row-reverse' : 'flex-row'"
        >
            <slot
                name="metadata"
                class="me-2"
                :comment="comment"
            />

            <template v-if="comment.updated_at != comment.created_at">
                <span
                    class="badge bg-light text-dark border d-flex align-items-center"
                    :title="ago(comment.updated_at)"
                >
                    {{ t('global.edited') }}
                </span>
            </template>

            <template v-if="isDeleted">
                <span
                    class="badge bg-light text-dark border d-flex align-items-center"
                    :title="ago(comment.deleted_at)"
                >
                    {{ t('global.deleted') }}
                </span>

                <IconToggleVisibility v-model="showContent" />

            </template>
            <span
                class="text-muted fw-light"
                :title="datestring(comment.created_at)"
            >
                {{ ago(comment.created_at) }}
            </span>

            <Dropdown :options="filteredOptions" aria-label="comment-actions" />
        </div>
    </header>
</template>

<script lang="ts" setup>
    // Types
    import type { DropdownOption } from '§/Dropdown';
    import type { User } from '§/User';
    import type { Comment } from '§/Interaction';

    // Vendor
    import { useI18n } from 'vue-i18n';
    import { faReply, faTrash, faTrashRestore } from '@fortawesome/free-solid-svg-icons';

    // Utils
    import {
        Time,
        User as UserUtils,
    } from 'dhc-utils'

    // Components
    import Dropdown from '@/components/Dropdown/Dropdown.vue';
    import IconToggleVisibility from '@/components/Button/IconToggle/Common/IconToggleVisibility.vue';
    import UsernameInfo from '@/components/User/UsernameInfo.vue';

    // Composables
    import useComment from '@/composables/comment';
    import { computed } from 'vue';

    const datestring = Time.datestring;
    const ago = Time.ago;

    const props = defineProps<{
        edit: boolean,
        comment: Comment,
        activeUser: User,
    }>()
    
    const showContent = defineModel('showContent')

    const emit = defineEmits<{
        (e: 'edit'): void,
        (e: 'reply'): void,
        (e: 'delete'): void,
        (e: 'restore'): void,
    }>();

    const t = useI18n().t

    const {
        author,
        isDeleted,
        isOwn,
    } = useComment(props.comment, props.activeUser);

    const showEditButton = computed(() => {
        return isOwn.value && !props.edit && UserUtils.can(props.activeUser, 'comments_edit');
    });

    const showDeleteButton = computed(() => {
        return !isDeleted.value && isOwn.value && UserUtils.can(props.activeUser, 'comments_delete');
    });
    
    const showRestoreButton = computed(() => {
        return isDeleted.value && isOwn.value && UserUtils.can(props.activeUser, 'comments_delete');
    });

    const showReplyTo = computed(() => {
        return UserUtils.can(props.activeUser, 'comments_create');
    });

    const options: DropdownOption[] = [
        {
            text: t('global.edit'),
            // icon: faEdit,
            action: () => emit('edit'),
            visible: showEditButton.value,
        },
        {
            text: t('global.reply_to'),
            icon: faReply,
            action: () => emit('reply'),
            visible: showReplyTo.value,
        },
        {
            text: t('global.delete'),
            icon: faTrash,
            action: () => emit('delete'),
            visible: showDeleteButton.value,
        },
        {
            text: t('global.restore'),
            icon: faTrashRestore,
            action: () => emit('restore'),
            visible: showRestoreButton.value,
        },
    ]

    const filteredOptions = computed(() => {
        return options.filter(option => option.visible);
    })
</script>