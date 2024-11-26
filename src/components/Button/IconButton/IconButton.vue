<template>
    <button class="btn btn-small btn-outline border-0">
        <div class="d-flex align-items-center">            
            <FontAwesomeIcon
                size="xs"
                :icon="props.icon"
            />
        </div>
    </button>
</template>

<script lang="ts" setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

    const props = defineProps<{
        icon: IconDefinition
    }>()
</script>