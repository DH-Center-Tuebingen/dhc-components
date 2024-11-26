<template>
    <div
        :class="commentBubbleClasses"
        class="comment-bubble d-flex gap-2"
    >
        <slot
            v-if="showAvatar"
            name="avatar"
            :user="author"
        >
            <UserAvatar
                :user="author"
                :size="avatar"
            />
        </slot>
        <div class="flex-grow-1">
            <div class="card">
                <CommentHeader
                    v-if="showHeader"
                    :activeUser="activeUser"
                    :comment="comment"
                    :edit="state.editing"
                    :showHeader="showHeader"
                    v-model:showContent="showContent"
                    @reply="() => emit('reply', comment)"
                    @edit="() => edit()"
                    @delete="() => emit('delete', comment.id)"
                    @restore="() => emit('restore', comment.id)"
                />
                <div v-if="!isMetadataEmpty">
                    <slot
                        v-if="!isDeleted && state.editing"
                        name="body-editing"
                        :comment="comment"
                        :content="state.editContent"
                    >
                        <div class="card-body px-3 py-2">
                            <AutoResizeTextArea v-model="state.editContent" />
                            <div class="d-flex flex-row justify-content-end gap-2 mt-2">

                                <button
                                    type="button"
                                    class="btn btn-outline-secondary btn-sm"
                                    @click="disableEditing()"
                                >
                                    {{ t('global.cancel') }}
                                </button>
                                <LoadingButton
                                    :loading="state.saveEdit"
                                    :disabled="state.editContent == comment.content"
                                    :small="true"
                                    class="px-5"
                                    @click="saveEdit(state.editContent)"
                                    color="primary"
                                >
                                    {{ t('global.save') }}
                                </LoadingButton>
                            </div>
                        </div>
                    </slot>
                    <slot
                        name="body"
                        :comment="comment"
                    >
                        <!-- eslint-disable vue/no-v-html -->
                        <div
                            v-if="comment.content && showContent && !state.editing"
                            class="card-body px-3 py-2"
                            style="white-space: pre-line;"
                            v-html="formattedComment"
                        >
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
                                t('global.comments.hide_reply', {
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
                                t('global.comments.show_reply', {
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

<script lang="ts" setup>
    // Types
    import type { User as UserType } from '§/User';
    import { Comment } from '§/Interaction';

    // Vendor
    import {
        computed,
        reactive,
        ref,
    } from 'vue';
    import { useI18n } from 'vue-i18n';

    // Composables
    import useComment from '@/composables/comment';

    // Components
    import CommentHeader from './CommentHeader.vue';
    import UserAvatar from '@/components/User/UserAvatar.vue';
    import AutoResizeTextArea from '@/components/Form/TextArea/AutoResizeTextArea.vue';
    import LoadingButton from '@/components/Button/LoadingButton/LoadingButton.vue';

    const props = withDefaults(defineProps<{
        activeUser: UserType;
        comment: Comment;
        avatar?: number;
        readOnly?: boolean;
        showAvatar?: boolean;
        showHeader?: boolean;
    }>(), {
        readOnly: false,
        showAvatar: true,
        showHeader: true,
        avatar: 42,
    });

    const emit = defineEmits<{
        (e: 'save', content: string, saved: Function): void,
        (e: 'reply', comment: Comment): void,
        (e: 'delete', id: number): void,
        (e: 'restore', id: number): void,
        (e: 'toggle-replies', open: boolean): void,
    }>();

    const state = reactive({
        editing: false,
        editContent: '',
        repliesOpen: false,
        saveEdit: false,
    });

    const isMetadataEmpty = computed(() => {
        return props.comment.metadata && props.comment.metadata.is_empty;
    });

    const toggleReplies = () => {
        state.repliesOpen = !state.repliesOpen;
        emit('toggle-replies', state.repliesOpen);
    };

    const repliesCount = computed(() => {
        return props.comment?.replies_count ?? 0;
    });

    const {
        author,
        isDeleted,
        isOwn,
        formattedComment,
    } = useComment(props.comment, props.activeUser);

    const commentBubbleClasses = computed(() => {
        return {
            'opacity-50': isDeleted.value,
            'flex-row-reverse': isOwn.value,
        };
    });

    const t = useI18n().t;

    const showContent = ref(!isDeleted.value);

    const edit = () => {
        state.editContent = props.comment.content;
        state.editing = true
    };
    const disableEditing = () => state.editing = false;
    const savedCallback = () => {
        disableEditing();
        state.saveEdit = false;
    };
    const saveEdit = async (composedMessage: string) => {
        state.saveEdit = true;
        emit('save', composedMessage, savedCallback);
    };

    defineExpose({
        edit,
    });
</script>