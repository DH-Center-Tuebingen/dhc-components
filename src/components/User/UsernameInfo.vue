<template>
    <a
        href="#"
        class="text-body text-decoration-none d-flex align-items-center gap-2"
        :class="{ 'flex-row-reverse': reversed }"
        @click.stop.prevent="open()"
    >
        <span class="fw-medium">
            {{ displayName }}
        </span>
        <template v-if="showNickName">
            <span class="text-muted fw-light">
                {{ user.nickname }}
            </span>
        </template>
    </a>
</template>

<script lang="ts" setup>

    import { computed } from 'vue';

    import { User } from '@/types/User';
    import UserInfo from './UserInfo.vue';
    import { useModal } from '@/composables/modal';

    const props = withDefaults(defineProps<{
        user: User;
        reversed?: boolean;
    }>(),{
        reversed: false,
    });


    const { open } = useModal(UserInfo, {
        user: props.user,
    });

    const displayName = computed(() => {
        let displayName = 'Unknown User';
        const names = [props.user.name, props.user.nickname];

        for (let i = 0; i < names.length; i++) {
            if (names[i]) {
                displayName = names[i];
                break;
            }
        }

        return displayName;
    });

    const showNickName = computed(() => {
        return props.user && props.user.name && props.user.nickname ? true : false;
    });

</script>