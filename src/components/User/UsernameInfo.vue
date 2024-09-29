<template>
    <a
        href="#"
        class="text-body text-decoration-none"
        @click.stop.prevent="open()"
    >
        <span class="fw-medium">
            {{ displayName }}
        </span>
        <template v-if="showNickName">
            &bull;
            <span class="text-muted fw-light">
                {{ user.nickname }}
            </span>
        </template>
    </a>
</template>

<script
    lang="ts"
    setup
>

    import { User } from 'src/types/User';
    import { computed } from 'vue';
    import UserInfo from './UserInfo.vue';
    import { useModal, useModalSlot, VueFinalModal } from 'vue-final-modal';

    const props = defineProps<{
        user: User;
    }>();


    const { open } = useModal({
        component: VueFinalModal,
        slots: {
            default: useModalSlot({
                component: UserInfo,
                attrs: {
                    user: props.user,
                },
            })
        },
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