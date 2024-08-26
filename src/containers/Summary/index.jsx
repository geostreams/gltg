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
import { Stroke } from 'ol/style';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import RegularShape from 'ol/style/RegularShape';
import { TileWMS } from 'ol/source';
import { Map as MapType } from 'ol';
import NoSignificantTrendIcon from '../../images/NoSignificantTrendIcon.png';
import UpwardTrendIcon from '../../images/UpwardTrendIcon.png';
import DownwardTrendIcon from '../../images/DownwardTrendIcon.png';

import MapLegendIcon from '../../images/Map_Legend_Icon.png';
import { GEOSERVER_URL, MAP_BOUNDS } from './config';

import Sidebar from './Sidebar';
import Topbar from './topBar';

// Styling for different components of Nutrient Trends Dashboard
const useStyles = makeStyles((theme) => ({
    fillContainer: {
        width: '100%',
        height: '100%',
        marginTop:'1.1%'
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
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.2em',
        marginRight: theme.spacing(2)
    },
    legendIcon: {
        width: '1em',
        height: '1em',
        marginRight: theme.spacing(1)
    },
    legendContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap:'10%',
        padding: '1%',
        backgroundColor: 'white',
        borderRadius: '5%',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        opacity: 0.8,
        zIndex: 1000,
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '45%'
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



const Summary = () => {
    const classes = useStyles();

    // Holds an instance of @geostreams/core/ol/Map component
    const mapRef = React.useRef();

    // This state variable is used to keep track of the selected station
    const [selectedStation, setSelectedStation] = React.useState(null);
    const [oldSelectedStation, setOldSelectedStation] = React.useState(null);
    const [showCharts, setShowCharts] = React.useState(false);

    // This state variable is used to keep track of the selected watershed
    const [selectedWatershed, setSelectedWatershed] = React.useState(null);
    const [oldSelectedWatershed, setOldSelectedWatershed] = React.useState(null);

    // State variable to keep track of sidebar inputs
    const [selectedNutrient, setSelectedNutrient] = React.useState('Nitrogen');
    const [selectedTimePeriod, setSelectedTimePeriod] =
        React.useState('20_years');
    const [selectedParameter, setSelectedParameter] = React.useState('concentration');

    // Trend table state
    const [selectedTrendTableStation, setSelectedTrendTableStation] = React.useState(null);

    // Tooltip
    const [tooltipContent, setTooltipContent] = React.useState('');
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const tooltipRef = React.useRef();

    // Lazy load the geoJSON and json files
    const[nitrateTrendStationsLayer20years,setNitrateTrendStationsLayer20years ] = React.useState(null);
    const[phosTrendStationsLayer20years, setPhosTrendStationsLayer20years] = React.useState(null);

    const [waterShedsLayer20years, setWaterShedsLayer20years] = React.useState(null);
    const [nitrateTrendStationsData20Years, setNitrateTrendStationsData20Years] = React.useState(null);
    const [phosTrendStationData20Years, setPhosTrendStationData20Years] = React.useState(null);


    const renderIcon = (feature) => {
        let icon_trend = null;
        if(selectedParameter === 'concentration') icon_trend = feature.get('conc_icon_trend');
        if (selectedParameter === 'flux') icon_trend = feature.get('flux_icon_trend');
        if (icon_trend === 'Upward Trend'){
            return new Style({
                image: new RegularShape({
                    fill: new Fill({
                        color: '#E78998'
                    }),
                    border: new Stroke({
                        color: 'red',
                        width: 5
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
                        color: '#81A8E6'
                    }),
                    border: new Stroke({
                        color: '#1557FE',
                        width: 5
                    }),
                    points: 3,
                    radius: 8,
                    angle: Math.PI / 3
                })
            });
        } if (icon_trend === 'No Significant Trend'){
            return new Style({
                image: new RegularShape({
                    fill: new Fill({
                        color: '#AEAEAA'
                    }),
                    border: new Stroke({
                        color: 'black',
                        width: 5
                    }),
                    points: 4,
                    radius: 8,
                    angle: Math.PI / 4
                })
            });
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

    const makeLayerVisible = () =>{
        const map = mapRef.current;
        if (map) {
            if (selectedNutrient === 'Nitrogen') {
                nitrateTrendStationsLayer20years.setVisible(true);
                phosTrendStationsLayer20years.setVisible(false);
            } else {
                nitrateTrendStationsLayer20years.setVisible(false);
                phosTrendStationsLayer20years.setVisible(true);
            }
        }
    };

    // useEffect to lazy load the geoJSON files
    React.useEffect(()=>{
        import('../../data/nitrate_trend_stations_20_years.geojson').then((data) => {
            const nitrateTrendStationsJSON20Years = data.default;
            setNitrateTrendStationsLayer20years(
                new GroupLayer({
                    title: 'Nitrate Trend Stations',
                    layers: [
                        new VectorLayer({
                            visible: true,
                            title: 'Trend Stations',
                            source: new VectorSource({
                                url: nitrateTrendStationsJSON20Years,
                                format: new GeoJSON()
                            }),
                            interactive: true,
                            style: renderIcon
                        })
                    ]
                })
            );
        });

        import('../../data/phos_trend_stations_20_years.geojson').then((data) => {
            const phosTrendStationsJSON20Years = data.default;
            setPhosTrendStationsLayer20years(
                new GroupLayer({
                    title: 'Phosphorus Trend Stations',
                    layers: [
                        new VectorLayer({
                            visible: true,
                            title: 'Trend Stations',
                            source: new VectorSource({
                                url: phosTrendStationsJSON20Years,
                                format: new GeoJSON()
                            }),
                            interactive: true,
                            style: renderIcon
                        })
                    ]
                })
            );
        });
        import('../../data/phos_trend_station_data_20years.json').then((data) => {
            const phosTrendStationsJSON20Years = data.default;
            setPhosTrendStationData20Years(
                new GroupLayer({
                    title: 'Phosphorus Trend Stations',
                    layers: [
                        new VectorLayer({
                            visible: true,
                            title: 'Trend Stations',
                            source: new VectorSource({
                                url: phosTrendStationsJSON20Years,
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
            <div className={classes.legendContainer}>
                <div className={classes.legendItem}>
                    <img
                        src={UpwardTrendIcon}
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
                        src={DownwardTrendIcon}
                        alt=" Downward Trend "
                        className={classes.legendIcon}
                    />
                    <span>Downward Trend </span>
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
            let icon_trend = null;
            if(selectedParameter === 'concentration') icon_trend = selectedStation.get('conc_icon_trend');
            if (selectedParameter === 'flux') icon_trend = selectedStation.get('flux_icon_trend');
            if (icon_trend === 'Upward Trend'){
                selectedStyle = new Style({
                    image: new RegularShape({
                        fill: new Fill({
                            color: 'red'
                        }),
                        stroke: new Stroke({
                            color: 'red',
                            width: 1
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
                            color: 'blue'
                        }),
                        stroke: new Stroke({
                            color: 'blue',
                            width: 1
                        }),
                        points: 3,
                        radius: 8,
                        angle: Math.PI / 3
                    })
                });
            } if (icon_trend === 'No Significant Trend') {
                selectedStyle = new Style({
                    image: new RegularShape({
                        fill: new Fill({
                            color: '#000000'
                        }),
                        border: new Stroke({
                            color: '#000000',
                            width: 1
                        }),
                        points: 4,
                        radius: 8,
                        angle: Math.PI / 4
                    })
                });
            }

            selectedStation.setStyle(selectedStyle);
        }
        setOldSelectedStation(selectedStation);
    }, [selectedStation, selectedParameter]);

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
            setShowCharts(true);
        } else {
            setSelectedStation(null);
            setSelectedWatershed(null);
            setShowCharts(false);
        }
    };

    // Reset selected station and watershed when nutrient is changed
    React.useEffect(() => {
        setSelectedStation(null);
        setSelectedWatershed(null);

        // Change the visibility of the layers according to the nutrient
        makeLayerVisible();
    }, [selectedNutrient]);

    // This useEffect will be triggered whenever selectedParameter changes
    React.useEffect(() => {
        // Ensure that the styles are refreshed when selectedParameter changes
        if (nitrateTrendStationsLayer20years && phosTrendStationsLayer20years) {
            // Update the style function for both layers
            nitrateTrendStationsLayer20years.getLayers().forEach((layer) => {
                layer.setStyle(renderIcon); // Reassign the style function
                layer.getSource().changed(); // Trigger refresh
            });

            phosTrendStationsLayer20years.getLayers().forEach((layer) => {
                layer.setStyle(renderIcon); // Reassign the style function
                layer.getSource().changed(); // Trigger refresh
            });
        }
    }, [selectedParameter, nitrateTrendStationsLayer20years, phosTrendStationsLayer20years]);

    // useEffect to handle selection of station in trendTable
    React.useEffect(() => {
        //     Set corresponding watershed to visible
        if (waterShedsLayer20years){
            const correspondingWatershed = waterShedsLayer20years
                .getLayersArray()[0]
                .getSource()
                .getFeatures()
                .find(
                    (feature) => feature.get('id') === selectedTrendTableStation
                );

            setSelectedWatershed(correspondingWatershed);
        }
        if (nitrateTrendStationsData20Years && phosTrendStationData20Years) {
            let stationsLayer = null;
            switch (selectedNutrient) {
                case 'Nitrogen':
                    stationsLayer = nitrateTrendStationsLayer20years;
                    break;
                case 'Phosphorus':
                    stationsLayer = phosTrendStationsLayer20years;
                    break;
            }
            if (stationsLayer){
                const correspondingStation = stationsLayer
                    .getLayersArray()[0]
                    .getSource()
                    .getFeatures()
                    .find(
                        (feature) => feature.get('SF_site_no') === selectedTrendTableStation
                    );
                console.log(correspondingStation);
                setSelectedStation(correspondingStation);
            }
        }
    },[selectedTrendTableStation]);


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
        nitrateTrendStationsLayer20years,
        phosTrendStationsLayer20years
    };

    makeLayerVisible();
    const removeSelectedStation = () => {
        setSelectedStation(null);
        setSelectedWatershed(null);
    };

    if (nitrateTrendStationsLayer20years === null || phosTrendStationsLayer20years === null ||
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
            <Topbar selectedNutrient={selectedNutrient} setSelectedNutrient={setSelectedNutrient}
                selectedTimePeriod={selectedTimePeriod} setSelectedTimePeriod={setSelectedTimePeriod}
                selectedParameter={selectedParameter} setSelectedParameter={setSelectedParameter} />
            <Grid className={classes.mainContainer} container alignItems="stretch">
                <Grid
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
                        {trendStationsLegend}
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
                        setSelectedTrendTableStation={setSelectedTrendTableStation}
                        showCharts={showCharts}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Summary;
