<template>
    <div
        class="emoji-picker"
    >
        <button
            class="btn btn-outline-secondary btn-sm"
            @click="togglePopup"
        >
            😀
        </button>
        <div
            v-show="showPopup"
            class="mt-1"
        >
            <Picker
                :data="emojiIndex"
                set="twitter"
                title=""
                @select="emojiSelected"
            />
        </div>
    </div>
</template>

<script
    lang="ts"
    setup
>
    import data from "emoji-mart-vue-fast/data/twitter.json";
    import "emoji-mart-vue-fast/css/emoji-mart.css";
    import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";

    const emit = defineEmits(['selected'])
    const emojiIndex = new EmojiIndex(data);

    const emojiSelected = (data: Event) => {
        console.log("selected emoji", data);
        emit('selected', {
            id: data.id,
            emoji: data.native,
            name: data.short_name,
            unicode: data.unified,
            code: data.colons
        });
    };

    const showPopup = defineModel<boolean>();

    const togglePopup = () => {
        showPopup.value = !showPopup.value;
    };
</script>