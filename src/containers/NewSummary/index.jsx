import React from 'react';
import Grid from '@material-ui/core/Grid';
import TileLayer from 'ol/layer/Tile';
import GroupLayer from 'ol/layer/Group';
import XYZ from 'ol/source/XYZ';
import OSM, { ATTRIBUTION as OSM_ATTRIBUTION } from 'ol/source/OSM';
import { Map, BaseControlPortal } from '@geostreams/core/src/components/ol';
import { makeStyles } from '@material-ui/core/styles';
import { MAP_BOUNDS } from './config';



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
                >
                </Map>
            </Grid>
            <Grid
                className={classes.sidebar}
                item
                xs={4}
            >
            </Grid>
        </Grid>
    );
};

export default Summary;