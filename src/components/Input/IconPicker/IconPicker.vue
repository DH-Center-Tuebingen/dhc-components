<template>
    <div class="icon-picker card">
        <div
            class="icon-picker-grid"
            :style="gridStyle"
        >
            <XButton
                class="icon-wrapper"
                v-for="icon in icons"
                :key="`${icon.prefix}-${icon.iconName}`"
                :active="active === icon"
                :unbutton="true"
                @click="select(icon)"
            >
                <FontAwesomeIcon
                    :icon="icon"
                    fixed-width
                >
                </FontAwesomeIcon>
            </XButton>
        </div>
    </div>
</template>

<script lang='ts' setup>
    import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import XButton from '@/components/Button/XButton/XButton.vue';
    import { computed, CSSProperties } from 'vue';

    const emit = defineEmits(['select'])

    const props = defineProps<{
        active?: IconDefinition;
        columns?: number
        icons: Array<IconDefinition>,
    }>();

    const select = (icon: IconDefinition) => emit('select', icon);

    const gridStyle = computed(() => {
        const style: CSSProperties = {}
        if (props.columns) {
            style.gridTemplateColumns = new Array(props.columns).fill("auto").join(" ");
            style.maxWidth = "min-content"

        } else {
            style.gridTemplateColumns = `repeat(auto-fill, minmax(40px, 1fr))`;
        }
        return style;
    })

</script>

<style lang='scss' scoped>
    $gap: .25em;

    .icon-picker {
        position: relative;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: $gap;
        max-height: 200px;
    }

    .icon-picker-grid {
        font-size: 3rem;
        gap: $gap;
        display: grid;
        color: rgb(53, 53, 53);
        overflow-x: auto;
    }
</style>