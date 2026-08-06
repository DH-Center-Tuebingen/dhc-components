<template>
    <div
        class="icon-slider-control position-relative d-flex rounded user-select-none align-items-center border border-dark-subtle overflow-hidden"
        role="button"
        style="width: 25px; height: 18px; font-size: 12px; font-weight: bold;"
        @mousedown="startMove"
    >
        <!-- Underneath Button that always renders in black over the white background -->
        <div
            class="position-absolute fa-fw top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            :style="{
                opacity: (model > 0.5) ? model : 0.5,
                ...clippingMaskVoid
            }"
        >
            <!-- Keep both elements as span otherwise an error occurs (only on build ): "Cannot set properties of null (setting '__vnode')"-->
            <span
                v-if="moving || !icon"
                :style="{ color: fixedOrContrastColor, zIndex: 1, fontWeight: 'bold', fontSize: '0.6rem' }"
            >
                {{ percentage }}
            </span>
            <span v-else>
                <i
                    :class="icon"
                    :style="{ zIndex: 1, color: fixedOrContrastColor }"
                />
            </span>
        </div>
        <div
            class="box position-absolute start-0 h-100"
            :style="`width: ${percentage}; opacity: ${(model > 0.1) ? model : 0.1}; background-color: ${fixedColor}`"
        />

        <!-- Clipped text or icon that renders in the difference color over the progress bar. -->
        <div
            class="position-absolute fa-fw top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            :style="clippingMaskProgress"
        >
            <!-- Keep both elements as span otherwise an error occurs (only on build ): "Cannot set properties of null (setting '__vnode')"-->
            <span
                v-if="moving || !icon"
                :style="{ color: differenceColor, zIndex: 1, fontWeight: 'bold', fontSize: '0.6rem' }"
            >
                {{ percentage }}
            </span>
            <span v-else>
                <i
                    :class="icon"
                    :style="{ zIndex: 1, opacity: model > 0.3 ? model : 0.3, color: differenceColor }"
                />
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, onUnmounted, ref } from 'vue';

    const model = defineModel({
        type: Number,
        required: true,
    });

    const defaultColor = '#dddddd';
    const darkColor = 'black';
    const lightColor = 'white';

    const props = defineProps({
        color: {
            type: String,
            default: null,
        },
        icon: {
            type: String,
            required: false,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 1,
        },
    });

    const emits = defineEmits([
        'update:modelValue'
    ]);

    function toCssPercentage(value: number) {
        return Math.floor(value * 100) + '%';
    }

    const percentage = computed(() => {
        return toCssPercentage(model.value);
    });

    const startValue = ref(0);
    const diffValue = ref(0);
    const moving = ref(false);
    const move = (event) => {
        // Skip moves while waiting for pointer lock to be established.
        // requestPointerLock() is async; the first events before the lock
        // is granted can carry a large movementX jump that snaps the value to 0.
        if(document.exitPointerLock && !document.pointerLockElement) {
            return;
        }

        // Sometimes on Chrome the initial movementX is very large (e.g. -500)
        // therefore we just limit the movementX to avoid a big jump.
        const limitSpeed = 4;
        let movementX = Math.abs(event.movementX) > limitSpeed ? Math.sign(event.movementX) * limitSpeed : event.movementX;

        diffValue.value += movementX * 0.005;
        let effectiveValue = startValue.value + diffValue.value;

        // Overshoot Preventions: When we exceed the threshold, we reset the value
        // excactly to that threshold to prevent the value to grow indefinetely
        // resulting in a bad user experience.
        if(effectiveValue < props.min) {
            diffValue.value += props.min - effectiveValue;
        } else if(effectiveValue > props.max) {
            diffValue.value -= effectiveValue - props.max;
        }

        model.value = Math.max(props.min, Math.min(props.max, effectiveValue));
    };

    const endMove = () => {
        moving.value = false;

        if(document.exitPointerLock) {
            document.exitPointerLock();
        }

        document.body.removeEventListener('mousemove', move);
        document.body.removeEventListener('mouseup', endMove);
        document.body.removeEventListener('mouseleave', endMove);
    };

    const startMove = (event) => {
        const target = event.currentTarget;
        // Only 'requestPoitnerLock' if the browser implements it.
        if(target.requestPointerLock) {
            target.requestPointerLock();
        }

        moving.value = true;
        diffValue.value = 0;
        startValue.value = model.value;
        document.body.addEventListener('mousemove', move);
        document.body.addEventListener('mouseup', endMove);
        document.body.addEventListener('mouseleave', endMove);
    };

    onUnmounted(() => {
        endMove();
    });

    const fixedColor = computed(() => {
        if(!props.color) { return defaultColor; }
        return props.color;
    });

    // When the brightness of the text on the background is too
    // bright, we must use the dark color instead of the current
    // color to ensure the readability.
    const fixedOrContrastColor = computed(() => {
        const brightness = getBrightness(fixedColor.value);
        return brightness > 0.6 ? darkColor : fixedColor.value;
    });

    function getBrightness(color) {
        if(!color.startsWith('#')) {
            console.error('Color format is not supported: ' + color);
        }
        const [R, G, B] = color.match(/\w\w/g).map(x => parseInt(x, 16) / 255);
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    }

    const differenceColor = computed(() => {
        let color = fixedColor.value;
        if(!color) { return darkColor; }
        const brightness = getBrightness(color);
        return brightness > 0.5 ? darkColor : lightColor;
    });

    const clippingMaskProgress = computed(() => {
        return { clipPath: `inset(0 ${toCssPercentage(1 - model.value)} 0 0)` };
    });

    const clippingMaskVoid = computed(() => {
        return { clipPath: `inset(0 0 0 ${toCssPercentage(model.value)})` };
    });
</script>