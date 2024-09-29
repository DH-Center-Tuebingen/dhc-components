<template>
    <div
        :class="commentBubbleClasses"
        class="comment-bubble d-flex"
    >
        <slot
            v-if="showAvatar"
            name="avatar"
            :user="author"
        >
            <UserAvatar
                :user="author"
                :size="avatar"
                class="me-2"
            />
        </slot>
        <div class="flex-grow-1">
            <div class="card">
                <header
                    v-if="showHeader"
                    class="card-header d-flex flex-row justify-content-between align-items-center py-1 px-3"
                    :class="{ 'border-0': !comment.content }"
                >
                    <div>
                        <slot
                            name="author"
                            :comment="author"
                        >
                            <UsernameInfo :user="author" />
                        </slot>
                    </div>
                    <div class="small">
                        <slot
                            name="metadata"
                            class="me-2"
                            :comment="comment"
                        />
                        <template v-if="comment.updated_at != comment.created_at">
                            <span class="badge bg-light text-dark border">
                                {{ t('global.edited') }}
                            </span>
                            &bull;
                        </template>
                        <span
                            class="text-muted fw-light"
                            :title="datestring(comment.updated_at)"
                        >
                            {{ ago(comment.updated_at) }}
                        </span>
                        <span
                            v-if="!readOnly && !isDeleted() && hasActiveCommands"
                            class="dropdown ms-1"
                        >
                            <span
                                :id="`edit-comment-dropdown-${comment.id}`"
                                class="clickable ms-2 user-select-none"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i class="fas fa-lg fa-fw fa-ellipsis-h" />
                            </span>
                            <div
                                class="dropdown-menu dropdown-menu-end"
                                :aria-labelledby="`edit-comment-dropdown-${comment.id}`"
                            >
                                <a
                                    v-if="showEditButton()"
                                    class="dropdown-item"
                                    href="#"
                                    @click.prevent="enableEditing(comment)"
                                >
                                    <i class="fas fa-fw fa-edit text-info" /> {{ t('global.edit') }}
                                </a>
                                <a
                                    v-if="showReplyTo()"
                                    class="dropdown-item"
                                    href="#"
                                    @click.prevent="replyTo(comment)"
                                >
                                    <i class="fas fa-fw fa-reply text-primary" /> {{ t('global.reply_to') }}
                                </a>
                                <a
                                    v-if="showDeleteButton()"
                                    class="dropdown-item"
                                    href="#"
                                    @click.prevent="handleDelete(comment)"
                                >
                                    <i class="fas fa-fw fa-trash text-danger" /> {{ t('global.delete') }}
                                </a>
                            </div>
                        </span>
                    </div>
                </header>
                <div v-if="!emptyMetadata()">
                    <slot
                        v-if="!isDeleted() && state.editing"
                        name="body-editing"
                        :comment="comment"
                        :content="state.editContent"
                    >
                        <div class="card-body px-3 py-2">
                            <textarea
                                v-model="state.editContent"
                                class="form-control"
                            />
                            <div class="mt-1 d-flex flex-row justify-content-end">
                                <button
                                    type="button"
                                    class="btn btn-success btn-sm me-2"
                                    :disabled="state.editContent == comment.content"
                                    @click="handleEdit( state.editContent)"
                                >
                                    <i class="fas fa-fw fa-save" /> {{ t('global.save') }}
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    @click="disableEditing()"
                                >
                                    <i class="fas fa-fw fa-times" /> {{ t('global.cancel') }}
                                </button>
                            </div>
                        </div>
                    </slot>
                    <slot
                        v-else-if="!isDeleted()"
                        name="body"
                        :comment="comment"
                    >
                        <div
                            v-if="comment.content"
                            class="card-body px-3 py-2"
                        >-->
                            <!-- TODO; Here we insert user input into the comment. This is bad!-->
                            <!-- eslint-disable vue/no-v-html -->
                            <p
                                class="card-text"
                                v-html="mentionify(comment.content)"
                            />
                            <!-- eslint-enable vue/no-v-html -->
                        </div>
                    </slot>
                    <slot
                        v-else
                        name="body-deleted"
                        :comment="comment"
                    >
                        <div
                            class="card-body px-3 py-2"
                            style="opacity: 0.75;"
                        >
                            <p class="card-text fst-italic">
                                {{ t('global.comments.deleted_info') }}
                            </p>
                        </div>
                    </slot>
                </div>
                <footer>
                    <slot
                        name="footer"
                        :comment="comment"
                    />
                </footer>
            </div>
            <div
                v-if="repliesCount > 0"
                class="d-flex flex-row justify-content-end"
            >
                <a
                    href="#"
                    class="small text-body"
                    @click.prevent="toggleReplies()"
                >
                    <div v-show="state.repliesOpen">
                        <span>
                            {{
                                t('global.comments.hide_reply', repliesCount, {
                                    cnt:
                                        repliesCount
                                })
                            }}
                        </span>
                        <i class="fas fa-fw fa-caret-up" />
                    </div>
                    <div v-show="!state.repliesOpen">
                        <span>
                            {{
                                t('global.comments.show_reply', repliesCount, {
                                    cnt:
                                        repliesCount
                                })
                            }}
                        </span>
                        <i class="fas fa-fw fa-caret-down" />
                    </div>
                </a>
            </div>

            <div v-if="state.repliesOpen">
                <slot
                    name="replies"
                    :comment="comment"
                />
            </div>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup
