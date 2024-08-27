<template>
    <div>
        <ul class="nav nav-tabs">
            <li
                v-for="(tab, index) in tabs"
                :key="`tab-button-${index}`"
                class="nav-item"
            >
                <a
                    class="nav-link"
                    @click.prevent="_ => select(index)"
                    href="#"
                    :class="{ 'active': activeTab === index }"
                >{{ tab }}</a>
            </li>
        </ul>
        <div class="tab-content">
            <div
                v-for="(tab, index) in tabs"
                :key="`tab-content-${index}`"
                :aria-labelledby="`${tab}`"
                :aria-expanded="activeTab === index"
                :aria-selected="activeTab === index"
                class="tab-pane fade"
                :class="{ 'show active': activeTab === index }"
                :data-tab="tab"
            >
                <slot :name="tabs[index]"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import { ref } from 'vue';

    export default {
        props: {
            tabs: {
                type: Array,
                required: true
            }
        },
        setup() {

            const activeTab = ref(0);

            const select = (index: number) => {
                activeTab.value = index;
            }

            return {
                activeTab,
                select,
            }
        }
    }
</script>