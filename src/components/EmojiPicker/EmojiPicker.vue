<template>
    <div
        class="emoji-picker"
    >
        <button
            class="btn btn-outline-secondary btn-sm position-relative"
            @click="togglePopup"
        >
            {{ translatedLabel }}
            <div
                v-show="showPopup"
                class="position-absolute"
                :class="positionClasses"
            >
                <Picker
                    :data="emojiIndex"
                    set="twitter"
                    title=""
                    @select="emojiSelected"
                />
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
    import { computed, defineProps } from 'vue';

    import data from 'emoji-mart-vue-fast/data/twitter.json';
    import 'emoji-mart-vue-fast/css/emoji-mart.css';
    import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src';

    export interface EmojiPickerProps {
        label: string,
        position?: string,
    }

    export interface EmojiPickEvent {
        id: string,
        native: string,
        short_name: string,
        unified: string,
        colons: string,
    }

    const props = withDefaults(defineProps<EmojiPickerProps>(), {
        label: '😀',
        position: 'end',
    });

    const emit = defineEmits(['selected'])
    const emojiIndex = new EmojiIndex(data);

    const emojiSelected = (data: EmojiPickEvent) => {
        console.log("selected emoji", data);
        emit('selected', {
            id: data.id,
            emoji: data.native,
            name: data.short_name,
            unicode: data.unified,
            code: data.colons
        });
    };

    const translatedLabel = computed(() => {
        if(emojiIndex.nativeEmoji(props.label)) {
            return props.label;
        } else if(/:\w+:/.test(props.label)) {
            const emojiData = emojiIndex.findEmoji(props.label);
            if(!emojiData) {
                return props.label;
            } else {
                return emojiData.native;
            }
        } else {
            return props.label
        }
    });

    const positionClasses = computed(() => {
        const classes = ['top-0'];
        if(props.position == 'start') {
            classes.push('pe-1', 'end-100');
        } else {
            classes.push('ps-1', 'start-100');
        }
        return classes;
    });

    const showPopup = defineModel<boolean>();

    const togglePopup = () => {
        showPopup.value = !showPopup.value;
    };
</script>