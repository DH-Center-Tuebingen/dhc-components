<template>
    <div class="d-flex">
        <slot
            name="avatar"
            :user="data.author"
        >
            <a
                href="#"
            >
                <Avatar
                    :name="data.author.name"
                    :size="48"
                />
            </a>
        </slot>
        <div class="ms-3 flex-grow-1">
            <div class="d-flex flex-column">
                <div
                    class="d-flex flex-row justify-content-between"
                >
                    <slot
                        name="author"
                        :comment="data.author"
                    >
                        <div class="d-flex align-items-center">
                            <!-- @click.prevent="showUserInfo(data.author)" -->
                            <a
                                href="#"
                                class="text-body text-decoration-none"
                            >
                                <span class="fw-medium">
                                    {{ data.author.name }}
                                </span>
                                <!-- &bull;
                                <span class="text-muted fw-light">
                                    {{ data.author.nickname }}
                                </span> -->
                            </a>
                            <span
                                class="fw-light small ms-2 text-body-tertiary"
                                :title="date2string(data.updated_at)"
                            >
                                {{ ago(data.updated_at) }}
                                <span
                                    v-if="data.updated_at != data.created_at"
                                    class="fst-italic"
                                >
                                    &bull;
                                    {{ t('global.edited') }}
                                </span>
                            </span>
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
                <div v-if="!emptyMetadata">
                    <slot
                        v-if="!isDeleted && editMode.enabled"
                        name="body-editing"
                        :comment="data"
                        :content="editMode.content"
                    >
                        <div class="mt-2">
                            <textarea
                                v-model="editMode.content"
                                class="form-control lh-1"
                            />
                            <div class="mt-1 d-flex flex-row align-items-center gap-2">
                                <button
                                    type="button"
                                    class="btn btn-outline-success btn-sm py-0"
                                    :disabled="editMode.content == data.content"
                                    @click="handleEdit()"
                                >
                                    <FontAwesomeIcon :icon="faSave" />
                                    {{ t('global.save') }}
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-outline-danger btn-sm py-0"
                                    @click="cancelEditing()"
                                >
                                    <FontAwesomeIcon :icon="faTimes" />
                                    {{ t('global.cancel') }}
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
                            class="mt-1 white-space-pre lh-1"
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
                        v-if="!isDeleted && !editMode.enabled"
                        name="options"
                        :comment="data"
                    >
                        <div class="d-flex flex-row gap-2 text-body-tertiary mt-2">
                            <a
                                v-if="allowedActions.reply"
                                href="#"
                                class="btn btn-sm bg-none badge text-reset"
                                @click.prevent="setReplyTo()"
                            >
                                <FontAwesomeIcon
                                    :icon="faReply"
                                />
                                <span class="ms-1">
                                    {{ t('reply') }}
                                </span>
                            </a>
                            <!-- &bull; -->
                            <a
                                v-if="allowedActions.edit"
                                href="#"
                                class="btn btn-sm bg-none badge text-reset"
                                @click.prevent="setEditMode()"
                            >
                                <FontAwesomeIcon
                                    :icon="faEdit"
                                />
                                <span class="ms-1">
                                    {{ t('global.edit') }}
                                </span>
                            </a>
                            <!-- &bull; -->
                            <a
                                v-if="allowedActions.delete"
                                href="#"
                                class="btn btn-sm bg-none badge text-reset"
                                @click.prevent="confirmDelete()"
                            >
                                <FontAwesomeIcon
                                    :icon="faTrashAlt"
                                />
                                <span class="ms-1">
                                    {{ t('global.delete') }}
                                </span>
                            </a>
                            <span
                                v-if="data.replies_count > 0"
                                class="small text-body-tertiary"
                            >
                                <a
                                    href="#"
                                    class="text-decoration-none text-reset"
                                    @click.prevent="toggleReplies()"
                                >
                                    <FontAwesomeIcon
                                        :icon="faCirclePlus"
                                    />
                                    <span v-if="!displayReplies">
                                        show replies
                                        ({{ data.replies_count }})
                                    </span>
                                    <span v-else>
                                        hide replies
                                    </span>
                                </a>
                            </span>
                        </div>
                    </slot>
                    <slot
                        v-if="!isDeleted && !editMode.enabled && answerMode.enabled"
                        name="reply-to"
                        :comment="data"
                        :content="answerMode.content"
                    >
                        <div class="mt-2">
                            <textarea
                                v-model="answerMode.content"
                                class="form-control lh-1"
                            />
                            <div class="mt-1 d-flex flex-row align-items-center gap-2">
                                <button
                                    type="button"
                                    class="btn btn-outline-success btn-sm py-0"
                                    :disabled="answerMode.content.length == 0"
                                    @click="handleReply()"
                                >
                                    <FontAwesomeIcon :icon="faPaperPlane" />
                                    {{ t('send') }}
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-outline-danger btn-sm py-0"
                                    @click="cancelReply()"
                                >
                                    <FontAwesomeIcon :icon="faTimes" />
                                    {{ t('global.cancel') }}
                                </button>
                            </div>
                        </div>
                    </slot>
                </div>
            </div>
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
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import {
        computed,
        ref,
    } from 'vue';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import {
        faCirclePlus,
        faEdit,
        faPaperPlane,
        faReply,
        faSave,
        faTimes,
        faTrashAlt,
    } from '@fortawesome/free-solid-svg-icons';

    import { initI18n } from '../../../i18n/i18n';

    import Avatar from '../../Display/Avatar/Avatar.vue';

    import { ago, date2string } from '../../../utils/date';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { CommentProps } from './definitions';

    const props = withDefaults(defineProps<CommentProps>(), {
        allowedActions: {
            edit: true,
            delete: true,
            reply: true,
        },
    });

    const emits = defineEmits<{
        (e: 'edit', content: string): void;
        (e: 'delete'): void;
        (e: 'reply', content: string): void;
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
        if(!contentRef.value) return false;
        return contentRef.value.scrollHeight > contentRef.value.clientHeight;
    });

    const contentStyles = computed(() => {
        if(hasHiddenContent.value && !showHiddenContent.value) {
            return {
                'max-height': '3em',
                'mask-image': 'linear-gradient(180deg, #000 60%, transparent)'
            };
        } else {
            return {};
        }
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
    .white-space-pre {
        white-space: pre;
    }
</style>