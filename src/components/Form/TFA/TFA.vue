<template>
    <div class="tfa">
        <input
            :key="`tfa-input-${digit}`"
            v-for="(digit, index) in digits"
            :ref="ref => inputRefs[index] = (ref as HTMLInputElement)"
            type="text"
            maxlength="1"
            :value="digit"
            @keydown="(event) => keydown(event, index)"
            @input="(event) => input(event as InputEvent, index)"
        >
    </div>
</template>

<script setup lang="ts">
    import { computed, nextTick, onMounted, reactive, ref } from 'vue';
    const length = 6;
    const digits = ref<Array<string>>([]);

    onMounted(() => {
        for (let i = 0; i < length; i++) {
            digits.value.push('');
        }
    });

    const goLeft = (index: number) => {
        if (index > 0) {
            console.log('Focus left');
            inputRefs.value[index - 1].focus();
        } else {
            nextTick(() => {
                inputRefs.value[0].focus();
            });
        }
    };

    const goRight = (index: number) => {
        if (index < length - 1) {
            console.log('Focus right');
            inputRefs.value[index + 1].focus();
        } else {
            nextTick(() => {
                inputRefs.value[length - 1].focus();
            });
        }
    };

    const inputRefs = ref<Array<HTMLInputElement>>([]);

    const keydown = (e: KeyboardEvent, index: number) => {
        console.log('Keydown', e);
        e.stopPropagation();

        if (e.key === 'ArrowLeft') {
            goLeft(index);
        } else if (e.key === 'ArrowRight') {
            goRight(index);
        } else if (e.key === 'Backspace') {
            digits.value[index] = '';
            goLeft(index);
        } else {
            if (!e.key.match(/^[0-9]$/)) {
                return;
            }

            if (e.key.length === 1) {
                console.log('SET VALUE', e.key);
                digits.value[index] = e.key;
                goRight(index);
            }
        }
        e.preventDefault();
    };

    const input = (e: InputEvent, index: number) => {
        const target = e.target as HTMLInputElement;
        console.log('Input', target.value);
        if (!target.value.match(/^[0-9]$/)) {
            console.log('PREVENT CHANGE', target.value);
            target.value = digits.value[index] ?? '';
        }
    };

</script>

<style lang="scss" scoped>

    .tfa {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    input {
        caret-color: transparent;
        width: 3rem;
        height: 3rem;
        padding: .5rem;
        text-align: center;
        border: none;
        font-size: 1.5rem;
        border-radius: 1rem;
    }

    input:focus {
        outline: none;
        border: 2px solid var(--bs-primary);
        box-shadow: 0 0 0 3px var(--bs-primary-border-subtle);
    }

</style>