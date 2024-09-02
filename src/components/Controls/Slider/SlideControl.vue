<script
    lang='ts'
    setup
>
    import { computed, ref } from 'vue'

    /**
     * Slider component for special purposes:
     * 
     * + Vertical slider
     * + TBA
     * 
     */

    const emit = defineEmits(['update:modelValue']);

    export interface SlideControlProps {
        disabled?: boolean
        modelValue: number
        min?: number
        max?: number
        step?: number
        vertical?: boolean
    }

    const props = withDefaults(defineProps<SlideControlProps>(), {
        min: 0,
        max: 100,
        step: 1,
        vertical: false
    });

    const sliderClasses = computed(() => {
        const classes = [];
        if (props.vertical) {
            classes.push('vertical');
        }
        return classes;
    });

    const fixedPosition = computed(() => {
        return Math.min(Math.max(props.modelValue, props.min), props.max);
    });

    const thumbPosition = computed(() => {
        return (fixedPosition.value - props.min) / (props.max - props.min) * 100;
    });

    const thumbStyle = computed(() => {

        const thumbStyle: Partial<CSSStyleDeclaration> = {
            left: `${thumbPosition.value}%`
        };

        if (props.vertical) {
            thumbStyle.left = undefined;
            thumbStyle.bottom = `${thumbPosition.value}%`;
        }

        return thumbStyle
    });


    const activeTrailStyle = computed(() => {
        const activeTrailStyle: Partial<CSSStyleDeclaration> = {
            width: `${thumbPosition.value}%`
        };

        if (props.vertical) {
            activeTrailStyle.width = undefined;
            activeTrailStyle.height = `${thumbPosition.value}%`;
        }

        return activeTrailStyle;
    });

    const innerTrackRef = ref<HTMLElement | null>(null);

    const updateValueFromPosition = (position: { x: number, y: number }) => {

        const currentTarget = innerTrackRef.value as HTMLElement;
        const rect = currentTarget.getBoundingClientRect();
        const pos = props.vertical ? rect.height - (position.y - rect.top) : position.x - rect.left;
        const length = props.vertical ? rect.height : rect.width;
        const ratio = pos / length;
        let value = ratio * (props.max - props.min) + props.min;
        value = Math.round(value / props.step) * props.step;
        value = Math.min(Math.max(value, props.min), props.max);
        emit('update:modelValue', value);
    }

    const handleClick = (e: MouseEvent) => {
        if (e.currentTarget === null) {
            return;
        }

        updateValueFromPosition({ x: e.clientX, y: e.clientY });
    }

    let dragging = ref(false);
    let start = ref(0);

    const startDrag = (e: MouseEvent) => {
        dragging.value = true;
        start.value = props.vertical ? e.clientY : e.clientX;
        updateValueFromPosition({ x: e.clientX, y: e.clientY });
    }

    const handleDrag = (e: MouseEvent) => {
        if (!dragging.value) {
            return;
        }

        updateValueFromPosition({ x: e.clientX, y: e.clientY });
    }

    const endDrag = () => {
        dragging.value = false;
    }

</script>

<template>
    <div
        class='slider'
        :class="sliderClasses"
        @click="handleClick"
        @mousedown.stop.prevent="startDrag"
        @mousemove.stop.prevent="handleDrag"
        @mouseup.stop.prevent="endDrag"
        @mouseleave.stop.prevent="endDrag"
    >
        <div class="outer-track bg-white border rounded">
            <div
                class="active-trail background-primary"
                :style="activeTrailStyle"
            >

            </div>
            <div
                class="inner-track"
                ref="innerTrackRef"
            >

                <div
                    class="thumb bg-light border rounded"
                    :style="thumbStyle"
                >
                    <div class="style-line"></div>
                    <div class="style-line"></div>

                </div>
            </div>
            <input
                type='range'
                style="display: none;"
                :min="min"
                :max="max"
                :value="modelValue"
            />
        </div>
    </div>

</template>

<style
    lang='scss'
    scoped
>
    $border-width: 1px;
    $thumb-size: 18px;
    $width: 20px;
    $length: 100px;

    .debug {
        .slider {
            background-color: greenyellow;
        }

        .outer-track {
            background-color: blue;
        }

        .inner-track {
            background-color: yellow;
        }

        .thumb {
            background-color: green;
        }
    }

    .slider {
        display: inline-block;
        padding: 10px;

        &:hover {

            .active-trail {
                filter: brightness(1.1);
            }

        }

        &:active {
            .thumb {
                filter: brightness(0.80);
            }

            .active-trail {
                filter: brightness(1.2);
            }
        }
    }

    .outer-track {
        position: relative;
        width: $length;
        height: $width;
        box-shadow: inset 1px 2px 3px rgba($color: #000000, $alpha: .1);
        overflow: hidden;
    }

    .inner-track {
        position: absolute;
        left: calc($thumb-size / 2);
        width: calc($length - $thumb-size);
        height: $width;
    }

    .thumb {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;

        position: absolute;
        top: -$border-width;
        left: 0;
        width: calc($thumb-size);
        height: 100%;
        transform: translateX(-50%);
        box-sizing: border-box;
        box-shadow: 0 2px 2px rgba($color: #000000, $alpha: .2);


        filter: brightness(0.90);

        &:hover {
            filter: brightness(0.85);
        }


    }

    .active-trail {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
        background-color: #007bff;
    }

    .style-line {
        pointer-events: none;
        height: 60%;
        border-left: 1px solid #dee2e6;
    }

    .vertical {

        .outer-track {
            width: $width;
            height: $length;
        }

        .inner-track {
            width: $width;
            left: 0;
            top: calc($thumb-size / 2);
            height: calc($length - $thumb-size - 2 * $border-width);
            width: calc($width - $border-width);
        }

        .thumb {
            left: 0;
            top: auto;
            height: $thumb-size;
            width: calc(100% - $border-width);
            transform: translateY(50%);

            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
        }

        .style-line {
            border-left: 0;
            border-bottom: 1px solid #dee2e6;
            width: 60%;
            height: 0;
        }

        .active-trail {
            width: 100%;
            height: 0px;
            bottom: 0;
        }
    }
</style>