import type { Meta, StoryObj } from '@storybook/vue3';

import IconPicker from './IconPicker.vue';
import { Ref, ref } from 'vue';
import {
    faBars,
    faBell,
    faBook,
    faBookmark,
    faBriefcase,
    faBus,
    faCalendar,
    faCamera,
    faCar,
    faCheck,
    faClock,
    faComputer,
    faCrop,
    faCube,
    faDatabase,
    faEnvelope,
    faFile,
    faFilter,
    faFolder,
    faGift,
    faHeart,
    faHome,
    faImage,
    faKey,
    faKeyboard,
    faLaptop,
    faLock,
    faMap,
    faMicroscope,
    faMinus,
    faMoneyBill,
    faNewspaper,
    faPen,
    faPhone,
    faPlane,
    faPlus,
    faSearch,
    faShield,
    faSmile,
    faStar,
    faStop,
    faTag,
    faThumbsDown,
    faThumbsUp,
    faUser,
    faVideo,
    faWrench,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons/index.js';

const icons = [
    faSmile,
    faCamera,
    faSearch,
    faHome,
    faFilter,
    faStar,
    faCheck,
    faBookmark,
    faTag,
    faPhone,
    faEnvelope,
    faFolder,
    faCalendar,
    faMoneyBill,
    faStop,
    faShield,
    faLock,
    faHeart,
    faThumbsUp,
    faThumbsDown,
    faGift,
    faBook,
    faKey,
    faDatabase,
    faPlus,
    faMinus,
    faMicroscope,
    faBell,
    faBus,
    faCar,
    faPlane,
    faLaptop,
    faComputer,
    faKeyboard,
    faFile,
    faUser,
    faPen,
    faClock,
    faMap,
    faCrop,
    faCube,
    faBriefcase,
    faNewspaper,
    faImage,
    faVideo,
    faWrench,
    faBars,
]

const meta: Meta<typeof IconPicker> = {
    component: IconPicker,
    parameters: {
        docs: {
            description: {
                component: ``,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof IconPicker>;

export const Default: Story = {
    args: {
        icons
    },
    render: (args: any) => ({
        components: { IconPicker },
        setup() {

            const activeIcon: Ref<IconDefinition | null> = ref(null);
            function setActive(icon: IconDefinition) {
                activeIcon.value = icon;
            }

            return { activeIcon, args, setActive };
        },
        template: '<IconPicker v-bind="args" @select="setActive" :active="activeIcon"/>',
    }),
};

export const Columns: Story = {
    args: {
        icons,
        columns: 3
    },
    render: (args: any) => ({
        components: { IconPicker },
        setup() {

            const activeIcon: Ref<IconDefinition | null> = ref(null);
            function setActive(icon : IconDefinition) {
                activeIcon.value = icon;
            }

            return { activeIcon, args, setActive };
        },
        template: '<IconPicker v-bind="args" @select="setActive" :active="activeIcon"/>',
    }),
};

