import { AddressValue } from '@/components/Form/Address/definitions';

export const toSearchString = (data: AddressValue, structured: boolean = true) => {
    if(structured) {
        const queryParams = [];

        if(data.street) {
            let street = `street=${encodeURIComponent(data.street)}`;
            if(data.housenumber) {
                street += encodeURIComponent(` ${data.housenumber}`);
            }
            queryParams.push(street);
        }

        // city in AddressValue can be city, town or village fro Nominatim
        if(data.city) {
            queryParams.push(`city=${encodeURIComponent(data.city)}`);
        }

        if(data.postalcode) {
            queryParams.push(`postalcode=${encodeURIComponent(data.postalcode)}`);
        }

        if(data.state) {
            queryParams.push(`state=${encodeURIComponent(data.state)}`);
        }

        if(data.country) {
            queryParams.push(`country=${encodeURIComponent(data.country)}`);
        }

        if(data.county) {
            queryParams.push(`county=${encodeURIComponent(data.county)}`);
        }

        return queryParams.join('&');
    } else {
        return Object.values(data).join('+');
    }
}