<template>
    <div
        class="emoji-picker"
    >
        <button
            type="button"
            class="btn btn-outline-secondary btn-sm position-relative"
            ref="toggleBtnRef"
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
                    @click.stop.prevent
                    @select="emojiSelected"
                />
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
    import { computed, defineProps, onMounted, onUnmounted, ref } from 'vue';

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

    const toggleBtnRef = ref({});
    const showPopup = defineModel<boolean>();

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

    const togglePopup = (event: Event) => {
        if(event.target != toggleBtnRef.value) {
            return;
        }
        showPopup.value = !showPopup.value;
    };
    const handleOutsideClick = (event: Event) => {
        if(event.target == toggleBtnRef.value) {
            return;
        }
        showPopup.value = false;
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
        const classes: Array<string> = [];
        let xDefault = true;
        let yDefault = true;
        const directions = props.position.split(' ');
        directions.forEach(dir => {
            if(dir == 'start') {
                classes.push('pe-1', 'end-100');
                xDefault = false;
            } else if(dir == 'end') {
                classes.push('ps-1', 'start-100');
                xDefault = false;
            } else if(dir == 'top') {
                classes.push('bottom-0');
                yDefault = false;
            } else if(dir == 'bottom') {
                classes.push('top-0');
                yDefault = false;
            }
        });
        if(xDefault) {
            classes.push('ps-1', 'start-100');
        }
        if(yDefault) {
            classes.push('top-0');
        }
        return classes;
    });

    onMounted(() => {
        window.addEventListener('click', handleOutsideClick);
    });
    onUnmounted(() => {
        window.removeEventListener('click', handleOutsideClick);
    });
</script>