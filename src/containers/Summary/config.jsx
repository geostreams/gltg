// @flow
import * as React from 'react';
import { DEVICE_PIXEL_RATIO } from 'ol/has';
import { Fill, Icon, Stroke, Style } from 'ol/style';

import type FeatureType from 'ol/Feature';

import huc8 from '../../data/huc8.pbf';
import watersheds from '../../data/watersheds.pbf';
import drainage from '../../data/il-drainage.pbf';
import monitoringSites from '../../data/il-monitoring-sites.pbf';
import watershedMonitoringSites from '../../data/watersheds-monitoring-sites.pbf';
import markerMonitoringSite from '../../images/marker_monitoring_site.png';
import patternNoData from '../../images/pattern_no_data.png';
import annualYieldData from '../../data/annual_yield.json';

export const initialState = {
    boundary: 'watershed',
    nutrient: 'Nitrogen',
    year: 2017
};

export const GEOSERVER_URL = process.env.GEOSERVER_URL || '';

// A missing `boundaries` prop from a legend item means it will be shown for all boundary types
export const CONTEXTUAL_LAYERS: Array<{ title: string; id: string; zIndex?: number, boundaries?: Array<string>}> = [
    { title: 'Rivers', id: 'gltg:us-rivers', zIndex: 2 },
    { title: 'State Boundaries', id: 'gltg:us-states' },
    { title: 'IL Drainage - Outside', id: 'gltg:il-drainage-outside', boundaries: ['drainage'] },
    { title: 'Extrapolated Areas', id: 'gltg:extrapolated-areas', boundaries: ['drainage', 'huc8'] }
];

export const getOverallFeatureLabels = (boundary: string) => {
    // Returns an array of two items: the first item is the active boundary label,
    // and the second item is its variable name in `data.json`, which can be used for rendering labels too.
    switch (boundary) {
        case 'drainage':
            return ['Illinois', 'Statewide Summary'];
        case 'huc8':
            return ['Illinois', 'Statewide Summary'];
        case 'watershed':
            return ['Mississippi River Basin', 'Nutrient Load to Gulf of Mexico'];
        default:
            return [null, null];
    }
};

export const MAP_BOUNDS = [
    -12792231.63426164,
    3246498.818343048,
    -8436000.174951272,
    6512287.786512453
];

export const getLayerExtent = (boundary: string) =>{
    switch(boundary){
        case 'drainage':
            return [-10673131.179092214,4240945.513367433,-9272804.820907786,5703644.486632567];
        case 'huc8':
            return [-10673131.179092214,4240945.513367433,-9272804.820907786,5703644.486632567];
        case 'watershed':
            return [-10923839.372435283,4545502.562858378,-9523076.314751584,6008657.686866852];
        default:
            return MAP_BOUNDS;
    }
};

export const FEATURE_STYLE_INFO = [
    {
        label: 'No data',
        image: patternNoData
    },
    {
        label: '<5',
        color: '#EAEDF2'
    },
    {
        label: '5-9.99',
        color: '#C7D6E6'
    },
    {
        label: '10-14.99',
        color: '#93BDD4'
    },
    {
        label: '15-19.99',
        color: '#4D94C1'
    },
    {
        label: '20-24.99',
        color: '#1B64A7'
    },
    {
        label: '>25 lb/acre',
        color: '#062D64'
    }
];

export const getNutrientValueCategoryIndex = (nutrientLevel?: number): number => {
    if ((nutrientLevel !== 0 && !nutrientLevel) || nutrientLevel < 0) {
        return 0;
    }
    if (nutrientLevel < 5) {
        return 1;
    }
    if (nutrientLevel < 10) {
        return 2;
    }
    if (nutrientLevel < 15) {
        return 3;
    }
    if (nutrientLevel < 20) {
        return 4;
    }
    if (nutrientLevel < 25) {
        return 5;
    }
    return 6;
};

