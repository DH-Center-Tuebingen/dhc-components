<template>
    <span
        class="dropdown"
        v-if="menuItems.length > 0"
    >
        <span
            class="clickable user-select-none"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
            <slot>
                <IconButton :icon="faEllipsisV" />
            </slot>
        </span>
        <div class="dropdown-menu dropdown-menu-end">
            <a
                v-for="(option, index) of options"
                :key="index"
                href="#"
                class="dropdown-item ps-2 d-flex flex-align-center"
                @click.prevent="option.action"
            >
                <div class="icon-space d-flex justify-content-center align-items-center me-2" style="width: 30px;">
                    <FontAwesomeIcon
                        v-if="option.icon"
                        :icon="option.icon"
                    />
                </div>
                {{ option.text }}
            </a>
        </div>
    </span>
</template>

<script setup lang="ts">
    import { DropdownOption } from 'src/types/Dropdown';
    import { computed } from 'vue';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

    import IconButton from '../Button/IconButton/IconButton.vue';

    const props = defineProps<{
        options: DropdownOption[];
    }>()

    const menuItems = computed(() => {
        return props.options.filter((option) => option.visible)
    })
</script>