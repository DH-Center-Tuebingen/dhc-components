<template>
    <div class="card p-3">
        <div class="card-body">
            <h2 class="fw-bold card-title mb-4">
                {{ title }}
            </h2>
            <form
                @submit.prevent="login"
                class="d-flex flex-column gap-2"
            >
                <div class="mb-2">
                    <label
                        for="email"
                        class="mb-2"
                    >
                        <i class="text-muted fas fa-fw fa-user me-2"></i>
                        {{ userLabel.text }}
                    </label>

                    <input
                        id="email"
                        type="text"
                        class="form-control"
                        :class="errorClass"
                        :value="username"
                        @input="updateUsername"
                        name="email"
                        autocomplete="username"
                        required
                        autofocus
                    >
                </div>

                <div>
                    <label
                        for="password"
                        class="mb-2"
                    >
                        <i class="text-muted fas fa-fw fa-unlock-alt me-2"></i>
                        {{ passwordLabel.text }}
                    </label>

                    <input
                        id="password"
                        type="password"
                        class="form-control"
                        :class="errorClass"
                        :value="password"
                        @input="updatePassword"
                        name="password"
                        autocomplete="current-password"
                        required
                    >
                </div>

                <div class="mt-3">
                    <Alert
                        v-if="error"
                        :type="message.type"
                        :message="message.text"
                    />
                </div>

                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <div class="checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    name="remember"
                                    v-model="stayLoggedIn"
                                >
                                {{ stayLoggedIn.text }}
                            </label>
                        </div>
                    </div>
                    <!-- 
                        <LoadingButton
                            class="btn btn-primary"
                            :loading="loading"
                        >
                            {{ submitLabelText }}
                        </LoadingButton> -->
                </div>
            </form>
        </div>
    </div>
</template>

<script
    lang='ts'
    setup
>


    export interface TextWithIcon {
        text: string;
        icon: string;
    }

    interface LoginProps {
        invalidClass?: string;
        loading: boolean;
        error: boolean
        username: string;
        password: string;
        message?: string;
        passwordLabel: TextWithIcon;
        stayLoggedIn: boolean;
        stayLoggedInText: string;
        submitText: string;
        title: string;
        userLabel: TextWithIcon;
    }


    import {
        computed
    } from 'vue'

    // import { defineProps } from 'vue'
    // import type { LoginProps } from './Login.d.ts'

    const props = withDefaults(defineProps<LoginProps>(), {
        invalidClass: 'is-invalid'
    })

    const emit = defineEmits([
        'update:username',
        'update:password',
        'login'
    ])


    const errorClass = computed(() => {
        return props.error ? props.invalidClass : ''
    })
    
    function updatePassword(event: Event){
        
        const target = event.currentTarget as HTMLInputElement
        if(target){
            emit('update:password',target.value)
        }
    }

</script>

<style
    lang='scss'
    scoped
></style>