<template>
    <div class="range-slider">
        <div class="range-slider-track">

            <div
                ref="innerTrack"
                class="range-slider-inner-track"
            >
                <div
                    class="range-slider-active-track"
                    :style="activeTrackStyle"
                    @pointerdown.prevent="(event) => startDrag(event, [0, 1])"
                ></div>


                <div
                    class="range-slider-caret-container range-slider-start user-select-none"
                    role="button"
                    :style="startStyle"
                    @pointerdown="(event) => startDrag(event, [0])"
                >
                    <div
                        class="range-slider-caret"
                        :class="getDraggedClass(0)"
                    >
                    </div>

                    <span class="range-slider-caret-value">
                        {{ startLabelText }}
                    </span>
                </div>


                <div
                    class="range-slider-caret-container range-slider-end user-select-none"
                    role="button"
                    :style="endStyle"
                    @pointerdown="(event) => startDrag(event, [1])"
                >
                    <div
                        class="range-slider-caret"
                        :class="getDraggedClass(1)"
                    >

                    </div>
                    <span class="range-slider-caret-value">
                        {{ endLabelText }}
                    </span>
                </div>
            </div>


            <canvas
                ref="canvas"
                v-if="requireCanvas"
            >
                No canvas support
            </canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Ruler } from 'src/types/Graphics';
    import { computed, onMounted, ref, useTemplateRef } from 'vue';


    type Range = [number, number];

    const model = defineModel<Range>();

    const props = withDefaults(defineProps<{
        min?: number,
        max?: number,
        step?: number,
        ctrlSnap?: number,
        shiftSnap?: number,
        altSnap?: number,
        enforceMinMax?: boolean,
        rulers?: Ruler | Array<Ruler>
    }>(), {
        min: 0,
        max: 100,
        step: 0,
        ctrlSnap: 1,
        shiftSnap: 10,
        altSnap: 0.1,
        enforceMinMax: false,
    });

    const defaultFontSize = 12;
    const defaultLabelPadding = 5;

    const start = computed(() => model.value?.[0] ?? props.min);
    const end = computed(() => model.value?.[1] ?? props.max);
    const requireCanvas = computed(() => {
        if (!props.rulers) { return false; }
        if (!Array.isArray(props.rulers)) { return true; }
        else { return props.rulers?.length > 0; }
    })
    const rulerArray = computed<Array<Ruler>>(() => {
        if (!props.rulers) { return []; }
        if (Array.isArray(props.rulers)) { return props.rulers; }
        else { return [props.rulers]; }
    })

    function makeTextLabel(value: number): string {
        return (props.step <= 0) ? value.toFixed(2) : value.toFixed(0);
    }

    const startLabelText = computed(() => {
        return makeTextLabel(start.value);
    });
    const endLabelText = computed(() => {
        return makeTextLabel(end.value);
    });

    function getDraggedClass(index: number): string {
        return dragging.value === index ? 'dragged' : '';
    }

    function getPosition(value: number): number {
        const range = props.max - props.min;
        const percentage = (value - props.min) / range;
        return Math.max(0, Math.min(100, percentage * 100));
    }

    const startStyle = computed(() => {
        return {
            left: `${getPosition(start.value)}%`
        };
    });

    const endStyle = computed(() => {
        return {
            left: `${getPosition(end.value)}%`
        };
    });

    const activeTrackStyle = computed(() => {
        return {
            left: `${getPosition(start.value)}%`,
            width: `${getPosition(end.value) - getPosition(start.value)}%`
        };
    });

    const dragging = ref<Array<0 | 1> | null>(null);
    const startValue = ref<number>(0)
    const caretStartValues = ref<[number, number]>([0, 0])
    const innerTrack = useTemplateRef('innerTrack');
    const canvas = useTemplateRef('canvas');

    function updateCanvas() {
        if (!canvas.value || !requireCanvas.value) { return; }

        const bb = canvas.value.getBoundingClientRect()

        let requiredHeight = rulerArray.value.reduce((max, ruler) => {
            let fontSize = defaultFontSize;
            let labelPadding = defaultLabelPadding;
            if (typeof (ruler?.label) === 'object') {
                fontSize = ruler?.label?.size ?? fontSize
                labelPadding = ruler?.label?.padding ?? labelPadding
            }

            const length = ruler?.length ?? 0;

            // When the value is calculated perfectly, the text is still cropped
            // So we add a safety Padding to the fontSize
            const safetyPaddedFontSize = fontSize * 1.2;
            const totalLength = safetyPaddedFontSize + labelPadding + length;
            return (totalLength > max) ? totalLength : max
        }, 0)

        const canvasHeight = requiredHeight;
        canvas.value.height = canvasHeight;
        canvas.value.width = bb.width;
        canvas.value.style.bottom = -canvasHeight + 'px';

        const ctx = canvas.value.getContext('2d');
        if (!ctx) { return; }
        drawRulers(ctx);
    }

    onMounted(() => {
        updateCanvas();

        if (canvas.value) {
            const obs = new ResizeObserver(() => updateCanvas())
            obs.observe(canvas.value)
        } else {
            console.error('Could not attach resize observer to canvas!')
        }
    })

    function applyStep(value: number, step: number | null = null): number {
        if (!step) { step = props.step; }
        // normalize the offset to -step/2 < 0 < step/2
        let offset = Math.abs(value % step)
        const sign = Math.sign(value)
        if (offset > step / 2) { offset = offset - step }
        offset *= sign

        // Remove the existing offset from the value
        // which wil always between 
        return value - offset
    }

    function getValue(x: number) {
        if (!innerTrack.value) { return 0; }
        const track = innerTrack.value.getBoundingClientRect();
        const percentage = (x - track.left) / track.width;
        return props.min + percentage * (props.max - props.min);
    }

    const performDrag = (event: PointerEvent) => {
        if (!model.value || dragging.value == null || !innerTrack.value) { return; }

        let value = getValue(event.clientX)
        const offset = startValue.value - value

        dragging.value.forEach((caret) => {

            let caretValue = caretStartValues.value[caret] - offset

            if (event.shiftKey) {
                caretValue = applyStep(caretValue, props.shiftSnap)
            } else if (event.ctrlKey) {
                caretValue = applyStep(caretValue, props.ctrlSnap)
            } else if (event.altKey) {
                caretValue = applyStep(caretValue, props.altSnap)
            }

            if (props.step != 0) {
                caretValue = applyStep(caretValue)
            }

            caretValue = enforceLimit(caretValue)
            caretValue = enforceLimit(caretValue, true)

            model.value[caret] = caretValue;

            if (dragging.value?.length == 1) {
                swapCaretWhenCrossing(caretValue)
            }
        })
    }

    function enforceLimit(value: number, upper = false): number {
        const step = props.step;
        const doesViolate = (val: number) => (upper) ? (val > props.max) : (val < props.min)

        if (doesViolate(value)) {
            if (step && !props.enforceMinMax) {
                while (doesViolate(value)) {
                    const fstep = (upper) ? -step : step
                    value += fstep
                }
            } else {
                value = (upper) ? props.max : props.min
            }
        }
        return value;
    }

    function swapCaretWhenCrossing(value: number): (-1 | 0 | 1) {
        if (!model.value || dragging.value == null || dragging.value.length > 1) { return }
        const activeIndex = dragging.value[0]
        const otherIndex = activeIndex === 0 ? 1 : 0;
        const otherValue = model.value[otherIndex]


        if ((activeIndex === 0 && value > model.value[1]) || (activeIndex === 1 && value < model.value[0])) {
            model.value[activeIndex] = otherValue;
            startValue.value = otherValue
            caretStartValues.value[otherIndex] = otherValue
            const newTarget = activeIndex === 1 ? 0 : 1
            dragging.value = [newTarget]
            return newTarget;
        }
        return -1;
    }

    function startDrag(event: MouseEvent, target: Array<0 | 1>) {
        if (!model.value) { return; }
        dragging.value = target;
        startValue.value = getValue(event.clientX)
        caretStartValues.value = [...model.value]
        window.addEventListener('pointermove', performDrag);
        window.addEventListener('pointerup', endDrag);
        window.addEventListener('pointercancel', endDrag);
    }

    function endDrag() {
        dragging.value = null;
        window.removeEventListener('pointermove', performDrag);
        window.removeEventListener('pointerup', endDrag);
        window.removeEventListener('pointercancel', endDrag() });
    }

    function drawRulers(ctx: CanvasRenderingContext2D) {
        if (!props.rulers || !canvas.value) { return; }

        const halfCircleSize = 10;
        const pxPerStep = (canvas.value.width - 2 * halfCircleSize) / (props.max - props.min)
        const rulers = (!Array.isArray(props.rulers)) ? [props.rulers] : props.rulers
        let biggerSteps = rulers.toSorted((a, b) => b.step - a.step).map(sd => sd.step)
        rulers.forEach(({ step, length, width: configWidth, color, label }) => {
            let width = configWidth ? configWidth : 1
            biggerSteps.pop();
            if ((pxPerStep * step) > 5 * width) {
                let startOffset = props.min % step


                const startPosition = props.min - startOffset

                for (let stepPosition = startPosition; stepPosition <= (props.max - props.min); stepPosition += step) {
                    let skipPaint = false
                    for (let beforeStep of biggerSteps) {
                        if (stepPosition % beforeStep === 0) {
                            skipPaint = true;
                        }
                    }

                    if (skipPaint) { continue }

                    const lastStyle = ctx.fillStyle;
                    ctx.fillStyle = color ?? 'black';

                    const xPosition = halfCircleSize + (stepPosition - props.min) * pxPerStep
                    ctx?.fillRect(xPosition - width / 2, 0, width, length)

                    if (label) {
                        const textContent = stepPosition.toString();

                        let size = defaultFontSize;
                        let family = 'sans-serif';
                        let weight = 400;
                        let italic = false;
                        let padding = defaultLabelPadding;

                        if (typeof (label) === 'object') {
                            ({
                                size,
                                family,
                                weight,
                                italic,
                                padding,
                            } = Object.assign({
                                size,
                                family,
                                weight,
                                italic,
                                padding
                            }, label))
                        }

                        ctx.font = `${italic ? 'italic' : ''} ${weight} ${size}px ${family}`
                        const { width } = ctx.measureText(textContent)
                        let xLabelStart = xPosition - width / 2

                        const canvasWidth = canvas.value?.width ?? 0
                        const safetyPadding = size * 0.1;
                        // If the label is outside the canvas we move it inside the canvas with the offset of fixedXLabelStart
                        if (xLabelStart < safetyPadding) {
                            xLabelStart = safetyPadding
                        } else if (xLabelStart + width + safetyPadding > canvasWidth) {
                            xLabelStart = canvasWidth - width - safetyPadding;
                        }

                        ctx.fillText(textContent, xLabelStart, length + size + padding)
                    }
                    ctx.fillStyle = lastStyle;

                }
            }
        })
    }
