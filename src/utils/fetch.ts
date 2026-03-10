import axios from 'axios';

import { NominatimObject } from '@/types/Geocoding';

export const http = axios.create({
    headers: {
        common: {},
    },
});

export async function getIconClassInfo(iconClass: string) {
    return http.get(`https://iconclass.org/${iconClass}.json`, {})
    .then(response => response.data)
    .catch(e => e);
}

export async function getRismInfo(rismId: string) {
    return http.get(`https://rism.online/sources/${rismId}`, {})
    .then(response => response.data)
    .catch(e => e);
}

export async function geocodingSearch(query: string, structured: boolean = true): Promise<NominatimObject[]> {
    const params = structured ? query : `q=${query}`;
    return http.get(`http://localhost:8080/search?${params}&addressdetails=1`)
        .then(response => response.data)
        .catch(e => e);
}