const noDataPattern = (() => {
    const pixelRatio = DEVICE_PIXEL_RATIO;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 8 * pixelRatio;
    canvas.height = 8 * pixelRatio;
    // white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // line
    context.strokeStyle = '#b27eb2';
    context.lineWidth = 2;
    context.moveTo(0, 0);
    context.lineTo(6 * pixelRatio, 3 * pixelRatio);
    context.stroke();
    return context.createPattern(canvas, 'repeat');
})();

export const getFeatureStyle = (
    feature: FeatureType,
    resolution: ?number,
    nutrient: string,
    year: number,
    isSelected: boolean = false
) => {
    const strokeOptions = isSelected ?
        {
            color: 'red',
            width: 4
        } :
        {
            color: '#7f7f7f',
            width: 1
        };

    const name = feature.get('Name') || feature.get('Station_ID');

    const nutrientLevel = name ? parseFloat(annualYieldData[nutrient][name][year]) || 0.0 : 0;

    let color;
    if (nutrientLevel >= 0) {
        const styleInfo = FEATURE_STYLE_INFO[getNutrientValueCategoryIndex(nutrientLevel)];
        color = styleInfo.color ? styleInfo.color : '#000';
    } else {
        color = noDataPattern;
    }

    return (
        new Style({
            fill: new Fill({ color }),
            stroke: new Stroke(strokeOptions),
            zIndex: isSelected ? 2 : 1
        })
    );
};

export type BoundaryType = {
    [key: string]: {
        visible: boolean;
        label: string;
        layers: Array<{
            url: string;
            style: Function;
            interactive?: boolean;
            zIndex?: number
        }>;
    };
}

export const BOUNDARIES: BoundaryType = {
    watershed: {
        visible: true,
        label: 'Trend Watersheds',
        layers: [
            {
                url: watersheds,
                style: getFeatureStyle
            },
            {
                url: watershedMonitoringSites,
                style: () => new Style({
                    image: new Icon(({
                        src: markerMonitoringSite
                    }))
                }),
                zIndex: 3,
                interactive: true
            }
        ]
    }
};

export const VARIABLES_INFO = {
    boundary: {
        title: 'Boundary Type',
        description: (
            <div>
                <b>IL Drainage</b>
                <p>
                    This view represents the land area that drains through
                    each of the measurement points represented on the map as
                    circles with a monitoring buoy. These stations were chosen
                    as part of the Illinois Nutrient Loss Reduction Strategy
                    because collectively, they measure nutrients in the runoff
                    from about 75% of the land area of the state of Illinois,
                    and can be used to extrapolate the total mass of nutrients,
                    or nutrient load, leaving the state of Illinois.
                </p>
                <b>HUC 8</b>
                <p>
                    HUCs, or Hydrologic Unit Codes are standardized boundaries
                    that basically are the boundaries of watersheds and are
                    often used in water quality tracking. These HUCs are
                    divided into successively smaller watershed units. HUC-8 is
                    a medium-sized watershed, and there are 31 such HUCs in the
                    state of Illinois. The Illinois Nutrient Reduction Strategy
                    has used modeling to estimate the nutrient yield from all
                    of the HUC-8s in the State of Illinois. The HUC 8 watershed
                    boundaries allow for a more localized view of tracking
                    nutrient loads than some of the larger “Illinois Drainage”
                    boundaries.
                </p>
                <b>Watershed Boundaries</b>
                <p>
                    This view highlights the watershed or the land area that
                    drains through the point represented on the map as a pin.
                    These locations are designated in Great Lakes to Gulf as
                    &quot;Mississippi River Basin Trend Sites&quot; because
                    calculating water quality trends at these locations can be
                    used to track progress in reducing nutrient loads from the
                    watersheds that drain to that point. Many of these
                    particular sites were selected because they are mostly
                    contained within a single state, and thus can be used to
                    track that state’s nutrient reduction progress.
                </p>
                <b>Load to Gulf</b>
                <p>
                    This site, the Mississippi River at St. Francisville is
                    used to measure the total load of nutrients that are
                    delivered to the Gulf of Mexico in a given water year
                    (12 Months beginning October 1). This site is used because
                    it is just upstream from the Gulf, and yet does not behave
                    like an estuary. Because some Mississippi River water is
                    diverted to the Atchafalaya River, appropriate corrections
                    are made to report total load.
                </p>
            </div>
        )
    },
    nutrient: {
        title: 'Nutrient Type',
        description: (
            <div>
                <p>
                    Nitrogen and Phosphorus are the two main nutrients that cause
                    the algal blooms that lead to hypoxia in the Gulf of Mexico.
                </p>
                <p>
                    Nitrogen – the main source of nitrogen is runoff from
                    agriculture, though there are other sources as well such
                    as urban areas and industry.
                </p>
                <p>
                    Phosphorus – the main source of phosphorus is wastewater
                    treatment, though there are other sources as well such
                    as erosion.
                </p>
            </div>
        )
    },
    yield: {
        title: 'Yield',
        description: (
            <div>
                Yield is a measure of nutrients lost per unit area. This measure is useful because
                it removes the influence of watershed size in a measurement so that different size
                watersheds may be compared.
            </div>
        )
    }
};

