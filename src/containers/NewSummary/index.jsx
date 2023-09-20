import React from 'react';
import Grid from '@material-ui/core/Grid';
import TileLayer from 'ol/layer/Tile';
import GroupLayer from 'ol/layer/Group';
import XYZ from 'ol/source/XYZ';
import OSM, { ATTRIBUTION as OSM_ATTRIBUTION } from 'ol/source/OSM';
import { Map, BaseControlPortal } from '@geostreams/core/src/components/ol';
import { makeStyles } from '@material-ui/core/styles';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle, Stroke } from 'ol/style';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import { entries } from '@geostreams/core/src/utils/array';
import { MAP_BOUNDS, trendStationsJSON } from './config';



const useStyles = makeStyles({
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
        '& a': {
            color: '#0D73C5'
        }
    }
});
const Summary = () => {
    const classes = useStyles();
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
            })
        ]
    });

    console.log('trendStationsJSON');
    console.log(trendStationsJSON);

    // const trendstations = {
    //     trendstations:{
    //         visible:true,
    //         label:'Trend Stations',
    //         layers: [
    //             {
    //                 url: trendStationsJSON,
    //                 style: new Style({
    //                     image: new Circle({
    //                         radius: 5,
    //                         fill: new Fill({ color: 'rgba(255, 0, 0, 0.5)' }),
    //                         stroke: new Stroke({ color: 'red', width: 1 })
    //                     })
    //                 })
    //             }
    //         ]
    //     }
    // };
    

    const layers = {
        basemaps: basemaps
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
                xs={8}
            >
                <Map
                    className="fillContainer"
                    zoom={7}
                    minZoom={5}
                    extent={MAP_BOUNDS}
                    center={[-9972968, 4972295]}
                    // controls={[this.boundaryInfoControl, this.legendControl]}
                    layers={Object.values(layers)}
                    // legends={this.legends}
                />
            </Grid>
            <Grid
                className={classes.sidebar}
                item
                xs={4}
            />
        </Grid>
    );
};

export default Summary;