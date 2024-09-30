<template>
    <div class="user-info">
        <div class="text-center">
            <UserAvatar
                :user="user"
                :size="128"
            />
            <h3 class="mb-0 mt-1">
                {{ user.name }}
            </h3>
            <h6 class="fw-normal text-muted">
                {{ user.nickname }}
            </h6>
        </div>
        <div class="d-flex flex-row justify-content-center gap-5">
            <dl class="mb-0 flex-grow-1 text-end">
                <dt>
                    {{ t('global.user.member_since') }}
                </dt>
                <dd>
                    <span
                        id="user-member-since"
                        :title="user.created_at"
                    >
                        {{ formatDate(user.created_at) }}
                    </span>
                    <br>
                    <!-- eslint-disable-->
                    <span
                        v-if="state.isDeactivated"
                        class="small text-muted bg-warning rounded px-2 py-1"
                        :title="user.deleted_at"
                        v-html="t('global.user.deactivated_since', { dt: formatDate(user.deleted_at) })"
                    />
                    <!-- eslint-enable-->
                </dd>
            </dl>
            <div class="border" />
            <dl class="mb-0 flex-grow-1">
                <dt>
                    {{ t('global.email') }}
                </dt>
                <dd>
                    <a :href="`mailto:${user.email}`">
                        {{ user.email }}
                    </a>
                </dd>
                <dt v-if="hasPhone">
                    {{ t('global.phonenumber') }}
                </dt>
                <dd v-if="hasPhone">
                    <a :href="`tel:${user.metadata?.phonenumber}`">
                        {{ user.metadata?.phonenumber }}
                    </a>
                </dd>
                <dt v-if="hasOrcid">
                    {{ t('global.orcid') }}
                </dt>
                <dd v-if="hasOrcid">
                    <a
                        :href="`https://orcid.org/${user.metadata?.orcid}`"
                        target="_blank"
                    >
                        {{ user.metadata?.orcid }}
                    </a>
                </dd>
            </dl>
        </div>
        <hr>
        <div class="d-flex flex-row justify-content-center gap-5">
            <dl class="mb-0 flex-grow-1 text-end">
                <dt>
                    {{ t('global.user.role') }}
                    <i class="fas fa-fw fa-id-card-clip" />
                </dt>
                <dd>
                    {{ user.metadata?.role || t('global.user.not_assigned') }}
                </dd>
                <dt>
                    {{ t('global.user.field') }}
                    <i class="fas fa-fw fa-chalkboard-user" />
                </dt>
                <dd>
                    {{ user.metadata?.field || t('global.user.not_assigned') }}
                </dd>
            </dl>
            <div class="border" />
            <dl class="mb-0 flex-grow-1">
                <dt>
                    <i class="fas fa-fw fa-school" />
                    {{ t('global.user.institution') }}
                </dt>
                <dd>
                    {{ user.metadata?.institution || t('global.user.not_assigned') }}
                </dd>
                <dt>
                    <i class="fas fa-fw fa-users-between-lines" />
                    {{ t('global.user.department') }}
                </dt>
                <dd>
                    {{ user.metadata?.department || t('global.user.not_assigned') }}
                </dd>
            </dl>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup
>
    import type { User } from 'src/types/User';

    import {
        computed,
        reactive,
    } from 'vue';

    import {
        Time
    } from 'dhc-utils';

    import UserAvatar from './UserAvatar.vue';
    import { useI18n } from 'vue-i18n';

    const props = defineProps<{
        user: User;
    }>();

    const formatDate = Time.formatDate;

    const state = reactive({
        isDeactivated: !!props.user.deleted_at,
        hasMetadata: !!props.user.metadata,
    });

    const hasPhone = computed(_ => props.user?.metadata && !!props.user.metadata.phonenumber);
    const hasOrcid = computed(_ => props.user?.metadata && !!props.user.metadata.orcid);

    const t = useI18n().t; 
</script>
