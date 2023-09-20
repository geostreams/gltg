import Pbf from 'pbf';
import { decode } from 'geobuf';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
// import { Feature } from 'ol';
// import { Point } from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle, Fill, Style, Stroke } from 'ol/style';



export const MAP_BOUNDS = [
    -12792231.63426164,
    3246498.818343048,
    -8436000.174951272,
    6512287.786512453
];


export const trendStationsJSON = {
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


// Create vector layer from trend_stations
export const trendStationsLayer = new VectorLayer(
    {
        source: new VectorSource({
            features: new GeoJSON().readFeatures(trendStationsJSON)
        }),
        style: new Style({
            image: new Circle({
                radius: 5,
                fill: new Fill({ color: 'rgba(255, 0, 0, 0.5)' }),
                stroke: new Stroke({ color: 'red', width: 1 })
            })
        })
    }
);

