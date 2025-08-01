export const units: Record<string, Record<'default' | 'units', any>> = {
    'area': {
        'default':'m\u00b2',
        'units': [
            {
                'label': 'square_centimetre',
                'symbol': 'cm\u00b2',
                'conversion': 0.0001
            },
            {
                'label': 'square_metre',
                'symbol': 'm\u00b2',
                'conversion': 1
            },
            {
                'label': 'square_kilometre',
                'symbol': 'km\u00b2',
                'conversion': 1000000
            },
            {
                'label': 'square_inch',
                'symbol': 'in\u00b2'
                ,'conversion': 0.00064516
            },
            {
                'label': 'square_feet',
                'symbol': 'ft\u00b2',
                'conversion': 0.09290304
            },
            {
                'label': 'square_yard',
                'symbol': 'yd\u00b2',
                'conversion': 0.83612736
            },
            {
                'label': 'acre',
                'symbol': 'ac',
                'conversion': 4046.8564224
            },
            {
                'label': 'square_mile',
                'symbol': 'mi\u00b2',
                'conversion': 2589988.110336
            }
        ]
    },
    'force': {
        'default': 'N',
        'units': [
            {
                'label': 'newton',
                'symbol': 'N',
                'conversion': 1
            },
            {
                'label': 'kilonewton',
                'symbol': 'kN',
                'conversion': 1000
            }
        ]
    },
    'length': {
        'default': 'm',
        'units': [
            {
                'label': 'nanometre',
                'symbol': 'nm',
                'conversion': 1.0e-9
            },
            {
                'label': 'micrometre',
                'symbol': '\u00b5m',
                'conversion': 1.0e-6
            },
            {
                'label': 'millimetre',
                'symbol': 'mm',
                'conversion': 0.001
            },
            {
                'label': 'centimetre',
                'symbol': 'cm',
                'conversion': 0.01
            },
            {
                'label': 'metre',
                'symbol': 'm',
                'conversion': 1
            },
            {
                'label': 'kilometre',
                'symbol': 'km',
                'conversion': 1000
            },
            {
                'label': 'inch',
                'symbol': 'in',
                'conversion': 0.0254
            },
            {
                'label': 'feet',
                'symbol': 'ft',
                'conversion': 0.3048
            },
            {
                'label': 'yard',
                'symbol': 'yd',
                'conversion': 0.9144
            },
            {
                'label': 'mile',
                'symbol': 'mi',
                'conversion': 1609.344
            }
        ]
    },
    'mass': {
        'default': 'g',
        'units': [
            {
                'label': 'milligram',
                'symbol': 'mg',
                'conversion': 0.001
            },
            {
                'label': 'gram',
                'symbol': 'g',
                'conversion': 1
            },
            {
                'label': 'kilogram',
                'symbol': 'kg',
                'conversion': 1000
            },
            {
                'label': 'ton',
                'symbol': 't',
                'conversion': 1000000
            },
            {
                'label': 'ounce',
                'symbol': 'oz',
                'conversion': 28.349523125
            },
            {
                'label': 'pound',
                'symbol': 'lb',
                'conversion': 453.59237
            }
        ]
    },
    'pressure': {
        'default': 'Pa',
        'units': [
            {
                'label': 'pascal',
                'symbol': 'Pa',
                'conversion': 1
            },
            {
                'label': 'kilopascal',
                'symbol': 'kPa',
                'conversion': 1000
            },
            {
                'label': 'hectopascal',
                'symbol': 'hPa',
                'conversion': 100
            },
            {
                'label': 'bar',
                'symbol': 'bar',
                'conversion':100000
            },
            {
                'label': 'decibar',
                'symbol': 'dbar',
                'conversion': 10000
            },
            {
                'label': 'millibar',
                'symbol': 'mbar',
                'conversion': 100
            },
            {
                'label': 'pound_per_square_inch',
                'symbol': 'psi',
                'conversion': 6894.757
            },
            {
                'label': 'torr',
                'symbol': 'Torr',
                'conversion': 133.3224
            },
            {
                'label': 'technical_atmosphere',
                'symbol': 'at',
                'conversion': 98066.5
            },
            {
                'label': 'standard_atmosphere',
                'symbol': 'atm',
                'conversion': 101325
            }
        ]
    },
    'speed': {
        'default': 'm\/s',
        'units': [
            {
                'label': 'metre_per_second',
                'symbol': 'm\/s',
                'conversion': 1
            },
            {
                'label': 'kilometre_per_hour',
                'symbol': 'km\/h',
                'conversion': 0.2777777777777778
            },
            {
                'label': 'mile_per_hour',
                'symbol': 'mph',
                'conversion': 0.44704
            }
        ]
    },
    'temperature': {
        'default': 'K',
        'units': [
            {
                'label': 'kelvin',
                'symbol': 'K',
                'conversion': 1
            },
            {
                'label': 'celsius',
                'symbol': '\u00b0C',
                'conversion': 274.15
            },
            {
                'label': 'fahrenheit',
                'symbol': '\u00b0F',
                'conversion': 255.92777777777778
            },
            {
                'label': 'r\u00e9aumur',
                'symbol': '\u00b0R\u00e9',
                'conversion': 274.4
            }
        ]
    },
    'time':{
        'default': 's',
        'units':[
            {
                'label': 'second',
                'symbol': 's',
                'conversion': 1
            },
            {
                'label': 'minute',
                'symbol': 'min',
                'conversion': 60
            },
            {
                'label': 'hour',
                'symbol': 'h',
                'conversion': 3600
            },
            {
                'label': 'day',
                'symbol': 'd',
                'conversion': 86400
            },
            {
                'label': 'year',
                'symbol': 'a',
                'conversion': 31536000
            }
        ]
    },
    'volume': {
        'default': 'm\u00b3',
        'units': [
            {
                'label': 'cubic_metre',
                'symbol': 'm\u00b3',
                'conversion': 1
            },
            {
                'label': 'litre',
                'symbol': 'l',
                'conversion': 0.001
            },
            {
                'label': 'millilitre',
                'symbol': 'ml',
                'conversion': 1.0e-6
            },
            {
                'label': 'fluid_ounce_us',
                'symbol': 'fl oz',
                'conversion': 2.95735295625e-5
            },
            {
                'label': 'pint_us',
                'symbol': 'pt',
                'conversion': 0.000473176473
            },
            {
                'label': 'gallon_us',
                'symbol': 'gal',
                'conversion': 0.003785411784
            },
            {
                'label': 'cubic_mile',
                'symbol': 'mi\u00b3',
                'conversion': 4168181825.44058
            }
        ]
    },
    'volumetric_flow': {
        'default': 'm\u00b3\/s',
        'units': [
            {
                'label': 'cubic_metre_per_second',
                'symbol': 'm\u00b3\/s',
                'conversion': 1
            },
            {
                'label': 'litre_per_second',
                'symbol': 'l\/s',
                'conversion': 0.001
            }
        ]
    }
};

export default units;