// @flow
import * as React from 'react';
import { Fill, Icon, Stroke, Style } from 'ol/style';

import type FeatureType from 'ol/Feature';
import { DEVICE_PIXEL_RATIO } from 'ol/has';
import { transformExtent } from 'ol/proj';

import huc8 from '../../data/huc8.geojson';
import watersheds from '../../data/watersheds.geojson';
import drainage from '../../data/il-drainage.geojson';
import monitoringSites from '../../data/il-monitoring-sites.geojson';
import markerMonitoringSite from '../../images/marker_monitoring_site.png';
import patternNoData from '../../images/pattern_no_data.png';
import data from '../../data/data.json';

// Coordinates for the bounds of the map converted to EPSG:3857
export const MAP_BOUNDS = transformExtent([
    -114.91457195054475,
    27.98036759814649,
    -75.78187893993685,
    50.37966027007533],
'EPSG:4326', 'EPSG:3857');

export const ACTION_BAR_HEIGHT = 105;

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
        label: '#20-24.99',
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
            color: [0, 0, 0, 1],
            width: 1
        };

    const name = feature.get('Name') || feature.get('Station_ID');

    const nutrientLevel = name ?
        parseFloat(data[nutrient][name][year]) || 0.0 :
        0;

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
        }>;
    };
}

export const BOUNDARIES: BoundaryType = {
    drainage: {
        visible: true,
        label: 'IL Drainage',
        layers: [
            {
                url: drainage,
                style: getFeatureStyle
            },
            {
                url: monitoringSites,
                style: () => new Style({
                    image: new Icon(({
                        src: markerMonitoringSite
                    }))
                }),
                interactive: true
            }
        ]
    },
    huc8: {
        visible: false,
        label: 'HUC-8',
        layers: [
            {
                url: huc8,
                style: getFeatureStyle
            }
        ]
    },
    watershed: {
        visible: false,
        label: 'Watersheds',
        layers: [
            {
                url: watersheds,
                style: getFeatureStyle
            }
        ]
    }
};

export const YEARS = Array(38).fill(2017).map<number>((i, idx) => i - idx);

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
    }
};
