<template>
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#${parentName}-${title}`"
                aria-expanded="false"
                :aria-controls="`${parentName}-${title}`"
            >
                {{ title }}
            </button>
        </h2>
        <div
            :id="`${parentName}-${title}`"
            class="accordion-collapse collapse"
            :data-bs-parent="`#${parentName}`"
        >
            <div class="accordion-body">
                <slot></slot>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    defineProps<{
        title: string;
        parentName: string;
    }>();
</script>