</script>

<style lang="scss">
    $size: 20px;

    canvas {
        position: absolute;
        z-index: -1;
        width: 100%;
    }

    .range-slider {
        position: relative;
        min-width: 200px;
        height: $size + 20px;
        // background-color: rgb(24, 201, 53);
    }

    .range-slider-track {
        position: absolute;
        bottom: 0;
        height: $size/2;
        width: 100%;
        border-radius: 5px;
        background-color: white;
        transform: translateY(-50%);
    }

    .range-slider-inner-track {
        position: absolute;
        background-color: rgb(255, 255, 255);
        left: $size/2;
        width: calc(100% - #{$size});
        height: 100%;
    }

    .range-slider-active-track {
        position: absolute;
        background-color: var(--bs-primary);
        height: 100%;
    }

    .range-slider-caret-container {
        height: 0 !important;
        width: 0 !important;

        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .range-slider-caret {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%) scale(1);

        height: $size;
        width: $size;

        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

        user-select: none;

        transition: transform 0.3s ease;

        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60%;
            height: 60%;
            background-color: var(--bs-primary);
            border-radius: 50%;
        }

        &.dragged {
            transform: translate(-50%, -50%) scale(.9);
        }
    }

    .range-slider-caret-value {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        color: rgb(177, 177, 177);
        font-size: 10px;
        font-weight: bold;
    }
</style>