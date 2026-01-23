<template>
    <div class="card p-3">
        <div class="card-body">
            <h2 class="fw-bold card-title mb-4">
                {{ t('login.title') }}
            </h2>
            <form
                @submit.stop.prevent="submit"
                class="d-flex flex-column gap-2 needs-validation"
                :class="{ 'was-validated': validated }"
                novalidate
            >
                <div class="mb-2">
                    <label
                        for="username"
                        class="mb-2 d-flex flex-row align-items-center gap-1"
                    >
                        <FontAwesomeIcon
                            :icon="faUser"
                            class="text-secondary"
                        />
                        {{ t('login.email_or_nick') }}
                    </label>

                    <input
                        id="username"
                        type="text"
                        class="form-control"
                        name="username"
                        v-model="username"
                        :disabled="loading"
                        autocomplete="username"
                        required
                        autofocus
                    >
                    <div class="invalid-feedback">
                        {{ t('validation.field_is_required') }}
                    </div>
                </div>

                <div>
                    <label
                        for="password"
                        class="mb-2 d-flex flex-row align-items-center gap-1"
                    >
                        <FontAwesomeIcon
                            :icon="faUnlockAlt"
                            class="text-secondary"
                        />
                        {{ t('login.password') }}
                    </label>

                    <input
                        id="password"
                        type="password"
                        class="form-control"
                        v-model="password"
                        :disabled="loading"
                        name="password"
                        autocomplete="current-password"
                        required
                    >
                    <div class="invalid-feedback">
                        {{ t('validation.field_is_required') }}
                    </div>
                </div>

                <div
                    class="mt-3"
                    v-if="error"
                >
                    <Alert
                        type="error"
                        :message="errorMessage"
                    />
                </div>

                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <div class="checkbox">
                            <label>
                                <input
                                    id="remember-me"
                                    class="form-check-input me-2"
                                    type="checkbox"
                                    name="remember"
                                    :disabled="loading"
                                    v-model="stayLoggedIn"
                                >
                                <label
                                    class="form-check-label user-select-none clickable cursor-pointer"
                                    for="remember-me"
                                >
                                    {{ t('login.remember_me') }}
                                </label>
                            </label>
                        </div>
                    </div>
                    <LoadingButton
                        :loading="loading"
                        :color="'primary'"
                    >
                        {{ t('login.title') }}
                    </LoadingButton>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang='ts' setup>
    import {
        computed,
        ref
    } from 'vue';

    import { useI18n } from 'vue-i18n';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import {
        faUnlockAlt,
        faUser,
    } from '@fortawesome/free-solid-svg-icons';

    import Alert from '../Alert/Alert.vue';
    import LoadingButton from '../Button/LoadingButton/LoadingButton.vue';

    const { t } = useI18n();

    const props = withDefaults(defineProps<{
        invalidClass?: string;
        loading: boolean;
        errorMessage?: string;
    }>(), {
        errorMessage: '',
        invalidClass: 'is-invalid',
    });

    const emit = defineEmits([
        'login',
    ]);

    const username = ref('');
    const password = ref('');
    const stayLoggedIn = ref(false);
    const validated = ref(false);

    const submit = (event: Event) => {
        const form: HTMLFormElement = event.currentTarget as HTMLFormElement;

        validated.value = true;
        if(form.checkValidity()) {
            login();
        }
    };

    const login = () => {
        emit('login', {
            username: username.value,
            password: password.value,
            stayLoggedIn: stayLoggedIn.value
        });
    };

    const error = computed(_ => {
        return props.errorMessage !== undefined && props.errorMessage.length > 0;
    });
</script>

<style lang='scss' scoped></style>