export const TRENDS_DATA_STATIONS = {
    type: 'FeatureCollection',
    name: 'trend_analysis_sites',
    features: [
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-07247000',
                WQ_MonitoringLocationName: 'Poteau River at Cauthron, AR',
                Stream_Name: 'Poteau River',
                significance_concent: 'Upward trend in concentration is very likely',
                significance_flux: 'Upward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/USGS-07247000/USGS-07247000_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -94.3,
                    34.92
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-05420500',
                WQ_MonitoringLocationName: 'Mississippi River at Clinton, IA',
                Stream_Name: 'Mississippi River',
                significance_concent: 'Downward trend in concentration is likely',
                significance_flux: 'Downward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/USGS-05420500/USGS-05420500_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -90.25,
                    41.78
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-05465500',
                WQ_MonitoringLocationName: 'Iowa River at Wapello, IA',
                Stream_Name: 'Iowa River',
                significance_concent: 'Downward trend in concentration is highly likely',
                significance_flux: 'Downward trend in flux is very likely',
                graph_image: '../RESULTS_Processed_data/USGS-05465500/USGS-05465500_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -91.18,
                    41.18
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-05540275',
                WQ_MonitoringLocationName: 'SPRING BROOK AT 87TH STREET NEAR NAPERVILLE, IL',
                Stream_Name: 'Spring Brook',
                significance_concent: 'Downward trend in concentration is highly likely',
                significance_flux: 'Downward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/USGS-05540275/USGS-05540275_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -88.16,
                    41.73
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-05586100',
                WQ_MonitoringLocationName: 'ILLINOIS RIVER AT VALLEY CITY, IL',
                Stream_Name: 'Illinois River',
                significance_concent: 'Downward trend in concentration is very likely',
                significance_flux: 'Downward trend in flux is very likely',
                graph_image: '../RESULTS_Processed_data/USGS-05586100/USGS-05586100_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -90.65,
                    39.7
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-394340085524601',
                WQ_MonitoringLocationName: 'SUGAR CREEK AT CO RD 400 S AT NEW PALESTINE, IN',
                Stream_Name: 'Sugar Creek',
                significance_concent: 'Downward trend in concentration is highly likely',
                significance_flux: 'Downward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/USGS-394340085524601/USGS-394340085524601_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -85.88,
                    39.73
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-03303280',
                WQ_MonitoringLocationName: 'OHIO RIVER AT CANNELTON DAM AT CANNELTON, IN',
                Stream_Name: 'Ohio River',
                significance_concent: 'Downward trend in concentration is likely',
                significance_flux: 'Downward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/USGS-03303280/USGS-03303280_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -86.71,
                    37.9
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-05287890',
                WQ_MonitoringLocationName: 'ELM CREEK NR CHAMPLIN, MN',
                Stream_Name: 'Elm Creek',
                significance_concent: 'Downward trend in concentration is highly likely',
                significance_flux: 'Downward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/USGS-05287890/USGS-05287890_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -93.44,
                    45.16
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-05500000',
                WQ_MonitoringLocationName: 'South Fabius River near Taylor, MO',
                Stream_Name: 'South Fabius River',
                significance_concent: 'Upward trend in concentration is likely',
                significance_flux: 'Upward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/USGS-05500000/USGS-05500000_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -91.58,
                    39.9
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-05514500',
                WQ_MonitoringLocationName: 'Cuivre River near Troy, MO',
                Stream_Name: 'Cuivre River',
                significance_concent: 'Downward trend in concentration is very likely',
                significance_flux: 'Downward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/USGS-05514500/USGS-05514500_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -90.98,
                    39.01
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-06817700',
                WQ_MonitoringLocationName: 'Nodaway River near Graham, MO',
                Stream_Name: 'Nodaway River',
                significance_concent: 'Downward trend in concentration is likely',
                significance_flux: 'Downward trend in flux is about as likely as not',
                graph_image: '../RESULTS_Processed_data/USGS-06817700/USGS-06817700_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -95.07,
                    40.2
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-06818000',
                WQ_MonitoringLocationName: 'Missouri River at St. Joseph, MO',
                Stream_Name: 'Missouri River',
                significance_concent: 'Downward trend in concentration is likely',
                significance_flux: 'Downward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/USGS-06818000/USGS-06818000_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -94.86,
                    39.75
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-06821190',
                WQ_MonitoringLocationName: 'Platte River at Sharps Station, MO',
                Stream_Name: 'Platte River',
                significance_concent: 'Upward trend in concentration is likely',
                significance_flux: 'Upward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/USGS-06821190/USGS-06821190_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -94.73,
                    39.4
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-06902000',
                WQ_MonitoringLocationName: 'Grand River near Sumner, MO',
                Stream_Name: 'Grand River',
                significance_concent: 'Downward trend in concentration is about as likely as not',
                significance_flux: 'Upward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/USGS-06902000/USGS-06902000_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -93.27,
                    39.64
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-06905500',
                WQ_MonitoringLocationName: 'Chariton River near Prairie Hill, MO',
                Stream_Name: 'Chariton River',
                significance_concent: 'Upward trend in concentration is likely',
                significance_flux: 'Upward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/USGS-06905500/USGS-06905500_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -92.79,
                    39.54
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-06921070',
                WQ_MonitoringLocationName: 'Pomme de Terre River near Polk, MO',
                Stream_Name: 'Pomme de Terre River',
                significance_concent: 'Upward trend in concentration is highly likely',
                significance_flux: 'Upward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/USGS-06921070/USGS-06921070_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -93.37,
                    37.68
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-06934500',
                WQ_MonitoringLocationName: 'Missouri River at Hermann, MO',
                Stream_Name: 'Missouri River',
                significance_concent: 'Upward trend in concentration is likely',
                significance_flux: 'Upward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/USGS-06934500/USGS-06934500_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -91.44,
                    38.71
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-07014500',
                WQ_MonitoringLocationName: 'Meramec River near Sullivan, MO',
                Stream_Name: 'Meramec River',
                significance_concent: 'Downward trend in concentration is likely',
                significance_flux: 'Downward trend in flux is about as likely as not',
                graph_image: '../RESULTS_Processed_data/USGS-07014500/USGS-07014500_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -91.11,
                    38.16
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-07022000',
                WQ_MonitoringLocationName: 'Mississippi River at Thebes, IL',
                Stream_Name: 'Mississippi River',
                significance_concent: 'Downward trend in concentration is highly likely',
                significance_flux: 'Downward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/USGS-07022000/USGS-07022000_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -89.46,
                    37.22
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-07068000',
                WQ_MonitoringLocationName: 'Current River at Doniphan, MO',
                Stream_Name: 'Current River',
                significance_concent: 'Upward trend in concentration is very likely',
                significance_flux: 'Upward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/USGS-07068000/USGS-07068000_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -90.85,
                    36.62
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-07071500',
                WQ_MonitoringLocationName: 'Eleven Point River near Bardley, MO',
                Stream_Name: 'Eleven Point River',
                significance_concent: 'Upward trend in concentration is highly likely',
                significance_flux: 'Upward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/USGS-07071500/USGS-07071500_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -91.2,
                    36.65
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'USGS-07189000',
                WQ_MonitoringLocationName: 'Elk River near Tiff City, Mo',
                Stream_Name: 'Elk River',
                significance_concent: 'Upward trend in concentration is highly likely',
                significance_flux: 'Upward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/USGS-07189000/USGS-07189000_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -94.59,
                    36.63
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'ARDEQH2O_WQX-ARK0015',
                WQ_MonitoringLocationName: 'James Fork on CR45 1.5 miles S of Hackett',
                Stream_Name: 'James Fork',
                significance_concent: 'Upward trend in concentration is highly likely',
                significance_flux: 'Upward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/ARDEQH2O_WQX-ARK0015/ARDEQH2O_WQX-ARK0015_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -94.41,
                    35.16
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'ARDEQH2O_WQX-OUA0013',
                WQ_MonitoringLocationName: 'Bayou Bartholomew near Jones, Louisiana',
                Stream_Name: 'Bayou Bartholomew',
                significance_concent: 'Upward trend in concentration is very likely',
                significance_flux: 'Upward trend in flux is very likely',
                graph_image: '../RESULTS_Processed_data/ARDEQH2O_WQX-OUA0013/ARDEQH2O_WQX-OUA0013_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -91.66,
                    32.99
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'ARDEQH2O_WQX-OUA0021',
                WQ_MonitoringLocationName: 'Ouachita River near Pencil Bluff, Arkansas',
                Stream_Name: 'Ouachita River',
                significance_concent: 'Upward trend in concentration is highly likely',
                significance_flux: 'Upward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/ARDEQH2O_WQX-OUA0021/ARDEQH2O_WQX-OUA0021_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -93.7,
                    34.61
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'ARDEQH2O_WQX-WHI0089',
                WQ_MonitoringLocationName: 'Spring River at Mammoth Spring, Arkansas',
                Stream_Name: 'Spring River',
                significance_concent: 'Upward trend in concentration is highly likely',
                significance_flux: 'Upward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/ARDEQH2O_WQX-WHI0089/ARDEQH2O_WQX-WHI0089_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -91.53,
                    36.5
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'IL_EPA_WQX-C-22',
                WQ_MonitoringLocationName: 'Little Wabash River',
                Stream_Name: 'Little Wabash River',
                significance_concent: 'Downward trend in concentration is likely',
                significance_flux: 'Downward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/IL_EPA_WQX-C-22/IL_EPA_WQX-C-22_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -88.3,
                    38.63
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'IL_EPA_WQX-CA-05',
                WQ_MonitoringLocationName: 'Skillet Fork',
                Stream_Name: 'Skillet Fork',
                significance_concent: 'Downward trend in concentration is about as likely as not',
                significance_flux: 'Downward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/IL_EPA_WQX-CA-05/IL_EPA_WQX-CA-05_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -88.59,
                    38.36
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'INSTOR_WQX-1907',
                WQ_MonitoringLocationName: 'UMC030-0004',
                Stream_Name: 'East Arm Little Calumet River',
                significance_concent: 'Downward trend in concentration is likely',
                significance_flux: 'Downward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/INSTOR_WQX-1907/INSTOR_WQX-1907_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -87.52,
                    41.58
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'INSTOR_WQX-1986',
                WQ_MonitoringLocationName: 'UMK110-0002',
                Stream_Name: 'Kankakee River',
                significance_concent: 'Downward trend in concentration is about as likely as not',
                significance_flux: 'Downward trend in flux is about as likely as not',
                graph_image: '../RESULTS_Processed_data/INSTOR_WQX-1986/INSTOR_WQX-1986_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -87.34,
                    41.18
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'INSTOR_WQX-2221',
                WQ_MonitoringLocationName: 'WMI060-0005',
                Stream_Name: 'Mississinewa River',
                significance_concent: 'Downward trend in concentration is likely',
                significance_flux: 'Downward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/INSTOR_WQX-2221/INSTOR_WQX-2221_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -85.66,
                    40.58
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'INSTOR_WQX-2277',
                WQ_MonitoringLocationName: 'WTI010-0001',
                Stream_Name: 'Tippecanoe River',
                significance_concent: 'Downward trend in concentration is about as likely as not',
                significance_flux: 'Downward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/INSTOR_WQX-2277/INSTOR_WQX-2277_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -85.69,
                    41.32
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'INSTOR_WQX-2284',
                WQ_MonitoringLocationName: 'WDE050-0002',
                Stream_Name: 'Deer Creek',
                significance_concent: 'Downward trend in concentration is very likely',
                significance_flux: 'Downward trend in flux is very likely',
                graph_image: '../RESULTS_Processed_data/INSTOR_WQX-2284/INSTOR_WQX-2284_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -86.62,
                    40.59
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'INSTOR_WQX-2337',
                WQ_MonitoringLocationName: 'WLV150-0001',
                Stream_Name: 'Wabash River',
                significance_concent: 'Downward trend in concentration is likely',
                significance_flux: 'Downward trend in flux is about as likely as not',
                graph_image: '../RESULTS_Processed_data/INSTOR_WQX-2337/INSTOR_WQX-2337_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -87.37,
                    39.79
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'INSTOR_WQX-2410',
                WQ_MonitoringLocationName: 'WWU100-0001',
                Stream_Name: 'Fall Creek',
                significance_concent: 'Downward trend in concentration is highly likely',
                significance_flux: 'Downward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/INSTOR_WQX-2410/INSTOR_WQX-2410_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -85.87,
                    39.95
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'INSTOR_WQX-2434',
                WQ_MonitoringLocationName: 'WWU090-0002',
                Stream_Name: 'White River',
                significance_concent: 'Downward trend in concentration is about as likely as not',
                significance_flux: 'Downward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/INSTOR_WQX-2434/INSTOR_WQX-2434_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -86.11,
                    39.91
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'INSTOR_WQX-2514',
                WQ_MonitoringLocationName: 'WWL100-0005',
                Stream_Name: 'White River',
                significance_concent: 'Downward trend in concentration is likely',
                significance_flux: 'Downward trend in flux is likely',
                graph_image: '../RESULTS_Processed_data/INSTOR_WQX-2514/INSTOR_WQX-2514_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -87.29,
                    38.51
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'MNPCA-S000-163',
                WQ_MonitoringLocationName: 'WATONWAN R BR ON CSAH-13, 1 MI W OF GARDEN CITY',
                Stream_Name: 'Watonwan River',
                significance_concent: 'Downward trend in concentration is very likely',
                significance_flux: 'Downward trend in flux is very likely',
                graph_image: '../RESULTS_Processed_data/MNPCA-S000-163/MNPCA-S000-163_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -94.19,
                    44.05
                ]
            }
        },
        {
            type: 'Feature',
            properties: {
                WQ_MonitoringLocationIdentifier: 'WIDNR_WQX-473008',
                WQ_MonitoringLocationName: 'Chippewa River - Sth 10 Bridge',
                Stream_Name: 'Chippewa River',
                significance_concent: 'Upward trend in concentration is highly likely',
                significance_flux: 'Upward trend in flux is highly likely',
                graph_image: '../RESULTS_Processed_data/WIDNR_WQX-473008/WIDNR_WQX-473008_Yearly_normalized_Concent.jpg'
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    -91.97,
                    44.63
                ]
            }
        }
    ]
};
