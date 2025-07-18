<template>
    <div class="datepicker">
        <DatePicker
            :id="name"
            :uid="name"
            v-model="validatedValue"
            v-bind="modeProperties"
            class="w-100"
            input-class="form-control"
            value-type="date"
            :name="name"
            :auto-apply="true"
            :clearable="true"
            :disabled="disabled"
            :enable-time-picker="false"
            :format="'dd.MM.yyyy'"
            :text-input="true"
            :utc="'preserve'"
            :week-numbers="{'type': 'iso'}"
            :week-num-name="'&nbsp;'"
            @update:model-value="handleInput"
        />
    </div>
</template>

<script setup lang="ts">
    import { computed, defineProps, onMounted, watch } from 'vue';

    import { array, string } from 'yup';

    import { useField } from 'vee-validate';

    import DatePicker from '@vuepic/vue-datepicker';

    import { validate } from '../../../utils/date';

    import { DatepickerProps, DatepickerOptions } from './definitions';

    // const modelValue: ModelRef<string | Array<string> | undefined> = defineModel();

    const props = withDefaults(defineProps<DatepickerProps>(),{});

    onMounted(() => {
        setInitialValue();
    });

    const isRange = computed(() => props.mode == 'range');
    const isDate = computed(() => props.mode == 'date' || !props.mode || !isRange.value);

    const emit = defineEmits(['change']);

    const modeProperties = computed(() => {
        const defaultProps:DatepickerOptions = {
            range: false,
        };
        const modeProps:DatepickerOptions = {};

        if(isRange.value) {
            modeProps.range = true;
            modeProps.multiCalendars = true;
        }

        return {
            ...defaultProps,
            ...modeProps,
        };
    });

    const setInitialValue = () => {
        let modeValue: string | Array<string> | null = null;
        if(!props.defaultValue) {
            return modeValue;
        }
        if(isDate.value) {
            modeValue = typeof props.defaultValue == 'string' ? props.defaultValue : null;
        } else if(isRange.value) {
            modeValue = Array.isArray(props.defaultValue) ? props.defaultValue : null;
        }

        return modeValue;
    };

    const reset = (value: string | Array<string> | null) => {
        value = value || props.defaultValue;
        resetField({
            value: value,
        });
    };

    const undirty = (value: string | Array<string> | null) => {
        value = value || validatedValue.value;
        reset(value);
    };

    const handleInput = (date: string | Array<string> | null) => {
        handleChange(date);
        const isValid = validate(validatedValue.value);
        console.log("[Date] changed value to", isValid, meta.valid, meta.dirty, validatedValue.value);
        emit('change', {
            valid: isValid,
            dirty: meta.dirty,
            value: validatedValue.value,
        });
    };

    let rules = props.mode == 'range' ? array() : string();
    if(props.required) {
        rules = rules.required();
    }
    const {
        value: validatedValue,
        meta,
        resetField,
        handleChange,
    } = useField(`date_${props.name}`, rules, {
        initialValue: setInitialValue(),
    });

    watch(() => props.mode, () => {
        setInitialValue();
    });
</script>

<style src="@vuepic/vue-datepicker/dist/main.css"></style>

