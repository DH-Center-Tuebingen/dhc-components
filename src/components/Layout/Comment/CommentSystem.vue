<template>
    <div
        class="d-flex flex-column"
    >
        <div
            v-for="comment in comments"
            :key="comment.id"
            class="px-0 py-2"
        >
            <Comment
                :data="comment"
                :alternate="isAlternate(comment.author.id)"
                @toggle-replies="status => toggleReplies(comment.id, status)"
            />
            <div
                v-if="comment.replies?.length > 0 && repliesShown[comment.id]"
                class="list-group rounded-4 ms-4 mt-2"
            >
                <template
                    v-for="reply in comment.replies"
                    :key="reply.id"
                >
                    <Comment
                        :data="reply"
                        :alternate="isAlternate(reply.author.id)"
                        @toggle-replies="status => toggleReplies(reply.id, status)"
                    />
                </template>
            </div>
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

    import Comment from './Comment.vue';

    import { CommentListProps } from './definitions';

    const repliesShown = ref<Record<number, boolean>>({});

    const props = withDefaults(defineProps<CommentListProps>(), {
    });

    const isAlternate = (user_id: number) => {
        return user_id == 2;
    };

    const toggleReplies = (comment_id: number, status: boolean) => {
        console.log('show?', comment_id, status);
        repliesShown.value[comment_id] = status;
    };

</script>

<style lang="scss">
</style>