<template>
    <div class="alert" :class="classes" role="alert">
        <div v-if="hasIcon" :class="iconWrapperClasses">
            <i class="fas" :class="iconClasses"></i>
            <span class="fw-medium">
                {{ icontext }}
            </span>
        </div>
        <div class="alert-message" v-html="message"></div>
    </div>
</template>


<script lang="ts" setup>
import { computed, reactive } from 'vue';

type AlertType = 'success' | 'note' | 'info' | 'warning' | 'error' | 'mono';



const props = defineProps<{
    message: string;
    type?: AlertType;
    noicon?: boolean;
    icontext?: string;
    toast?: boolean;
}>();


const supportsIcon = computed(_ => {
    switch (props.type) {
        case 'success':
        case 'note':
        case 'info':
        case 'warning':
        case 'error':
            return true;
        case 'mono':
        default:
            return false;
    }
})

const hasIcon = computed(_ => {
    return !props.noicon && supportsIcon;
}),

    hasIconText = computed(_ => {
        return hasIcon.value && props.icontext;
    })

const classes = computed(() => {
    let classes = [];

    type Map = {
        [key: string]: string;
    }

    const classMap: Map = {
        note: 'info',
        error: 'danger',
        mono: 'secondary',
    }

    let classType = 'primary'
    if (classMap[props.type as string])
        {classType = classMap[props.type as string];}

    let typeClass = `alert-${classType}`;
    classes.push(typeClass);


    // if (hasIcon.value) {
    //     classes.push('d-flex');
    //     if (hasIconText.value) {
    //         classes.push('flex-column');
    //     } else {
    //         classes.push('flex-row');
    //     }
    // }

    return classes;
})

const iconClasses = computed(_ => {
    let classes: String[] = [];
    if (!hasIcon.value) {return classes;}
    switch (props.type) {
        case 'success':
            classes.push('fa-check');
            break;
        case 'note':
            classes.push('fa-lightbulb');
            break;
        case 'info':
            classes.push('fa-info-circle');
            break;
        case 'warning':
            classes.push('fa-exclamation-triangle');
            break;
        case 'error':
            classes.push('fa-times');
            break;
    }
    if (hasIconText.value) {
        classes.push('me-2');
    }
    return classes;
})

const iconWrapperClasses = computed(_ => {
    let classes: String[] = [];
    if (!hasIcon.value) {return classes;}
    if (!hasIconText.value) {
        classes.push('me-2');
    }
    return classes;
})


// import {
//     computed,
//     reactive,
//     toRefs,
// } from 'vue';

// export default {
//     props: {
//         message: {
//             required: true,
//             type: String,
//         },
//         type: {
//             required: false,
//             type: String,
//             default: '',
//         },
//         noicon: {
//             required: false,
//             type: Boolean,
//             default: true,
//         },
//         icontext: {
//             required: false,
//             type: String,
//         }
//     },
//     setup(props, context) {
//         const {
//             message,
//             type,
//             noicon,
//             icontext,
//         } = toRefs(props);

//         // FUNCTIONS

//         // DATA
//         const state = reactive({
//             hasIcon: computed(_ => {
//                 return !noicon.value && state.supportsIcon;
//             }),


//             classes: computed(_ => {
//                 let classes = [];
//                 switch (type.value) {
//                     case 'success':
//                         classes.push('alert-success');
//                         break;
//                     case 'note':
//                     case 'info':
//                         classes.push('alert-info');
//                         break;
//                     case 'warning':
//                         classes.push('alert-warning');
//                         break;
//                     case 'error':
//                         classes.push('alert-danger');
//                         break;
//                     case 'mono':
//                         classes.push('alert-secondary');
//                         break;
//                     default:
//                         classes.push('alert-primary');
//                         break;
//                 }

//                 if (state.hasIcon) {
//                     classes.push('d-flex');
//                     if (state.hasIconText) {
//                         classes.push('flex-column');
//                     } else {
//                         classes.push('flex-row');
//                     }
//                 }

//                 return classes;
//             }),


//         });

//         // RETURN
//         return {
//             // HELPERS
//             // PROPS
//             message,
//             icontext,
//             // LOCAL
//             // STATE
//             state,
//         }
//     },
// }
</script>

<style lang="scss" scoped>
.alert {
    display: flex;

    border-radius: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.5;
    position: relative;
    margin-bottom: 1rem;
    border: 1px solid transparent;


    .alert-message {
        flex: 1 1 auto;
        padding: 0.75rem 1rem;
    }

    .close-button {
        padding: 0.75rem 1rem;

    }

    &.alert-success {
        color: #0f5132;
        background-color: #d1e7dd;
        border-color: #badbcc;
    }

    &.alert-info {
        color: #055160;
        background-color: #d1ecf1;
        border-color: #bee5eb;
    }

    &.alert-warning {
        color: #664d03;
        background-color: #fff3cd;
        border-color: #ffeeba;
    }

    &.alert-danger {
        color: #842029;
        background-color: #f8d7da;
        border-color: #f5c2c7;
    }

    &.alert-secondary {
        color: #383d41;
        background-color: #e2e3e5;
        border-color: #d6d8db;
    }

    &.alert-primary {
        color: #004085;
        background-color: #cce5ff;
        border-color: #b8daff;
    }

    &.alert-light {
        color: #818182;
        background-color: #fefefe;
        border-color: #fdfdfe;
    }

    &.alert-dark {
        color: #1b1e21;
        background-color: #d6d8d9;
        border-color: #c6c8ca;
    }
}
</style>
