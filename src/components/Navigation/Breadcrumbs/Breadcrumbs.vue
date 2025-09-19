<template>
    <nav
        class="breadcrumbs"
        aria-label="breadcrumb"
    >
        <ol class="breadcrumb my-0 px-2 py-1 align-items-center">
            <li
                v-for="(beforeItem, index) in before"
                :key="`before-${beforeItem}-${index}`"
                class="breadcrumb-item"
                @click="emits('navigate', getBeforeIndex(index))"
            >
                <span
                    :class="getCrumbClasses()"
                    @click="emits('navigate', index)"
                >
                    <slot
                        name="beforeItem"
                        :item="beforeItem"
                        :index="getBeforeIndex(index)"
                    >

                        {{ beforeItem }}
                    </slot>
                </span>
            </li>
            <li
                v-for="(name, index) of path"
                :key="`${name}-${index}`"
                class="breadcrumb-item"
                :class="{ 'active': index == path.length - 1 }"
            >

                <span
                    v-if="index == path.length - 1"
                    :class="getCrumbActiveClasses()"
                >
                    {{ name }}
                </span>
                <button
                    v-else
                    href="#"
                    :class="getCrumbClasses()"
                    @click="emits('navigate', index)"
                >
                    {{ name }}
                </button>

            </li>
        </ol>
    </nav>
</template>

<script
    lang="ts"
    setup
>
    import { defineProps} from 'vue';

    const emits = defineEmits<{
        (e: 'navigate', index: number): void
    }>();

    const props = withDefaults(defineProps<{
        path: string[],
        before?: string[],
        crumbClasses?: string
        crumbActiveClasses?: string
    }>(), {
        before: () => [],
        crumbClasses: '',
        crumbActiveClasses: '',
    });

    const getBeforeIndex = (index: number) => {
        return index - props.before.length;
    };

    const getCrumbClasses = () => {
        return props.crumbClasses ? props.crumbClasses : 'btn btn-outline-primary fw-bold px-1 py-0 border-0';
    };

    const getCrumbActiveClasses = () => {
        return props.crumbActiveClasses ? props.crumbActiveClasses : 'fw-bold text-secondary pe-none';
    };

</script>
