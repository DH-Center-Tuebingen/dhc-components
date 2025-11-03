<template>
    <div class="ms-auto btn-fab-list btn-fab-list-sm gap-1 bg-white z-1 rounded px-2 py-1 d-inline-flex flex-align-center">
        <button
            v-for="(value, index) in buttons"
            :key="index"
            class="btn btn-sm btn-fab"
            :class="getButtonClasses(value.classes)"
            @click="value.action(value, index)"
        >
            <FontAwesomeIcon
                class="fa-fw"
                :icon="value.icon"
                :title="value.title"
                style="vertical-align: 0;"
            ></FontAwesomeIcon>
        </button>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import type { 
        IconDefinition
    } from '@fortawesome/free-solid-svg-icons';
    
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    
    interface FabButton {
        icon: IconDefinition;
        title?: string;
        classes?: string;
        action: Function;
    }

    defineProps<{
        buttons: FabButton[];
    }>();

    const getButtonClasses = (classes?: string) => {
        if(!classes || classes.length === 0) {
            return 'btn-outline-secondary';
        }
        return classes;
    };
</script>


<style lang="scss" scoped>
    @use "@scss/utils.scss";

    .btn-fab {
        padding: 0;
        @include utils.circle(1.8rem);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-fab:disabled {
        // background-color: $gray-200;
        opacity: 1;
    }

    .btn-fab-xl {
        @extend .btn-fab;
        @include utils.circle(4rem);
        font-size: 1.6rem;
    }

    .btn-fab-list-sm > .btn-fab, .btn-fab-sm {
        @include utils.circle(1.25rem);
        padding: 0;
        font-size: 0.8rem;
        line-height: normal;
    }

    .btn-fab-list-md > .btn-fab {
        @include utils.circle(1.5rem);
        padding: 0;
        font-size: 0.9rem;
        line-height: normal;
    }
</style>