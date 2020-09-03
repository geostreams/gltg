// @flow
import MVT from 'ol/format/MVT';
import GroupLayer from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile';
import OSM, { ATTRIBUTION as OSM_ATTRIBUTION } from 'ol/source/OSM';
import VectorTileSource from 'ol/source/VectorTile';
import XYZ from 'ol/source/XYZ';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { entries } from 'gd-core/src/utils/array';

import type { Feature as FeatureType } from 'ol';

import type { Boundary, Filters } from './utils/flowtype';

export const GEOSERVER_URL = process.env.GEOSERVER_URL || '';

export const MAP_BOUNDS = [
    -12792231.63426164,
    3246498.818343048,
    -8436000.174951272,
    6512287.786512453
];

export const STYLES = {
    hidden: new Style({
        fill: new Fill({
            color: [0, 0, 0, 0]
        }),
        stroke: new Stroke({
            color: [0, 0, 0, 0]
        })
    }),
    default: new Style({
        fill: new Fill({
            color: [0, 0, 0, 0.2]
        }),
        stroke: new Stroke({
            color: 'black'
        })
    }),
    selected: new Style({
        fill: new Fill({
            color: [255, 0, 0, 0.3]
        }),
        stroke: new Stroke({
            color: 'black'
        })
    })
};

export const getStyle = (options: string[], feature: FeatureType, featureIdKey: string, isSelected: boolean) => {
    if (options.includes(feature.get(featureIdKey))) {
        return isSelected ? STYLES.selected : STYLES.default;
    }
    return STYLES.hidden;
};