<style lang="scss" scoped>
    .datepicker {
        height: 400px;
    }

    $enable-rounded: true !default;
    $body-bg: #f8f9fa !default;
    $text-color: #6c757d !default;
    $input-border-color: #dee2e6 !default;
    $input-border-radius: 0.25rem;
    $font-size-base: 0.9rem;
    $font-family-sans-serif: "Raleway", sans-serif;
    :root {
        /* General */
        --dp-font-family: var(--bs-font-sans-serif);
        --dp-border-radius: 4px; /*Configurable border-radius*/
        --dp-cell-border-radius: 4px; /*Specific border radius for the calendar cell*/
        --dp-common-transition: all 0.1s ease-in; /*Generic transition applied on buttons and calendar cells*/

        /* Sizing */
        --dp-button-height: 35px; /*Size for buttons in overlays*/
        --dp-month-year-row-height: 35px; /*Height of the month-year select row*/
        --dp-month-year-row-button-size: 35px; /*Specific height for the next/previous buttons*/
        --dp-button-icon-height: 20px; /*Icon sizing in buttons*/
        --dp-cell-size: 35px; /*Width and height of calendar cell*/
        --dp-cell-padding: 5px; /*Padding in the cell*/
        --dp-common-padding: 10px; /*Common padding used*/
        --dp-input-icon-padding: 35px; /*Padding on the left side of the input if icon is present*/
        --dp-input-padding: 6px 30px 6px 12px; /*Padding in the input*/
        --dp-menu-min-width: 260px; /*Adjust the min width of the menu*/
        --dp-action-buttons-padding: 2px 5px; /*Adjust padding for the action buttons in action row*/
        --dp-row-margin:  5px 0; /*Adjust the spacing between rows in the calendar*/
        --dp-calendar-header-cell-padding:  0.5rem; /*Adjust padding in calendar header cells*/
        --dp-two-calendars-spacing:  10px; /*Space between multiple calendars*/
        --dp-overlay-col-padding:  3px; /*Padding in the overlay column*/
        --dp-time-inc-dec-button-size:  32px; /*Sizing for arrow buttons in the time picker*/
        --dp-menu-padding: 6px 8px; /*Menu padding*/

        /*Font sizes*/
        --dp-font-size: var(--bs-body-font-size); /*Default font-size*/
        --dp-preview-font-size: calc(var(--bs-body-font-size) * 0.8); /*Font size of the date preview in the action row*/
        --dp-time-font-size: calc(var(--bs-body-font-size) * 0.8); /*Font size in the time picker*/

        /*Transitions*/
        --dp-animation-duration: 0.1s; /*Transition duration*/
        --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1); /*Timing on menu appear animation*/
        --dp-transition-timing: ease-out; /*Timing on slide animations*/
    }

    .dp__theme_light {
        --dp-background-color: var(--bs-body-bg);
        --dp-text-color: var(--bs-body-color);
        --dp-hover-color: #f3f3f3;
        --dp-hover-text-color: #212121;
        --dp-hover-icon-color: #959595;
        --dp-primary-color: var(--bs-primary);
        --dp-primary-disabled-color: #6bacea;
        --dp-primary-text-color: var(--bs-light);
        --dp-secondary-color: var(--bs-secondary);
        --dp-border-color: var(--bs-border-color);
        --dp-menu-border-color: #ddd;
        --dp-border-color-hover: #aaaeb7;
        --dp-border-color-focus: #aaaeb7;
        --dp-disabled-color: #f6f6f6;
        --dp-scroll-bar-background: #f3f3f3;
        --dp-scroll-bar-color: #959595;
        --dp-success-color: var(--bs-success);
        --dp-success-color-disabled: #a3d9b1;
        --dp-icon-color: #959595;
        --dp-danger-color: var(--bs-danger);
        --dp-marker-color: #ff6f60;
        --dp-tooltip-color: #fafafa;
        --dp-disabled-color-text: #8e8e8e;
        --dp-highlight-color: rgb(25 118 210 / 10%);
        --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
        --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
        --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
    }

    .dp__theme_dark {
        --dp-background-color: var(--bs-body-bg);
        --dp-text-color: var(--bs-body-color);
        --dp-hover-color: #484848;
        --dp-hover-text-color: #fff;
        --dp-hover-icon-color: #959595;
        --dp-primary-color: #005cb2;
        --dp-primary-disabled-color: #61a8ea;
        --dp-primary-text-color: #fff;
        --dp-secondary-color: #a9a9a9;
        --dp-border-color: #2d2d2d;
        --dp-menu-border-color: #2d2d2d;
        --dp-border-color-hover: #aaaeb7;
        --dp-border-color-focus: #aaaeb7;
        --dp-disabled-color: #737373;
        --dp-disabled-color-text: #d0d0d0;
        --dp-scroll-bar-background: #212121;
        --dp-scroll-bar-color: #484848;
        --dp-success-color: #00701a;
        --dp-success-color-disabled: #428f59;
        --dp-icon-color: #959595;
        --dp-danger-color: #e53935;
        --dp-marker-color: #e53935;
        --dp-tooltip-color: #3e3e3e;
        --dp-highlight-color: rgb(0 92 178 / 20%);
        --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
        --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
        --dp-range-between-border-color: var(--dp-hover-color, #fff);
    }

    $namespace: 'mx';
    .#{$namespace}-datepicker-main {
        font: $font-size-base $font-family-sans-serif;
        color: $text-color;
        background-color: $body-bg;
        border: 1px solid;
        @if $enable-rounded {
            border-color: $input-border-color !important;
            border-radius: $input-border-radius !important;
        }
    }

    .#{$namespace}-datepicker-col-5 {
        position: initial;
        display: initial;
        width: 41.6666666667%;
    }
</style>