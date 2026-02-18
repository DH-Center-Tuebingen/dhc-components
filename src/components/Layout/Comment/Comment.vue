<template>
    <div
        class="d-flex gap-3 comment sans-serif"
        :class="alternate ? 'flex-row-reverse' : 'flex-row'"
    >
        <slot
            name="avatar"
            :user="data.author"
        >
            <a href="#">
                <Avatar
                    :name="data.author.name"
                    :size="48"
                />
            </a>
        </slot>
        <div class="position-relative flex-grow-1 bg-white rounded-3 px-3 py-2 mw-75">
            <div class="d-flex flex-column">
                <div
                    class="d-flex justify-content-between"
                    :class="alternate ? 'flex-row-reverse' : 'flex-row'"
                >
                    <slot
                        name="author"
                        :comment="data.author"
                    >
                        <div
                            class="d-flex align-items-center mb-2"
                            :class="alternate ? 'flex-row-reverse' : 'flex-row'"
                        >
                            <!-- @click.prevent="showUserInfo(data.author)" -->
                            <a
                                href="#"
                                class="text-body text-decoration-none lh-1 pt-1"
                            >
                                <span
                                    class="fw-bold"
                                    :style="`color: ${getUserColor(data.author.name)}`"
                                >
                                    {{ data.author.name }}
                                </span>
                                <!-- &bull;
                                <span class="text-muted fw-light">
                                    {{ data.author.nickname }}
                                </span> -->
                            </a>
                        </div>
                    </slot>
                    <div class="small">
                        <slot
                            name="metadata"
                            class="me-2"
                            :comment="data"
                        />
                        <!-- <span
                            v-if="!data.deleted_at && (showEditButton() || showDeleteButton() || showReplyTo)"
                            class="dropdown ms-1"
                        >
                            <span
                                :id="`edit-comment-dropdown-${data.id}`"
                                class="clickable"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i class="fas fa-fw fa-ellipsis-h" />
                            </span>
                            <div
                                class="dropdown-menu"
                                :aria-labelledby="`edit-comment-dropdown-${data.id}`"
                            >
                                <a
                                    v-if="showEditButton()"
                                    class="dropdown-item"
                                    href="#"
                                    @click.prevent="enableEditing()"
                                >
                                    <i class="fas fa-fw fa-edit text-info" /> {{ t('global.edit') }}
                                </a>
                                <a
                                    v-if="showReplyTo"
                                    class="dropdown-item"
                                    href="#"
                                    @click.prevent="setReplyTo()"
                                >
                                    <i class="fas fa-fw fa-reply text-success" /> {{ t('global.reply_to') }}
                                </a>
                                <a
                                    v-if="showDeleteButton()"
                                    class="dropdown-item"
                                    href="#"
                                    @click.prevent="handleDelete()"
                                >
                                    <i class="fas fa-fw fa-trash text-danger" /> {{ t('global.delete') }}
                                </a>
                            </div>
                        </span> -->
                    </div>
                </div>
                <div class="d-flex flex-row">
                    <div
                        v-if="!emptyMetadata"
                        class=""
                        :class="{
                            'w-fit': !editMode.enabled && !answerMode.enabled,
                            'w-100': editMode.enabled || answerMode.enabled,
                            'ms-auto': alternate
                        }"
                    >
                        <slot
                            v-if="!isDeleted && editMode.enabled"
                            name="body-editing"
                            :comment="data"
                            :content="editMode.content"
                        >
                            <div class="my-1 pb-3">
                                <textarea
                                    v-model="editMode.content"
                                    class="form-control lh-1"
                                    style="height: 5em;"
                                />
                                <div class="mt-2 d-flex flex-row align-items-center justify-content-end gap-2">
                                    <button
                                        type="button"
                                        class="btn btn-outline-secondary btn-sm py-0"
                                        @click="cancelEditing()"
                                    >
                                        <FontAwesomeIcon :icon="faTimes" />
                                        {{ t('global.cancel') }}
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-outline-success btn-sm py-0"
                                        :disabled="editMode.content == data.content"
                                        @click="handleEdit()"
                                    >
                                        <FontAwesomeIcon :icon="faSave" />
                                        {{ t('global.save') }}
                                    </button>
                                </div>
                            </div>
                        </slot>
                        <slot
                            v-else-if="!isDeleted"
                            name="body"
                            :comment="data"
                        >
                            <div
                                v-if="data.content"
                                ref="contentRef"
                                class="white-space-pre lh-1 pb-1"
                                :class="alternate ? 'text-end' : 'text-start'"
                                :style="contentStyles"
                                @click="toggleHiddenContent"
                            >
                                {{ mentionify(data.content) }}
                            </div>
                        </slot>
                        <slot
                            v-else
                            name="body-deleted"
                            :comment="data"
                        >
                            <p class="text-body-tertiary fst-italic">
                                {{ t('deleted_info') }}
                            </p>
                        </slot>
                        <slot
                            v-if="!isDeleted && !editMode.enabled && answerMode.enabled"
                            name="reply-to"
                            :comment="data"
                            :content="answerMode.content"
                        >
                            <div class="my-1 pb-3">
                                <textarea
                                    v-model="answerMode.content"
                                    class="form-control lh-1"
                                    style="height: 5em;"
                                />
                                <div class="mt-2 d-flex flex-row align-items-center justify-content-end gap-2">
                                    <button
                                        type="button"
                                        class="btn btn-outline-secondary btn-sm py-0"
                                        @click="cancelReply()"
                                    >
                                        <FontAwesomeIcon :icon="faTimes" />
                                        {{ t('global.cancel') }}
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-outline-success btn-sm py-0"
                                        :disabled="answerMode.content.length == 0"
                                        @click="handleReply()"
                                    >
                                        <FontAwesomeIcon :icon="faPaperPlane" />
                                        {{ t('send') }}
                                    </button>
                                </div>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>

            <span
                class="position-absolute bottom-0 px-2 py-1 fw-light smaller text-body-tertiary d-flex flex-row gap-1"
                :class="alternate ? 'start-0' : 'end-0'"
                :title="date2string(data.updated_at)"
            >
                {{ ago(data.updated_at) }}
                <span
                    v-if="data.updated_at != data.created_at"
                    class="d-flex flex-row gap-1"
                >
                    <span>&bull;</span>
                    <span>{{ t('global.edited') }}</span>
                </span>
            </span>
            <!-- <comment-list
                v-if="state.repliesOpen[comment.id] && comment.replies"
                :comments="comment.replies"
                :hide-button="true"
                :post-form="false"
                :disabled="disabled"
                :avatar="avatar"
                :resource="resource"
                :post-url="postUrl"
                :edit-url="editUrl"
                :delete-url="deleteUrl"
                :reply-url="replyUrl"
                :classes="classes"
                :list-classes="listClasses"
            /> -->
            <span
                v-if="data.replies_count > 0"
                class="position-absolute start-50 end-50"
            >
                <FabButton
                    :active="true"
                    :icon="displayReplies ? faMinus : faPlus"
                    size="xs"
                    color="secondary"
                    @action="toggleReplies"
                />
            </span>
        </div>
        <slot
            v-if="!isDeleted && !editMode.enabled"
            name="options"
            :comment="data"
        >
            <div class="d-flex flex-row align-items-center gap-2 text-body-tertiary show-on-hover">
                <a
                    v-if="allowedActions.reply"
                    :title="t('reply')"
                    href="#"
                    class="btn btn-sm p-0 bg-none badge text-reset"
                    @click.prevent="setReplyTo()"
                >
                    <FontAwesomeIcon :icon="faReply" />
                </a>
                <!-- &bull; -->
                <a
                    v-if="allowedActions.edit"
                    :title="t('global.edit')"
                    href="#"
                    class="btn btn-sm p-0 bg-none badge text-reset"
                    @click.prevent="setEditMode()"
                >
                    <FontAwesomeIcon :icon="faEdit" />
                </a>
                <!-- &bull; -->
                <a
                    v-if="allowedActions.delete"
                    :title="t('global.delete')"
                    href="#"
                    class="btn btn-sm p-0 bg-none badge text-reset"
                    @click.prevent="confirmDelete()"
                >
                    <FontAwesomeIcon :icon="faTrashAlt" />
                </a>
            </div>
        </slot>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import {
        CSSProperties,
        computed,
        ref,
    } from 'vue';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import {
        faEdit,
        faMinus,
        faPaperPlane,
        faPlus,
        faReply,
        faSave,
        faTimes,
        faTrashAlt,
    } from '@fortawesome/free-solid-svg-icons';

    import { initI18n } from '@/i18n/i18n';

    import Avatar from '../../Display/Avatar/Avatar.vue';
    import FabButton from '../../Button/FabButton/FabButton.vue';

    import { ago, date2string } from '@/utils/date';
    import { getUserColor } from '@/utils/user';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { CommentProps } from './definitions';

    const props = withDefaults(defineProps<CommentProps>(), {
        alternate: false,
        allowedActions: () => ({
            edit: true,
            delete: true,
            reply: true,
        })
    });

    const emits = defineEmits<{
        (e: 'edit', content: string): void;
        (e: 'delete'): void;
        (e: 'reply', content: string): void;
        (e: 'toggle-replies', status: boolean): void;
    }>();

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages, true);
    const t = i18n.global.t;

    const contentRef = ref<HTMLDivElement | null>(null);

    const editMode = ref({
        enabled: false,
        content: '',
    });

    const answerMode = ref({
        enabled: false,
        content: '',
    });

    const displayReplies = ref(false);

    const showHiddenContent = ref(false);

    const isDeleted = computed(() => props.data.deleted_at !== null);

    const hasHiddenContent = computed(() => {
        if(!contentRef.value) { return false; }
        // A magic 2px offset is needed, because of different css rounding behaviour
        return contentRef.value.scrollHeight > contentRef.value.clientHeight + 2;
    });

    const contentStyles = computed(() => {
        const styles: CSSProperties = {
            'max-height': showHiddenContent.value ? '' : '5em',
            // 'overflow': 'hidden',
        };
        if(hasHiddenContent.value && !showHiddenContent.value) {
            styles['mask-image'] = 'linear-gradient(180deg, #000 60%, transparent)';
        }
        return styles;
    });

    const setReplyTo = () => {
        answerMode.value.enabled = true;
        answerMode.value.content = '';
    };

    const cancelReply = () => {
        answerMode.value.enabled = false;
        answerMode.value.content = '';
    };

    const handleReply = () => {
        console.log('handleReply');
        emits('reply', answerMode.value.content);
        cancelReply();
    };

    const setEditMode = () => {
        editMode.value.enabled = true;
        editMode.value.content = props.data.content;
    };

    const cancelEditing = () => {
        editMode.value.enabled = false;
        editMode.value.content = '';
    };

    const handleEdit = () => {
        console.log('handleEdit');
        emits('edit', editMode.value.content);
        cancelEditing();
    };

    const confirmDelete = () => {
        console.log('confirmDelete');
    };

    const toggleReplies = () => {
        displayReplies.value = !displayReplies.value;
        emits('toggle-replies', displayReplies.value);
    };

    const toggleHiddenContent = () => {
        showHiddenContent.value = !showHiddenContent.value;
    };

    const emptyMetadata = false; // TODO

    // TODO
    const mentionify = (text: string) => {
        return text;
    };
</script>

<style
    lang="scss"
    scoped
>
    @use "@scss/utils/size";

    .white-space-pre {
        white-space: pre;
    }

    .comment:not(:hover) .show-on-hover {
        display: none !important;
    }
    .comment:hover .show-on-hover {
        display: flex;
    }
</style>