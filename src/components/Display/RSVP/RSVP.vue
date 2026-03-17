<template>
    <div class="d-flex justify-content-center align-items-center rounded bg-light p-4">
        <div class="font-monospace fs-1">
            <span v-if="currentWord?.before">
                {{ currentWord.before }}
            </span>
            <span
                v-if="currentWord?.orp"
                class="text-danger"
            >
                {{ currentWord.orp }}
            </span>
            <span v-if="currentWord?.after">
                {{ currentWord.after }}
            </span>
        </div>
        <button
            v-if="hasEnded"
            type="button"
            class="btn btn-outline-primary"
            @click="initializeReading()"
        >
            <FontAwesomeIcon
                class="fa-fw"
                :icon="faRedo"
            />
            {{ t('re_read') }}
        </button>
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
        faRedo,
    } from '@fortawesome/free-solid-svg-icons';

    import { initI18n } from '@/i18n/i18n';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { RSVPProps, WordParts } from './definitions';

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;

    const props = withDefaults(defineProps<RSVPProps>(), {
        wordsPerMinute: 60,
        highlightOrp: true,
        loop: true,
    });

    const currentWordIndex = ref<number>(0);
    const hasEnded = ref<boolean>(false);

    const getORPCharacterIndex = (word: string) => {
        // Simple approach to guess the Optimal Recognition Point (ORP)
        // Should be slightly to the left of the center
        // Thus we divide word length by 2 and substract a fixed offset of 1
        // and also another offset of 1 to get the 0-based index
        return Math.max(
            Math.ceil((word.length + 1) / 2) - 2,
            0
        );
    }

    const wordParts = (word: string) => {
        const parts: Partial<WordParts> = {};

        const idx = getORPCharacterIndex(word);
        parts.before = word.slice(0, idx);
        if(props.highlightOrp) {
            parts.orp = word.slice(idx, idx + 1);
            parts.after = word.slice(idx + 1);
        } else {
            parts.after = word.slice(idx);
        }

        return parts;
    };

    const beginReading = () => {
        window.setTimeout(() => {
            currentWordIndex.value++;
            if(currentWordIndex.value >= words.value.length) {
                if(props.loop) {
                    currentWordIndex.value = 0;
                } else {
                    hasEnded.value = true;
                    return;
                }
            }
            beginReading();
        }, timePerWord.value);
    };

    const initializeReading = () => {
        hasEnded.value = false;
        currentWordIndex.value = 0;
        window.setTimeout(() => {
            beginReading();
        }, 1000);
    };

    const currentWord = computed(() => {
        return words.value[currentWordIndex.value];
    });

    const endsWithPunctation = computed(() => {
        if(currentWord.value) {
            return currentWord.value.after && currentWord.value.after.match(/[.,!?:;]/);
        }
        return false;
    })

    // How long a word should be displayed
    // Words with punctations are displayed for 3 times as long
    const timePerWord = computed(() => {
        let timePerWord = (60.0 / props.wordsPerMinute) * 1000;
        if(endsWithPunctation.value) {
            timePerWord *= 3;
        }
        return timePerWord;
    });

    const words = computed(() => {
        return props.content.split(/\s+/).map((word) => {
            return wordParts(word);
        });
    });

    initializeReading();
</script>

<style lang="scss">
</style>