export interface NominatimObject {
    'place_id': number;
    'licence': string;
    'osm_type': string;
    'osm_id': number;
    'lat': string | number;
    'lon': string | number;
    'category': string;
    'type': string;
    'place_rank': number;
    'importance': number;
    'addresstype': string;
    'name': string;
    'display_name': string;
    'address': {
        'building': string;
        'house_number': string | number;
        'road': string;
        'quarter': string;
        'town': string;
        'city': string;
        'village': string;
        'county': string;
        'state': string;
        'ISO3166-2-lvl4': string;
        'postcode': string;
        'country': string;
        'country_code': string;
    };
    'boundingbox': string[];
}