<template>
    <div
        class="d-flex flex-column"
    >
        <div
            v-for="comment in comments"
            :key="comment.id"
        >
            <Comment
                :data="comment"
            />
            <hr class="text-body-tertiary">
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

    const props = withDefaults(defineProps<CommentListProps>(), {
    });
    console.log("props list", props.comments)
</script>

<style lang="scss">
</style>