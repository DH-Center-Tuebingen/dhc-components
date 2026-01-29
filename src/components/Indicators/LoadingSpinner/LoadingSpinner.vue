<template>
    <!-- The spinner is wrapped in a div so that it can be centered with the css transforms without breaking the spin animation -->
    <div class="loading-spinner">
        <FontAwesomeIcon
            :icon="faCircleNotch"
            :class="classes"
        />
    </div>
</template>

<script
    lang="ts"
    setup
>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
    import { computed } from 'vue';
    import { SizeProp } from '@fortawesome/fontawesome-svg-core';
    import { useDhcClasses } from '../../../composables/dhc';

    const props = defineProps<{
        size?: SizeProp;
    }>();

    const dhcClasses = useDhcClasses();

    const spinnerClasses = computed(() => {
        return `fa-spin fa-${props.size} fa-fw`;
    });

    const classes = computed(() => {
        return [dhcClasses, spinnerClasses.value].join(' ');
    });


</script>