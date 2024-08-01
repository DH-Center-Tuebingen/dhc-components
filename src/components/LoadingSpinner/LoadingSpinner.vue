<template>
    <FontAwesomeIcon
        :icon="faCircleNotch"
        :class="classes"
    />
</template>

<script lang="ts" setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
    import { computed } from 'vue';
    import { SizeProp } from '@fortawesome/fontawesome-svg-core';
    import { useDhcClasses } from '../../composables/dhc';

    const props = withDefaults(defineProps<{
        size: SizeProp;
    }>(), {
        size: 'sm'
    });

    const dhcClasses = useDhcClasses();

    const spinnerClasses = computed(() => {
        return `fa-spin fa-${props.size} fa-fw`;
    });

    const classes = computed(() => {
        return [dhcClasses, spinnerClasses.value].join(' ');
    });


</script>