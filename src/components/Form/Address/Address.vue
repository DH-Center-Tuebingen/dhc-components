<template>
    <div class="rounded-3 p-3 border bg-white position-relative">
        <div class="d-flex flex-row gap-2">
            <div class="flex-grow-1">
                <label for="street">
                    {{ t('street') }}
                </label>
                <String
                    ref="streetRef"
                    name="street"
                    :disabled="props.disabled"
                    :default-value="props.defaultValue.street || ''"
                    @change="handleChange('street', $event)"
                    @error="updateErrors"
                />
            </div>
            <div>
                <label for="housenumber">
                    {{ t('housenumber') }}
                </label>
                <String
                    ref="housenumberRef"
                    name="housenumber"
                    :disabled="props.disabled"
                    :default-value="props.defaultValue.housenumber || ''"
                    @change="handleChange('housenumber', $event)"
                    @error="updateErrors"
                />
            </div>
        </div>
        <div class="d-flex flex-row gap-2">
            <div>
                <label for="postalcode">
                    {{ t('postalcode') }}
                </label>
                <String
                    ref="postalRef"
                    name="postalcode"
                    :disabled="props.disabled"
                    :default-value="props.defaultValue.postalcode || ''"
                    :pattern="'\\d{5}'"
                    @change="handleChange('postalcode', $event)"
                    @error="updateErrors"
                />
            </div>
            <div class="flex-grow-1">
                <label for="city">
                    {{ t('city') }}
                </label>
                <String
                    ref="cityRef"
                    name="city"
                    :disabled="props.disabled"
                    :default-value="props.defaultValue.city || ''"
                    @change="handleChange('city', $event)"
                    @error="updateErrors"
                />
            </div>
        </div>
        <div class="d-flex flex-row gap-2">
            <div class="flex-fill">
                <label for="country">
                    {{ t('country') }}
                </label>
                <String
                    ref="countryRef"
                    name="country"
                    :disabled="props.disabled"
                    :default-value="props.defaultValue.country || ''"
                    @change="handleChange('country', $event)"
                    @error="updateErrors"
                />
            </div>
            <div class="flex-fill">
                <label for="state">
                    {{ t('state') }}
                </label>
                <String
                    ref="stateRef"
                    name="state"
                    :disabled="props.disabled"
                    :default-value="props.defaultValue.state || ''"
                    @change="handleChange('state', $event)"
                    @error="updateErrors"
                />
            </div>
            <div class="flex-fill">
                <label for="county">
                    {{ t('county') }}
                </label>
                <String
                    ref="countyRef"
                    name="county"
                    :disabled="props.disabled"
                    :default-value="props.defaultValue.county || ''"
                    @change="handleChange('county', $event)"
                    @error="updateErrors"
                />
            </div>
        </div>
        <List
            v-if="geocodingResults.length > 0"
            class="position-absolute top-100 mt-1"
            :items="geocodingResults"
            @executed="geocodingResults = []"
        >
            <template #item="{item}">
                <div>
                    <div
                        v-if="item.address.building && item.address.building != item.address.house_number"
                        class="fw-medium"
                    >
                        {{ item.address.building }}
                    </div>
                    <div
                        :class="{'small': item.address.building && item.address.building != item.address.house_number}"
                        class="d-flex gap-1"
                    >
                        <span v-if="item.address.road">
                            {{ item.address.road }} {{ item.address.house_number }}
                        </span>
                        <span
                            v-if="item.address.road && item.address.postcode"
                            class="text-secondary"
                        >
                            &bull;
                        </span>
                        <span>
                            {{ item.address.postcode }} {{ item.address.city || item.address.town || item.address.village }}
                        </span>
                    </div>
                    <div class="text-secondary small">
                        {{ item.address.state }}, {{ item.address.country }}
                    </div>
                </div>
            </template>
        </List>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import { initI18n } from '@/i18n/i18n';

    import { geocodingSearch } from '@/utils/fetch';
    import { debounce } from '@/utils/timing';

    import { NominatimObject } from '@/types/Geocoding';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import String from '../String/String.vue';
    import List from '@/components/Layout/List/List.vue';

    import { ChangeEvent } from '../Attribute/definitions';
    import { AddressProps, AddressValue, AddressValueKeys } from './definitions';
    import { toSearchString } from '@/utils/geocoding';

    const props = withDefaults(defineProps<AddressProps>(), {
        name: 'Address',
        disabled: false,
        required: false,
        defaultValue: {},
    });

    const geocodingResults = ref<Partial<NominatimObject>[]>([]);

    const emit = defineEmits(['change']);

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    // @ts-ignore
    const t = i18n.global.t;

    const isValid = ref<boolean>(false);
    const isDirty = ref<boolean>(false);
    const data = ref<AddressValue>(props.defaultValue);

    const validationErrors = ref<Partial<Record<AddressValueKeys, string[]>>>({});
    const streetRef = ref<typeof String | null>(null);
    const housenumberRef = ref<typeof String | null>(null);
    const postalRef = ref<typeof String | null>(null);
    const cityRef = ref<typeof String | null>(null);
    const countryRef = ref<typeof String | null>(null);
    const countyRef = ref<typeof String | null>(null);
    const stateRef = ref<typeof String | null>(null);

    const reset = (value: AddressValue) => {
        value = value || props.defaultValue;
        streetRef.value?.reset(value.street);
        housenumberRef.value?.reset(value.housenumber);
        postalRef.value?.reset(value.postalcode);
        cityRef.value?.reset(value.city);
        countryRef.value?.reset(value.country);
        countyRef.value?.reset(value.county);
        stateRef.value?.reset(value.state);
    };

    const undirty = (value: AddressValue) => {
        value = value || validatedValue.value;
        streetRef.value?.undirty(value.street);
        housenumberRef.value?.undirty(value.housenumber);
        postalRef.value?.undirty(value.postalcode);
        cityRef.value?.undirty(value.city);
        countryRef.value?.undirty(value.country);
        countyRef.value?.undirty(value.county);
        stateRef.value?.undirty(value.state);
    };

    const handleChange = debounce(async (from: AddressValueKeys, event: ChangeEvent) => {
        data.value[from] = event.value;
        console.log();
        const results: NominatimObject[] = await geocodingSearch(toSearchString(data.value));
        geocodingResults.value = results.slice(0, 10).map(result => {
            return {
                address: result.address,
                action: () => {
                    if(result.address) {
                        if(result.address.road) {
                            data.value.street = result.address.road;
                            streetRef.value?.externalChange(result.address.road);
                        }
                        if(result.address.house_number) {
                            data.value.housenumber = result.address.house_number.toString();
                            housenumberRef.value?.externalChange(result.address.house_number);
                        }
                        if(result.address.postcode) {
                            data.value.postalcode = result.address.postcode
                            postalRef.value?.externalChange(result.address.postcode);
                        }
                        if(result.address.city) {
                            data.value.city = result.address.city;
                            cityRef.value?.externalChange(result.address.city);
                        } else if(result.address.town) {
                            data.value.city = result.address.town;
                            cityRef.value?.externalChange(result.address.town);
                        } else if(result.address.village) {
                            data.value.city = result.address.village;
                            cityRef.value?.externalChange(result.address.village);
                        }
                        if(result.address.state) {
                            data.value.state = result.address.state;
                            stateRef.value?.externalChange(result.address.state);
                        }
                        if(result.address.country) {
                            data.value.country = result.address.country;
                            countryRef.value?.externalChange(result.address.country);
                        }
                        if(result.address.county) {
                            data.value.county = result.address.county;
                            countyRef.value?.externalChange(result.address.county);
                        }
                    }
                }
            }
        });
        // TODO set correct dirty/valid state
        emit('change', {
            valid: event.valid,
            dirty: event.dirty,
            value: data.value,
        });
    });

    const updateErrors = (from: AddressValueKeys, errors: string[]) => {
        validationErrors.value[from] = errors.slice();
    };
</script>

<style scoped>
</style>