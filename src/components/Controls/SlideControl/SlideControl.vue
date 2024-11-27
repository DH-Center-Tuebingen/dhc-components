<script
    lang='ts'
    setup
>
    import { computed, ref } from 'vue'
    import type { CSSProperties } from 'vue';

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
        origin?: number
        step?: number
        vertical?: boolean
        // Show the trail
        trail?: boolean
        // Show the thumb
        thumb?: boolean
        width: string
        length?: string
        thumbSize?: string
        borderWidth?: string
    }

    const props = withDefaults(defineProps<SlideControlProps>(), {
        min: 0,
        max: 100,
        step: 1,
        vertical: false,
        trail: true,
        thumb: true,
        width: '20px',
        length: '100px',
        thumbSize: '18px',
        borderWidth: '1px',
    });

    const origin = computed(() => {
        return props.origin ?? props.min;
    });
    
    
    const useOrigin = computed(() => {
        return props.origin != null;
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

    // .thumb {
    //     display: flex;
    //     flex-direction: row;
    //     align-items: center;
    //     justify-content: space-evenly;

    //     position: absolute;
    //     top: -$border-width;
    //     left: 0;
    //     width: calc($thumb-size);
    //     height: 100%;
    //     transform: translateX(-50%);
    //     box-sizing: border-box;
    //     box-shadow: 0 2px 2px rgba($color: #000000, $alpha: .2);
    //     filter: brightness(0.90);

    //     &:hover {
    //         filter: brightness(0.85);
    //     }
    // }


    // .vertical {


    //     .thumb {
    //         left: 0;
    //         top: auto;
    //         height: $thumb-size;
    //         width: calc(100% - $border-width);
    //         transform: translateY(50%);

    //         flex-direction: column;
    //         align-items: center;
    //         justify-content: space-evenly;
    //     }

    // }

    const thumbStyle = computed(() => {
        
        const thumbStyle: CSSProperties = {
            position: 'absolute',
            left: `${thumbPosition.value}%`,
            width: props.thumbSize,
            height: '100%',
            transform: 'translateX(-50%)',
        };

        if (props.vertical) {
            thumbStyle.left = undefined;
            thumbStyle.bottom = `${thumbPosition.value}%`;
            thumbStyle.height = props.thumbSize;
            thumbStyle.width = `100%`;
            thumbStyle.transform = 'translateY(50%)';
        }

        return thumbStyle
    });

    const getRelativeSliderPositionCss = (value: number) => {
        return `${(value) / (props.max - props.min) * 100}%`;
    }

    const originCssPosition = computed(() => {
        return getRelativeSliderPositionCss(origin.value - props.min);
    });

    const sliderStyle = computed(() => {

        return {
            display: 'inline-block',
        }
    })

    const outerTrackStyle = computed(() => {
        const width = props.vertical ? props.width : props.length
        const height = props.vertical ? props.length : props.width

        return {
            width,
            height,
        }
    })

    const innerTrackStyle = computed(() => {

        if (props.vertical) {
            return {
                width: '100%', //CHECK  was => width: calc($width - $border-width);
                left: 0,
                top: `calc(${props.thumbSize} / 2)`,
                height: `calc(${props.length} - ${props.thumbSize} - 2 * ${props.borderWidth})`,
            }
        } else {
            return {
                left: `calc(${props.thumbSize} / 2)`,
                width: `calc(${props.length} - ${props.thumbSize})`,
                height: props.width,
            }
        }

    })
    
    const originStyle = computed(() => {
        const originStyle: CSSProperties = {
            position: 'absolute',
            backgroundColor: 'rgb(59, 68, 122)',
            height: '100%',
            width: '2px',
            transform: 'translateX(-50%)', // This should be -50% but there is 1 px space between the line and the activeTrack.
            left: originCssPosition.value
        };

        if (props.vertical) {
            originStyle.left = undefined;
            originStyle.bottom = originCssPosition.value;
            originStyle.width = '100%';
            originStyle.height = '2px';
            originStyle.transform = 'translateY(50%)';
        }

        return originStyle;
    });

    const activeTrailStyle = computed(() => {
        const length = fixedPosition.value - origin.value;
        const translateAmount = length < 0 ? '100%' : '0';

        const lengthCss = getRelativeSliderPositionCss(Math.abs(length));

        const activeTrailStyle: CSSProperties = {
            position: 'absolute',
            bottom: '0',
            backgroundColor: '#007bff',
            height: '100%',
            width: lengthCss,
            left: originCssPosition.value,
            transform: `translateX(-${translateAmount})`,
        };

        if (props.vertical) {
            activeTrailStyle.left = undefined;
            activeTrailStyle.width = '100%';
            activeTrailStyle.height = lengthCss;
            activeTrailStyle.bottom = originCssPosition.value;
            activeTrailStyle.transform = `translateY(${translateAmount})`;
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

    const onScroll = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY;
        const step = props.step * (e.shiftKey ? 10 : 1);
        const value = fixedPosition.value + (delta > 0 ? -step : step);
        emit('update:modelValue', value);
    }

</script>

<template>
    <div
        class="slider"
        :class="sliderClasses"
        :style="sliderStyle"
        @click="handleClick"
        @mousedown.stop.prevent="startDrag"
        @mousemove.stop.prevent="handleDrag"
        @mouseup.stop.prevent="endDrag"
        @mouseleave.stop.prevent="endDrag"
        @wheel.stop.prevent="onScroll"
    >

        <div
            class="outer-track bg-white border rounded position-relative overflow-hidden"
            :style="outerTrackStyle"
        >
            <div
                class="active-trail background-primary"
                v-show="trail"
                :style="activeTrailStyle"
            >

            </div>

            <div
                class="origin border-bottom-1"
                :style="originStyle"
                style="background-color: red; width: 10px;"
                v-if="useOrigin"
            >
            </div>

            <div
                class="inner-track position-absolute"
                :style="innerTrackStyle"
                ref="innerTrackRef"
            >

                <div
                    v-show="thumb"
                    class="thumb bg-light border rounded"
                    :style="thumbStyle"
                >
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

    .debug {
        .slider {
            background-color: greenyellow;
        }

        .outer-track {
            background-color: blue;
        }

        .inner-track {
            background-color: rgba(255, 255, 0, 0.5);
        }

        .thumb {
            background-color: green;
        }
    }

    .slider {
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

</style>