export const BOUNDARIES: { [k: string]: Boundary } = {
    states: {
        visible: true,
        label: 'States',
        options: [
            'Arkansas',
            'Illinois',
            'Indiana',
            'Iowa',
            'Kentucky',
            'Louisiana',
            'Minnesota',
            'Mississippi',
            'Missouri',
            'Ohio',
            'Tennessee',
            'Wisconsin'
        ],
        layer: {
            id: 'gltg:us-states',
            featureIdKey: 'NAME',
            crs: 900913
        }
    },
    huc8: {
        visible: false,
        label: 'HUC-8s',
        options: [
            '03150101',
            '03160101',
            '03160102',
            '03160103',
            '03160104',
            '03160105',
            '03160106',
            '03160108',
            '03160201',
            '03160202',
            '03170001',
            '03170002',
            '03170003',
            '03170004',
            '03170005',
            '03170006',
            '03170007',
            '03170008',
            '03170009',
            '03180001',
            '03180002',
            '03180003',
            '03180004',
            '03180005',
            '04010101',
            '04010102',
            '04010201',
            '04010202',
            '04010301',
            '04010302',
            '04030101',
            '04030102',
            '04030103',
            '04030104',
            '04030105',
            '04030106',
            '04030108',
            '04030201',
            '04030202',
            '04030203',
            '04030204',
            '04040001',
            '04040002',
            '04040003',
            '04050001',
            '04100001',
            '04100003',
            '04100004',
            '04100005',
            '04100006',
            '04100007',
            '04100008',
            '04100009',
            '04100010',
            '04100011',
            '04100012',
            '04110001',
            '04110002',
            '04110003',
            '04110004',
            '04120101',
            '05030101',
            '05030102',
            '05030103',
            '05030106',
            '05030201',
            '05030202',
            '05030204',
            '05040001',
            '05040002',
            '05040003',
            '05040004',
            '05040005',
            '05040006',
            '05060001',
            '05060002',
            '05060003',
            '05070201',
            '05070203',
            '05070204',
            '05080001',
            '05080002',
            '05080003',
            '05090101',
            '05090103',
            '05090104',
            '05090201',
            '05090202',
            '05090203',
            '05100101',
            '05100102',
            '05100201',
            '05100202',
            '05100203',
            '05100204',
            '05100205',
            '05110001',
            '05110002',
            '05110003',
            '05110004',
            '05110005',
            '05110006',
            '05120101',
            '05120102',
            '05120103',
            '05120104',
            '05120105',
            '05120106',
            '05120107',
            '05120108',
            '05120109',
            '05120110',
            '05120111',
            '05120112',
            '05120113',
            '05120114',
            '05120115',
            '05120201',
            '05120202',
            '05120203',
            '05120204',
            '05120205',
            '05120206',
            '05120207',
            '05120208',
            '05120209',
            '05130101',
            '05130102',
            '05130103',
            '05130104',
            '05130105',
            '05130106',
            '05130107',
            '05130108',
            '05130201',
            '05130202',
            '05130203',
            '05130204',
            '05130205',
            '05130206',
            '05140101',
            '05140102',
            '05140103',
            '05140104',
            '05140201',
            '05140202',
            '05140203',
            '05140204',
            '05140205',
            '05140206',
            '06010101',
            '06010102',
            '06010103',
            '06010104',
            '06010105',
            '06010106',
            '06010107',
            '06010108',
            '06010201',
            '06010204',
            '06010205',
            '06010206',
            '06010207',
            '06010208',
            '06020001',
            '06020002',
            '06020003',
            '06020004',
            '06030001',
            '06030002',
            '06030003',
            '06030004',
            '06030005',
            '06030006',
            '06040001',
            '06040002',
            '06040003',
            '06040004',
            '06040005',
            '06040006',
            '07010101',
            '07010102',
            '07010103',
            '07010104',
            '07010105',
            '07010106',
            '07010107',
            '07010108',
            '07010201',
            '07010202',
            '07010203',
            '07010204',
            '07010205',
            '07010206',
            '07010207',
            '07020001',
            '07020002',
            '07020003',
            '07020004',
            '07020005',
            '07020006',
            '07020007',
            '07020008',
            '07020009',
            '07020010',
            '07020011',
            '07020012',
            '07030001',
            '07030002',
            '07030003',
            '07030004',
            '07030005',
            '07040001',
            '07040002',
            '07040003',
            '07040004',
            '07040005',
            '07040006',
            '07040007',
            '07040008',
            '07050001',
            '07050002',
            '07050003',
            '07050004',
            '07050005',
            '07050006',
            '07050007',
            '07060001',
            '07060002',
            '07060003',
            '07060004',
            '07060005',
            '07060006',
            '07070001',
            '07070002',
            '07070003',
            '07070004',
            '07070005',
            '07070006',
            '07080101',
            '07080102',
            '07080103',
            '07080104',
            '07080105',
            '07080106',
            '07080107',
            '07080201',
            '07080202',
            '07080203',
            '07080204',
            '07080205',
            '07080206',
            '07080207',
            '07080208',
            '07080209',
            '07090001',
            '07090002',
            '07090003',
            '07090004',
            '07090005',
            '07090006',
            '07090007',
            '07100001',
            '07100002',
            '07100003',
            '07100004',
            '07100005',
            '07100006',
            '07100007',
            '07100008',
            '07100009',
            '07110001',
            '07110002',
            '07110003',
            '07110004',
            '07110005',
            '07110006',
            '07110007',
            '07110008',
            '07110009',
            '07120001',
            '07120002',
            '07120003',
            '07120004',
            '07120005',
            '07120006',
            '07120007',
            '07130001',
            '07130002',
            '07130003',
            '07130004',
            '07130005',
            '07130006',
            '07130007',
            '07130008',
            '07130009',
            '07130010',
            '07130011',
            '07130012',
            '07140101',
            '07140102',
            '07140103',
            '07140104',
            '07140105',
            '07140106',
            '07140107',
            '07140108',
            '07140201',
            '07140202',
            '07140203',
            '07140204',
            '08010100',
            '08010201',
            '08010202',
            '08010203',
            '08010204',
            '08010205',
            '08010206',
            '08010207',
            '08010208',
            '08010209',
            '08010210',
            '08010211',
            '08020100',
            '08020201',
            '08020202',
            '08020203',
            '08020204',
            '08020205',
            '08020301',
            '08020302',
            '08020303',
            '08020304',
            '08020401',
            '08020402',
            '08030100',
            '08030201',
            '08030202',
            '08030203',
            '08030204',
            '08030205',
            '08030206',
            '08030207',
            '08030208',
            '08030209',
            '08040101',
            '08040102',
            '08040103',
            '08040201',
            '08040202',
            '08040203',
            '08040204',
            '08040205',
            '08040206',
            '08040207',
            '08040301',
            '08040302',
            '08040303',
            '08040304',
            '08040305',
            '08040306',
            '08050001',
            '08050002',
            '08050003',
            '08060100',
            '08060201',
            '08060202',
            '08060203',
            '08060204',
            '08060205',
            '08060206',
            '08070201',
            '08070202',
            '08070203',
            '08070204',
            '08070205',
            '08070300',
            '08080100',
            '08080101',
            '08080102',
            '08080103',
            '08080201',
            '08080202',
            '08080203',
            '08080204',
            '08080205',
            '08080206',
            '08090201',
            '08090301',
            '08090302',
            '09020101',
            '09020102',
            '09020103',
            '09020104',
            '09020106',
            '09020107',
            '09020108',
            '09020301',
            '09020302',
            '09020303',
            '09020304',
            '09020305',
            '09020306',
            '09020309',
            '09020311',
            '09020312',
            '09020314',
            '09030001',
            '09030002',
            '09030003',
            '09030004',
            '09030005',
            '09030006',
            '09030007',
            '09030008',
            '09030009',
            '10170202',
            '10170203',
            '10170204',
            '10230001',
            '10230002',
            '10230003',
            '10230004',
            '10230005',
            '10230006',
            '10230007',
            '10240001',
            '10240002',
            '10240003',
            '10240004',
            '10240005',
            '10240009',
            '10240010',
            '10240011',
            '10240012',
            '10240013',
            '10280101',
            '10280102',
            '10280103',
            '10280201',
            '10280202',
            '10280203',
            '10290102',
            '10290103',
            '10290104',
            '10290105',
            '10290106',
            '10290107',
            '10290108',
            '10290109',
            '10290110',
            '10290111',
            '10290201',
            '10290202',
            '10290203',
            '10300101',
            '10300102',
            '10300103',
            '10300104',
            '10300200',
            '11010001',
            '11010002',
            '11010003',
            '11010004',
            '11010005',
            '11010006',
            '11010007',
            '11010008',
            '11010009',
            '11010010',
            '11010011',
            '11010012',
            '11010013',
            '11010014',
            '11070206',
            '11070207',
            '11070208',
            '11070209',
            '11110103',
            '11110104',
            '11110105',
            '11110201',
            '11110202',
            '11110203',
            '11110204',
            '11110205',
            '11110206',
            '11110207',
            '11140106',
            '11140108',
            '11140109',
            '11140201',
            '11140202',
            '11140203',
            '11140204',
            '11140205',
            '11140206',
            '11140207',
            '11140208',
            '11140209',
            '11140302',
            '11140304',
            '11140306',
            '12010002',
            '12010004',
            '12010005'
        ],
        layer: {
            id: 'gltg:huc8',
            featureIdKey: 'huc8',
            crs: 900913
        }
    }
};

