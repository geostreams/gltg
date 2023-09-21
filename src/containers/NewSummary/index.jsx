import React from 'react';
import Grid from '@material-ui/core/Grid';
import TileLayer from 'ol/layer/Tile';
import GroupLayer from 'ol/layer/Group';
import XYZ from 'ol/source/XYZ';
import OSM, { ATTRIBUTION as OSM_ATTRIBUTION } from 'ol/source/OSM';
import { Map } from '@geostreams/core/src/components/ol';
import { makeStyles } from '@material-ui/core/styles';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle, Stroke, RegularShape,Icon } from 'ol/style';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import { TileWMS } from 'ol/source';
import NoSignificantTrendIcon from '../../images/No_Significant_Trend_Icon.png';
import HighUpwardTrendIcon from '../../images/Highly_Upward_Trending_Icon.png';
import HighDownwardTrendIcon from '../../images/Highly_Downward_Trending_Icon.png';
import UpwardTrendIcon from '../../images/Upward_Trending_Icon.png';
import DownwardTrendIcon from '../../images/Downward_Trending_Icon.png';
import { GEOSERVER_URL , MAP_BOUNDS } from './config';
import trendStationsJSON from '../../data/trend_stations.geojson';
import Sidebar from './Sidebar';

// Styling for different components of Summary Dashboard
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
        'overflowY': 'auto',
        'overflowX': 'clip',
        '& a': {
            color: '#0D73C5'
        }
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1) // Use theme.spacing for consistent spacing
    },
    legendIcon: {
        width: '20px',
        height: '20px',
        marginRight: theme.spacing(1)
    },
    legendContainer: {
        // centre items in the legend
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

const renderIcon = (feature) => {
    if ((feature.get('significance_concent') === 'Upward trend in concentration is very likely' ||
            feature.get('significance_concent') === 'Upward trend in concentration is highly likely') ||
        (feature.get('significance_flux') === 'Upward trend in flux is very likely' ||
            feature.get('significance_flux') === 'Upward trend in flux is highly likely')) {
        return new Style({
            image: new Icon({
                src: HighUpwardTrendIcon
            })
        });
    } if ((feature.get('significance_concent') === 'Downward trend in concentration is very likely' ||
            feature.get('significance_concent') === 'Downward trend in concentration is highly likely') &&
        (feature.get('significance_flux') === 'Downward trend in flux is very likely' ||
            feature.get('significance_flux') === 'Downward trend in flux is highly likely')) {
        return new Style({
            image: new Icon({
                src: HighDownwardTrendIcon
            })
        });
    } if (feature.get('significance_concent') === 'Upward trend in concentration is likely' || feature.get('significance_flux') === 'Upward trend in flux is likely') {
        return new Style({
            image: new Icon({
                src: UpwardTrendIcon
            })
        });
    }if (feature.get('significance_concent') === 'Downward trend in concentration is likely' && feature.get('significance_flux') === 'Downward trend in flux is likely') {
        return new Style({
            image: new Icon({
                src: DownwardTrendIcon
            })
        });
    }
    return new Style({
        image: new Icon({
            src: NoSignificantTrendIcon
        })
    });
    
};

const Summary = () => {
    const classes = useStyles();

    const[selectedStation, setSelectedStation] = React.useState(null);
    const[oldSelectedStation, setOldSelectedStation] = React.useState(null);

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
                    url:  `${GEOSERVER_URL}/ows?`,
                    params: { LAYERS: 'gltg:us-states', TILED: true },
                    visible: true,
                    serverType: 'geoserver'
                })
            })
        ]
    });

    // This layer is the one with trendstations.
    const trendstations = new GroupLayer({
        title: 'Trend Stations',
        layers: [
            new VectorLayer({
                visible: true,
                title: 'Trend Stations',
                source: new VectorSource({
                    url: trendStationsJSON,
                    format: new GeoJSON()
                }),
                interactive: true,
                style: renderIcon
            })
        ]
    });

    // Create legend for trend stations
    const trendStationsLegend = React.useMemo(() => (
        <div>
            <h3>Icon Legend</h3>
            <br />  
            <div className={classes.legendContainer}>
                <div className={classes.legendItem}>
                    <img src={NoSignificantTrendIcon} alt="No Significant Trend Icon" className={classes.legendIcon} />
                    <span>No Significant Trend</span>
                </div>
                <div className={classes.legendItem}>
                    <img src={HighUpwardTrendIcon} alt="High Upward Trend Icon" className={classes.legendIcon} />
                    <span>High Upward Trend</span>
                </div>
                <div className={classes.legendItem}>
                    <img src={HighDownwardTrendIcon} alt="High Downward Trend Icon" className={classes.legendIcon} />
                    <span>High Downward Trend</span>
                </div>
                <div className={classes.legendItem}>
                    <img src={UpwardTrendIcon} alt="Upward Trend Icon" className={classes.legendIcon} />
                    <span>Upward Trend</span>
                </div>
                <div className={classes.legendItem}>
                    <img src={DownwardTrendIcon} alt="Downward Trend Icon" className={classes.legendIcon} />
                    <span>Downward Trend</span>
                </div>
            </div>
        </div>
    ), []);
    
    React.useEffect(() => {

        if(oldSelectedStation !== selectedStation){
            if(oldSelectedStation){
                oldSelectedStation.setStyle(renderIcon);
            }
        }

        if(selectedStation){
            const selectedStyle = new Style({
                image: new Circle({
                    radius: 8,
                    fill: new Fill({ color: 'rgba(0, 0, 255, 0.5)' }),
                    stroke: new Stroke({ color: 'blue', width: 1 })
                })
            });

            selectedStation.setStyle(selectedStyle);
        }
        setOldSelectedStation(selectedStation);
    }, [selectedStation]);

    // Interaction when you click on a trend station
    const handleMapClick = (event) => {
        const selectedFeature = event.map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
        if (selectedFeature) {
            setSelectedStation(selectedFeature);
        }else{
            setSelectedStation(null);
        }
    };


    const layers = {
        basemaps,
        trendstations
    };


    return(
        <Grid
            className={classes.mainContainer}
            container
            alignItems="stretch"
        >
            <Grid
                className="fillContainer"
                item
                xs={7}
            >
                <Map
                    className="fillContainer"
                    zoom={6}
                    minZoom={4 }
                    extent={MAP_BOUNDS}
                    center={[-9972968, 4972295]}
                    layers={Object.values(layers)}
                    events={{
                        click: handleMapClick
                    }}
                />
            </Grid>
            <Grid
                className={classes.sidebar}
                item
                xs={5}
            >
                <Sidebar
                    stationData={selectedStation ? selectedStation.values_ : null}
                    legend={trendStationsLegend}
                />
            </Grid>
        </Grid>
    );
};

export default Summary;