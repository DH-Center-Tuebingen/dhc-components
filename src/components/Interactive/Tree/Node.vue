<template>
    <div
        class="node user-select-none"
    >
        <div
            class="d-flex"
            ref="nodeRef"
            :class="computedClasses"
            @click.prevent="toggleExpand"
            @dragstart="dragStart"
            @dragend="state.dragged = false"
            @dragexit="state.dragged = false"
            @drop="state.dragged = false"
            @dragenter="state.draggedOver = true"
            @dragleave="state.draggedOver = false"
        >
            {{ collapseIcon }}&nbsp;
            <a
                class="node-name"
                href="#"
            >
                {{ props.data.name }}
            </a>
        </div>
        <div
            class="node-children ms-4"
            v-if="props.data.children && state.expanded"
        >
            <Node
                v-for="(child, index) in props.data.children"
                :key="index"
                :data="child"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, reactive, ref } from 'vue';


    export type TreeNode = {
        id: string;
        name: string;
        children?: TreeNode[];
    };

    const nodeRef = ref<HTMLElement | null>(null);

    const state = reactive({
        expanded: false,
        dragged: false,
        draggedOver: false,
    });

    const props = defineProps<{
        data: TreeNode;
    }>();

    const collapseIcon = computed(() => {
        if (!props.data.children) {
            return '#';
        }

        return state.expanded ? '-' : '+';
    });

    const computedClasses = computed(() => {
        const classes = [];

        if (state.dragged) {
            classes.push('opacity-25');
        }
        
        if(state.draggedOver) {
            classes.push('bg-primary');
            classes.push('text-white');
        }

        return classes;
    });

    const toggleExpand = () => {
        if (state.dragged) {
            return;
        }

        if (props.data.children) {
            state.expanded = !state.expanded;
        }
    };

    const dragStart = (event: DragEvent) => {
        console.log('Drag started', event);
        if (!event.dataTransfer) {
            console.error('No dataTransfer object found');
            return;
        }
        if (nodeRef.value) {
            const dragImage = nodeRef.value.cloneNode(true) as HTMLElement;

            const computedStyle = getComputedStyle(event.target as HTMLElement)
            console.log(computedStyle);
            const paddingX = 10;
            const paddingY = 5;
            dragImage.style.position = 'absolute';
            dragImage.style.backgroundColor = 'whitesmoke';
            dragImage.style.borderRadius = '1rem';
            dragImage.style.padding = `${paddingY}px ${paddingX}px`;
            dragImage.style.opacity = '1'; // Ensure full opacity
            document.body.appendChild(dragImage);
            event.dataTransfer.setDragImage(dragImage, event.offsetX + paddingX, event.offsetY + paddingY);

            // Clean up the drag image after the drag ends
            setTimeout(() => document.body.removeChild(dragImage), 0);
        } else {
            console.error('No nodeRef found');
        }
        state.dragged = true;
    };

</script>