>

    import {
        computed,
        defineComponent,
        reactive,
    } from 'vue';

    // import {
    //     ago,
    //     datestring,
    //     mentionify,
    // } from '@/helpers/filters.js';

    import {
        Time,
    } from 'dhc-utils'
    const datestring = Time.datestring;
    const ago = Time.ago;

    import { useI18n } from 'vue-i18n';

    // import UserAvatar from '../../user/UserAvatar.vue';
    // import UsernameInfo from '../../user/UsernameInfo.vue';
    // import { can } from '../../../helpers/helpers';
    // import { emit } from 'process';

    import UserAvatar from '@/components/User/UserAvatar.vue';
    import UsernameInfo from '@/components/User/UsernameInfo.vue';
    import type { User as UserType } from 'src/types/User';
    import { Comment } from 'src/types/Interaction';
    import { User } from 'dhc-utils';


    const props = withDefaults(defineProps<{
        activeUser: UserType;
        avatar: number;
        comment: Comment;
        readOnly: boolean;
        showAvatar: boolean;
        showHeader: boolean;
    }>(), {
        readOnly: false,
        showAvatar: true,
        showHeader: true,
        default: 42,
    });

    const emit = defineEmits<{
        edit: [Comment, string];
        delete: [id: number];
        reply: [Comment];
        'toggle-replies': [boolean];
    }>()


    const state = reactive({
        editing: false,
        editContent: '',
        repliesOpen: false,
    });

    const isDeleted = () => {
        return !!props.comment.deleted_at;
    };

    const isOwn = () => {
        return props.activeUser.id === props.comment.author.id;
    };

    const emptyMetadata = () => {
        return props.comment.metadata && props.comment.metadata.is_empty;
    };

    const toggleReplies = () => {
        state.repliesOpen = !state.repliesOpen;
        emit('toggle-replies', state.repliesOpen);
    };

    const repliesCount = computed(() => {
        return props.comment?.replies_count ?? 0;
    });

    const handleDelete = () => {
        emit('delete', props.comment.id);
    };

    const showEditButton = () => {
        return isOwn() && !state.editing && User.can('comments_edit');
    };

    const showDeleteButton = () => {
        return isOwn() && User.can('comments_delete');
    };

    const disableEditing = () => {
        state.editing = false;
    };

    const enableEditing = () => {
        state.editing = true;
        state.editContent = props.comment.content;
    };

    const handleEdit = async (composedMessage:string) => {
        disableEditing();
        emit('edit', props.comment, composedMessage);
    };

    const showReplyTo = () => {
        return User.can('comments_create');
    };

    const replyTo = () => {
        emit('reply', props.comment);
    };

    const author = computed(() => {
        return props.comment?.author ?? {
            id: 0,
            nickname: 'Unknown',
        };
    });

    const hasActiveCommands = computed(() => {
        return showEditButton() || showDeleteButton() || showReplyTo();
    });

    const commentBubbleClasses = computed(() => {
        return {
            'opacity-50': isDeleted(),
        };
    });

    const t = useI18n().t;

</script>