export const LAYERS = {
    basemaps: new GroupLayer({
        title: 'Base Maps',
        layers: [
            new TileLayer({
                type: 'base',
                visible: true,
                title: 'Carto',
                source: new XYZ({
                    url: 'https://{a-d}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png',
                    attributions: [
                        '&#169; <a href="https://www.carto.com">Carto</a>,',
                        OSM_ATTRIBUTION
                    ]
                })
            }),
            new TileLayer({
                type: 'base',
                visible: false,
                title: 'OSM',
                source: new OSM()
            })
        ]
    }),
    ...entries(BOUNDARIES).reduce(
        (boundaryLayers, [boundary, { options, visible, layer: { id, crs, featureIdKey } }]) => {
            const layer = new VectorTileLayer({
                source: new VectorTileSource({
                    format: new MVT(),
                    url: `${GEOSERVER_URL}/gwc/service/tms/1.0.0/${id}@EPSG:${crs}@pbf/{z}/{x}/{-y}.pbf`,
                    tilePixelRatio: 1
                }),
                visible,
                style: (feature) => getStyle(options, feature, featureIdKey, false)
            });
            layer.set('interactive', true);
            boundaryLayers[boundary] = layer;
            return boundaryLayers;
        },
        {}
    )
};

export const YEAR_RANGE = [1980, 2020];

export const INITIAL_FILTERS: Filters = {
    years: YEAR_RANGE,
    boundaryType: 'states',
    selectedBoundaries: []
};
