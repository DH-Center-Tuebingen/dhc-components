import axios from 'axios';

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