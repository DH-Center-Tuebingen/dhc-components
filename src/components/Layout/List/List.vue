<template>
    <div class="list-group">
        <header
            class="list-group-item disabled py-1 .text-black-50 fw-bold"
            v-if="$slots.default"
        >
            <slot></slot>
        </header>


        <template
            v-for="item in items"
            :key="item"
        >
            <component
                :is="item.routerLink ? 'router-link' : 'a'"
                href="#"
                class="list-group-item list-group-item-action"
                @click="item.action"
            >
                <FontAwesomeIcon
                    v-if="item.icon"
                    :icon="item.icon"
                    class="me-2"
                />
                <span v-else
                      class="d-inline-block me-2"
                      style="width: 16px;"
                >
                &nbsp;
                </span>
                {{ item.name }}
            </component>
        </template>
    </div>
</template>

<script setup lang="ts">
    import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


    export type ListItem = {
        name: string;
        icon?: IconDefinition;
        routerLink?: string;
        action?: Function;
    }

    defineProps<{
        items: ListItem[];
    }>();
</script>