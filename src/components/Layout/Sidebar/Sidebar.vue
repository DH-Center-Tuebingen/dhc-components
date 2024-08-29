<template>
    <div
        class="sidebar position-relative"
        :class="dynamicWrapperClasses"
        :style="{ minWidth: width, width: width }"
    >
        <button
            class="position-absolute top-0 right-0 btn bg-white border-secondary"
            :class="dynamicButtonClasses"
            style="transform: translate(calc(-100% + 1px), 1rem); border-top-right-radius: 0;border-bottom-right-radius: 0;"
            @click.stop.prevent="toggle"
            role="button"
            :aria-expanded="open"
            aria-controls="sidebar"
        >
            <span v-show="!open">
                <FontAwesomeIcon
                    :icon="faBars"
                    class="fas fa-fw"
                    title="Toggle Sidebar"
                />
            </span>

            <span v-show="open">
                <FontAwesomeIcon
                    :icon="faCaretRight"
                    class="fas fa-fw"
                    title="Toggle Sidebar"
                />
            </span>
        </button>
        <div
            class="sidebar-container w-100 h-100 position-absolute top-0 start-0"
            :style="{ maxWidth: containerMaxWidth, overflowX: 'clip' }"
        >
            <div
                v-show="open"
                class="sidebar w-100 h-100 overflow-y-auto p-absolute t-0 s-0"
                style="overflow-x: clip;"
                id="sidebar"
            >
                <slot></slot>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faBars, faCaretRight } from '@fortawesome/free-solid-svg-icons';

    type SidebarOptions = {
        /** Maximum extend on the parent container in %. */
        maxExtend: string,
        /** Minimum extend on the parent container in px. Atmost 100% of the parent container. */
        minWidth: string,
    }

    const emits = defineEmits(['changed'])

    defineProps<{
        options: SidebarOptions
    }>()

    const open = ref(true)

    const width = computed(() => open.value ? '30%' : '0')
    const containerMaxWidth = computed(() => open.value ? '100%' : '0')

    const toggle = () => {
        open.value = !open.value
        emits('changed', open.value)
    }

    const dynamicWrapperClasses = computed(() => {
        return {
            'border-start': open.value,
            'border-secondary': open.value,
        }
    })

    const dynamicButtonClasses = computed(() => {
        return {
            'border-end-0': open.value,
        }
    })

</script>