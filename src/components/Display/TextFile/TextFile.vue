<template>
    <div class="col p-5 w-100 h-100 overflow-y-auto text-break form-control">
        <template v-for="(paragraph, index) of fileParagraphs" :key="index">
            {{ paragraph }}
            <br v-if="index < fileParagraphs.length - 1" />
        </template>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import { computed, ComputedRef } from 'vue';

    const props = defineProps<{
        value: string;
    }>();

    const fileParagraphs : ComputedRef<string[]> = computed(_ => {
        return props.value ? props.value.split(/\r\n|\n/) : [];
    });

</script>