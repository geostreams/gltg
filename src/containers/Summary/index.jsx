import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import TileLayer from 'ol/layer/Tile';
import GroupLayer from 'ol/layer/Group';
import XYZ from 'ol/source/XYZ';
import OSM, { ATTRIBUTION as OSM_ATTRIBUTION } from 'ol/source/OSM';
import { Map } from '@geostreams/core/src/components/ol';
import { makeStyles } from '@material-ui/core/styles';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle, Stroke } from 'ol/style';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import RegularShape from 'ol/style/RegularShape';
import { TileWMS } from 'ol/source';
import type { Map as MapType } from 'ol';
import NoSignificantTrendIcon from '../../images/No_Significant_Trend_Icon.png';
import HighUpwardTrendIcon from '../../images/Upward_Trending_Icon.png';
import HighDownwardTrendIcon from '../../images/Downward_Trending_Icon.png';

import MapLegendIcon from '../../images/Map_Legend_Icon.png';
import { GEOSERVER_URL, MAP_BOUNDS } from './config';

import Sidebar from './Sidebar';

// Styling for different components of Nutrient Trends Dashboard
const useStyles = makeStyles((theme) => ({
    fillContainer: {
        width: '100%',
        height: '100%'
    },
    mainContainer: {
        position: 'absolute',
        height: '100%'
    },
    sidebar: {
        'height': '100%',
        'width': '100%',
        'overflowY': 'auto',
        'overflowX': 'clip',
        '& a': {
            color: '#0D73C5'
        }
    },
    legend: {
        position: 'absolute',
        bottom: '8.25%',
        right: '42%',
        backgroundColor: 'white',
        padding: '1%',
        borderRadius: '5%',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        opacity: 0.8,
        zIndex: 1000 // Added z-index here
    },
    legendButton: {
        position: 'absolute',
        bottom: '5%',
        right: '42.25%',
        width: '2.25em',
        height: '2.25m',
        backgroundColor: '#a0cdf4',
        borderRadius: '10%',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        opacity: 0.8,
        zIndex: 1000,
        border: 'none',
        padding: 0,
        outline: 'none',
        cursor: 'pointer'
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.2em'
    },
    legendIcon: {
        width: '1.75em',
        height: 'auto',
        marginRight: theme.spacing(1)
    },
    legendContainer: {
        // centre items in the legend
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: theme.spacing(1)
    },
    legendCloseButton: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1)
    },
    dialogCloseButton: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1)
    },
    tooltip: {
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid black',
        padding: '5px',
        zIndex: 1000,
        pointerEvents: 'none',
        display: 'none' // Initially hidden
    }
}));



const renderIcon = (feature) => {
    const icon_trend = feature.get('icon_trend');
    if (icon_trend === 'Upward Trend'){
        return new Style({
            image: new RegularShape({
                fill: new Fill({
                    color: 'red'
                }),
                points: 3,
                radius: 8,
                angle: 0
            })
        });
    } if (icon_trend === 'Downward Trend'){
        return new Style({
            image: new RegularShape({
                fill: new Fill({
                    color: 'black'
                }),
                points: 3,
                radius: 8,
                angle: Math.PI / 3
            })
        });
    } if (icon_trend === 'No Significant Trend'){
        const circleStyle = new Style({
            image: new Circle({
                radius: 8,
                fill: new Fill({
                    color: 'yellow'
                })
            })
        });

        const innerCircleStyle = new Style({
            image: new Circle({
                radius: 2,
                fill: new Fill({
                    color: 'black'
                })
            })
        });

        return [circleStyle, innerCircleStyle];
    }
    return null;
};

const renderWaterSheds = () => {
    const style = new Style({
        stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0)', // Transparent color
            width: 0 // No stroke width
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 0, 0)' // Transparent fill color
        })
    });
    return style;
};

