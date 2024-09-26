<template>
    <a
        href="#"
        class="text-body text-decoration-none"
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

<script lang="ts">

    import { computed } from 'vue';

    export default {
        props: {
            user: {
                type: Object,
                required: true,
            }
        },
        setup(props) {

            const displayName = computed(() => {
                let displayName = 'Unknown User';
                const names = [props.user.name, props.user.nickname];

                for(let i = 0; i < names.length; i++) {
                    if(names[i]) {
                        displayName = names[i];
                        break;
                    }
                }

                return displayName;
            });

            const showNickName = computed(() => {
                return props.user && props.user.name && props.user.nickname ? true : false;
            });

            return {
                showUserInfo,
                displayName,
                showNickName,
            };
        },
    };
</script>