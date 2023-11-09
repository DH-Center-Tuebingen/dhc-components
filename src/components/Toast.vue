<template>
    <div class="toast" :class="classes">
        <div class="content">
            This is a toast!
            <slot />
        </div>

        <div @click="() => active = false" class="close-button">X</div>
    </div>
</template>


<script lang='ts' setup>
import { computed, ref } from 'vue';
import type { Position, HorizontalPosition, VerticalPosition } from '@/types/Potisioning';



const props = withDefaults(defineProps<{
    popupDelay?: number;
    verticalPosition?: VerticalPosition;
    horizontalPosition?: HorizontalPosition;
}>(), {
    popupDelay: 0,
    verticalPosition: 'top',
    horizontalPosition: 'right',
});

const doInitialPop = props.popupDelay !== 0

const active = ref(!doInitialPop);

if (doInitialPop) {
    setTimeout(() => {
        active.value = true;
    }, props.popupDelay)
}

const classes = computed(() => {
    const classes = []

    if (!active.value) {
        classes.push('hidden')
    }

    classes.push(props.verticalPosition)
    classes.push(props.horizontalPosition)

    return classes
})

</script>

<style lang='scss' scoped>
.toast {
    position: fixed;
    display: flex;
    justify-content: space-between;

    gap: 1rem;
    min-width: 420px;


    transition: transform 0.3s ease-in-out;

    border: 1px solid black;
    padding: 1rem;
    border-radius: 10px;

    &.top {
        top: 1rem;
    }

    &.right {
        right: 0;
        border-right: 0px solid transparent;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;

        &.hidden {
            transform: translateX(100%);
        }
    }

    &.left {
        left: 0;
        right: auto;
        border-left: 0px solid transparent;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

        &.hidden {
            transform: translateX(-100%);

            &.middle {
                transform: translate(-100%, -50%);
            }
        }
    }

    &.center {
        left: 50%;
        transform: translateX(-50%);

        &.top {
            transition: transform .5s ease-in-out,
                top .5s ease-in-out;
                
            &.hidden {
                top: 0;
                transform: translate(-50%, -100%);
            }
        }

        &.middle {
            top: 50%;
            left: 50%;
            transition: transform .5s ease-in-out,
                top .5s ease-in-out;
            transform: translate(-50%, -50%);

            &.hidden {
                top: 0;
                transform: translate(-50%, -150%);
            }
        }

        &.bottom {
            transition: transform .5s ease-in-out,
                bottom .5s ease-in-out;
            transform: translate(-50%, 0);

            &.hidden {
                bottom: 0;
                transform: translate(-50%, 100%);
            }
        }


    }

    &.middle {
        top: 50%;
        transform: translateY(-50%);
    }

    &.bottom {
        top: auto;
        bottom: 1rem;
    }

    //TODO: replace with Button component
    .close-button {
        user-select: none;
        cursor: pointer;
    }

}
</style>