const Summary = () => {
    const classes = useStyles();

    // Holds an instance of @geostreams/core/ol/Map component
    const mapRef = React.useRef();

    // This state variable is used to keep track of the selected station
    const [selectedStation, setSelectedStation] = React.useState(null);
    const [oldSelectedStation, setOldSelectedStation] = React.useState(null);

    // This state variable is used to keep track of the selected watershed
    const [selectedWatershed, setSelectedWatershed] = React.useState(null);
    const [oldSelectedWatershed, setOldSelectedWatershed] = React.useState(null);

    // State variable to keep track of sidebar inputs
    const [selectedNutrient, setSelectedNutrient] = React.useState('Nitrogen');
    const [selectedTimePeriod, setSelectedTimePeriod] =
        React.useState('20_years');
    const [selectedParameter, setSelectedParameter] = React.useState('concentration');

    // State variable to make legend collapsible
    const [legendOpen, setLegendOpen] = React.useState(false);

    // Tooltip
    const [tooltipContent, setTooltipContent] = React.useState('');
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const tooltipRef = React.useRef();

    // Lazy load the geoJSON and json files
    // const [nitrateTrendStationsLayer20years, setNitrateTrendStationsLayer20years] = React.useState(null);
    const [nitrateConcTrendStationsLayer20years, setNitrateConcTrendStationsLayer20years] = React.useState(null);
    const [nitrateFluxTrendStationsLayer20years, setNitrateFluxTrendStationsLayer20years] = React.useState(null);

    // const [phosTrendStationsLayer20years, setPhosTrendStationsLayer20years] = React.useState(null);
    const [phosConcTrendStationsLayer20years, setPhosConcTrendStationsLayer20years] = React.useState(null);
    const [phosFluxTrendStationsLayer20years, setPhosFluxTrendStationsLayer20years] = React.useState(null);

    const [waterShedsLayer20years, setWaterShedsLayer20years] = React.useState(null);
    const [nitrateTrendStationsData20Years, setNitrateTrendStationsData20Years] = React.useState(null);
    const [phosTrendStationData20Years, setPhosTrendStationData20Years] = React.useState(null);


    const makeLayerVisible = () =>{
        const map = mapRef.current;
        if (map) {
            if (selectedParameter === 'concentration')
            {
                if (selectedNutrient === 'Nitrogen') {
                    nitrateConcTrendStationsLayer20years.setVisible(true);
                    nitrateFluxTrendStationsLayer20years.setVisible(false);
                    phosConcTrendStationsLayer20years.setVisible(false);
                    phosFluxTrendStationsLayer20years.setVisible(false);
                } else {
                    nitrateConcTrendStationsLayer20years.setVisible(false);
                    nitrateFluxTrendStationsLayer20years.setVisible(false);
                    phosConcTrendStationsLayer20years.setVisible(true);
                    phosFluxTrendStationsLayer20years.setVisible(false);
                }
            } else if (selectedParameter === 'flux') {
                if (selectedNutrient === 'Nitrogen') {
                    nitrateConcTrendStationsLayer20years.setVisible(false);
                    nitrateFluxTrendStationsLayer20years.setVisible(true);
                    phosConcTrendStationsLayer20years.setVisible(false);
                    phosFluxTrendStationsLayer20years.setVisible(false);
                } else {
                    nitrateConcTrendStationsLayer20years.setVisible(false);
                    nitrateFluxTrendStationsLayer20years.setVisible(false);
                    phosConcTrendStationsLayer20years.setVisible(false);
                    phosFluxTrendStationsLayer20years.setVisible(true);
                }
            }
        }
    };

    // useEffect to lazy load the geoJSON files
    React.useEffect(()=>{
        // import('../../data/nitrate_trend_stations_20_years.geojson').then((data) => {
        //     const nitrateTrendStationsJSON20Years = data.default;
        //     setNitrateTrendStationsLayer20years(
        //         new GroupLayer({
        //             title: 'Nitrate Trend Stations',
        //             layers: [
        //                 new VectorLayer({
        //                     visible: true,
        //                     title: 'Trend Stations',
        //                     source: new VectorSource({
        //                         url: nitrateTrendStationsJSON20Years,
        //                         format: new GeoJSON()
        //                     }),
        //                     interactive: true,
        //                     style: renderIcon
        //                 })
        //             ]
        //         })
        //     );
        // });
        import('../../data/nitrate_conc_trend_stations_20_years.geojson').then((data) => {
            const nitrateConcTrendStationsJSON20Years = data.default;
            setNitrateConcTrendStationsLayer20years(
                new GroupLayer({
                    title: 'Nitrate Concentration Trend Stations',
                    layers: [
                        new VectorLayer({
                            visible: true,
                            title: 'Trend Stations',
                            source: new VectorSource({
                                url: nitrateConcTrendStationsJSON20Years,
                                format: new GeoJSON()
                            }),
                            interactive: true,
                            style: renderIcon
                        })
                    ]
                })
            );
        });
        import('../../data/nitrate_flux_trend_stations_20_years.geojson').then((data) => {
            const nitrateFluxTrendStationsJSON20Years = data.default;
            setNitrateFluxTrendStationsLayer20years(
                new GroupLayer({
                    title: 'Nitrate Load Trend Stations',
                    layers: [
                        new VectorLayer({
                            visible: true,
                            title: 'Trend Stations',
                            source: new VectorSource({
                                url: nitrateFluxTrendStationsJSON20Years,
                                format: new GeoJSON()
                            }),
                            interactive: true,
                            style: renderIcon
                        })
                    ]
                })
            );
        });
        // import('../../data/phos_trend_stations_20_years.geojson').then((data) => {
        //     const phosTrendStationsJSON20Years = data.default;
        //     setPhosTrendStationsLayer20years(
        //         new GroupLayer({
        //             title: 'Phosphorus Trend Stations',
        //             layers: [
        //                 new VectorLayer({
        //                     visible: true,
        //                     title: 'Trend Stations',
        //                     source: new VectorSource({
        //                         url: phosTrendStationsJSON20Years,
        //                         format: new GeoJSON()
        //                     }),
        //                     interactive: true,
        //                     style: renderIcon
        //                 })
        //             ] })
        //     );
        // });
        import('../../data/phos_conc_trend_stations_20_years.geojson').then((data) => {
            const phosConcTrendStationsJSON20Years = data.default;
            setPhosConcTrendStationsLayer20years(
                new GroupLayer({
                    title: 'Phosphorus Concentration Trend Stations',
                    layers: [
                        new VectorLayer({
                            visible: true,
                            title: 'Trend Stations',
                            source: new VectorSource({
                                url: phosConcTrendStationsJSON20Years,
                                format: new GeoJSON()
                            }),
                            interactive: true,
                            style: renderIcon
                        })
                    ]
                })
            );
        });
        import('../../data/phos_flux_trend_stations_20_years.geojson').then((data) => {
            const phosFluxTrendStationsJSON20Years = data.default;
            setPhosFluxTrendStationsLayer20years(
                new GroupLayer({
                    title: 'Phosphorus Load Trend Stations',
                    layers: [
                        new VectorLayer({
                            visible: true,
                            title: 'Trend Stations',
                            source: new VectorSource({
                                url: phosFluxTrendStationsJSON20Years,
                                format: new GeoJSON()
                            }),
                            interactive: true,
                            style: renderIcon
                        })
                    ]
                })
            );
        });
        import ('../../data/watersheds_20years.geojson').then((data) => {
            const waterShedsJSON20years = data.default;
            setWaterShedsLayer20years(
                new GroupLayer({
                    title: 'Watershed Layer',
                    layers: [
                        new VectorLayer({
                            visible: true,
                            title: 'Watersheds',
                            source: new VectorSource({
                                url: waterShedsJSON20years,
                                format: new GeoJSON()
                            }),
                            interactive: true,
                            style: renderWaterSheds
                        })
                    ]
                })
            );
        });
        import ('../../data/phos_trend_station_data_20years.json').then((data)=>{
            const phosData = data.default;
            setPhosTrendStationData20Years(phosData);
        });
        import ('../../data/nitrate_trend_station_data_20years.json').then((data)=>{
            const nitrateData = data.default;
            setNitrateTrendStationsData20Years(nitrateData);
        });
    },[]);



    // This group layer contains the base map and the state boundaries layer
    const basemaps = new GroupLayer({
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
            }),
            new TileLayer({
                source: new TileWMS({
                    url: `${GEOSERVER_URL}/ows?`,
                    params: { LAYERS: 'gltg:us-states', TILED: true },
                    visible: true,
                    serverType: 'geoserver'
                })
            })
        ]
    });


    const riversLayer = new GroupLayer({
        title: 'Rivers',
        layers: [
            new TileLayer({
                source: new TileWMS({
                    url: `${GEOSERVER_URL}/ows?`,
                    params: { LAYERS: 'gltg:us-rivers', TILED: true },
                    visible: true,
                    serverType: 'geoserver'
                })
            })
        ]
    });

    // Create legend for trend stations
    const trendStationsLegend = React.useMemo(
        () => (
            <div>
                <div className={classes.legendContainer}>
                    <div className={classes.legendItem}>
                        <img
                            src={HighUpwardTrendIcon}
                            alt="Upward Trend Icon"
                            className={classes.legendIcon}
                        />
                        <span>Upward Trend </span>
                    </div>
                    <div className={classes.legendItem}>
                        <img
                            src={NoSignificantTrendIcon}
                            alt="No Significant Trend Icon"
                            className={classes.legendIcon}
                        />
                        <span>No Significant Trend</span>
                    </div>

                    <div className={classes.legendItem}>
                        <img
                            src={HighDownwardTrendIcon}
                            alt=" Downward Trend "
                            className={classes.legendIcon}
                        />
                        <span>Downward Trend </span>
                    </div>
                </div>
            </div>
        ),
        []
    );

    // Set styling for selected station
    React.useEffect(() => {
        // This is the interaction to set style for the selected station
        if (oldSelectedStation !== selectedStation) {
            if (oldSelectedStation) {
                oldSelectedStation.setStyle(renderIcon);
            }
        }

        if (selectedStation) {
            let selectedStyle = null;
            const icon_trend = selectedStation.get('icon_trend');
            if (icon_trend === 'Upward Trend'){
                selectedStyle = new Style({
                    image: new RegularShape({
                        fill: new Fill({
                            color: 'red'
                        }),
                        stroke: new Stroke({
                            color: 'blue',
                            width: 3
                        }),
                        points: 3,
                        radius: 8,
                        angle: 0
                    })
                });
            } if (icon_trend === 'Downward Trend'){
                selectedStyle = new Style({
                    image: new RegularShape({
                        fill: new Fill({
                            color: 'black'
                        }),
                        stroke: new Stroke({
                            color: 'blue',
                            width: 3
                        }),
                        points: 3,
                        radius: 8,
                        angle: Math.PI / 3
                    })
                });
            } if (icon_trend === 'No Significant Trend') {
                const circleStyle = new Style({
                    image: new Circle({
                        radius: 8,
                        fill: new Fill({
                            color: 'yellow'
                        }),
                        stroke: new Stroke({
                            color: 'blue',
                            width: 3
                        })
                    })
                });

                const innerCircleStyle = new Style({
                    image: new Circle({
                        radius: 2,
                        fill: new Fill({
                            color: 'black'
                        })
                    })
                });

                selectedStyle = [circleStyle, innerCircleStyle];
            }

            selectedStation.setStyle(selectedStyle);
        }
        setOldSelectedStation(selectedStation);
    }, [selectedStation]);

    // Set styling for selected watershed
    React.useEffect(() => {
        // This is the interaction to set style for the selected watershed
        if (oldSelectedWatershed !== selectedWatershed) {
            if (oldSelectedWatershed) {
                oldSelectedWatershed.setStyle(renderWaterSheds);
            }
        }

        if (selectedWatershed) {
            // Remove feature and add feature back to the map to make sure it is on top of the other layers
            const selectedStyle = new Style({
                stroke: new Stroke({
                    color: 'yellow',
                    width: 3
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 0, 0.2)'
                })
            });

            selectedWatershed.setStyle(selectedStyle);
        }
        setOldSelectedWatershed(selectedWatershed);
    }, [selectedWatershed]);



    // Interaction when you click on a trend station

    const handleMapClick = (event) => {
        const selectedFeature = event.map.forEachFeatureAtPixel(
            event.pixel,
            (feature) => feature
        );
        // Get corresponding watershed by SF_site_no if the selected feature is a trend station
        if (
            selectedFeature &&
            selectedFeature.getGeometry().getType() === 'Point'
        ) {
            // This always shows nitrogen my worry is the function passed to openlayers is not getting the updated value of selectedNutrient

            const correspondingWatershed = waterShedsLayer20years
                .getLayersArray()[0]
                .getSource()
                .getFeatures()
                .find(
                    (feature) => feature.get('id') === selectedFeature.get('SF_site_no')
                );
            setSelectedStation(selectedFeature);
            setSelectedWatershed(correspondingWatershed);
        } else {
            setSelectedStation(null);
            setSelectedWatershed(null);
        }
    };

    // Reset selected station and watershed when nutrient is changed
    React.useEffect(() => {
        setSelectedStation(null);
        setSelectedWatershed(null);

        // Change the visibility of the layers according to the nutrient
        makeLayerVisible();
    }, [selectedNutrient, selectedParameter, phosFluxTrendStationsLayer20years, phosConcTrendStationsLayer20years, nitrateTrendStationsData20Years]);

    const handleMapHover = (event) => {
        const pixel = event.pixel;
        const feature = event.map.forEachFeatureAtPixel(pixel, (feat) => feat);
        if (feature && feature.getGeometry().getType() === 'Point') {
            const name = feature.get('SF_station_nm');

            setTooltipContent(name);
            setTooltipPosition({ x: pixel[0] + 10, y: pixel[1] + 10 });
        } else {
            setTooltipContent('');
        }
    };

    const layers = {
        basemaps,
        riversLayer,
        waterShedsLayer20years,
        nitrateConcTrendStationsLayer20years,
        nitrateFluxTrendStationsLayer20years,
        phosConcTrendStationsLayer20years,
        phosFluxTrendStationsLayer20years
    };

    makeLayerVisible();
    const removeSelectedStation = () => {
        setSelectedStation(null);
        setSelectedWatershed(null);
    };

    if (nitrateConcTrendStationsLayer20years === null || nitrateFluxTrendStationsLayer20years === null ||
        phosConcTrendStationsLayer20years === null || phosFluxTrendStationsLayer20years === null ||
        waterShedsLayer20years === null || nitrateTrendStationsData20Years === null || phosTrendStationData20Years === null){
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Box textAlign="center">
                    <CircularProgress />
                    <p>Loading data...</p>
                </Box>
            </Box>
        );
    }


    return (
        <>
            <Grid className={classes.mainContainer} container alignItems="stretch">
                <Grid
                    className={classes.fillContainer}
                    item
                    xs={7}
                    key={selectedTimePeriod}
                >
                    <Map
                        className={classes.fillContainer}
                        zoom={2}
                        maxZoom={10}
                        minZoom={1}
                        extent={MAP_BOUNDS}
                        center={[-10072968, 4972295]}
                        layers={Object.values(layers)}
                        events={{
                            click: handleMapClick,
                            pointermove: handleMapHover
                        }}
                        updateMap={(map) => {
                            mapRef.current = map;
                        }}
                        layerSwitcherOptions={{}}
                    >
                        <button
                            onClick={() => setLegendOpen(!legendOpen)}
                            className={classes.legendButton}
                        >
                            <img
                                src={MapLegendIcon}
                                alt="Map Legend Icon"
                                style={{ width: '100%', height: '100%', display: 'block' }}
                            />
                        </button>

                        {legendOpen && (
                            <div className={classes.legend}>{trendStationsLegend}</div>
                        )}
                    </Map>
                    <div
                        ref={tooltipRef}
                        className="tooltip"
                        style={{
                            position: 'absolute',
                            left: `${tooltipPosition.x}px`,
                            top: `${tooltipPosition.y}px`,
                            backgroundColor: 'white',
                            display: tooltipContent ? 'block' : 'none'

                        }}
                    >
                        {tooltipContent}
                    </div>
                </Grid>
                <Grid className={classes.sidebar} item xs={5}>
                    <Sidebar
                        stationData={selectedStation ? selectedStation.values_ : null}
                        selectedNutrient={selectedNutrient}
                        setSelectedNutrient={setSelectedNutrient}
                        selectedTimePeriod={selectedTimePeriod}
                        setSelectedTimePeriod={setSelectedTimePeriod}
                        selectedParameter={selectedParameter}
                        setSelectedParameter={setSelectedParameter}
                        removeSelectedStation={removeSelectedStation}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Summary;
