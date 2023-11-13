import React from 'react';
import { Grid, Typography, Divider, Container } from '@material-ui/core';
import { BaseControlPortal, Map } from '@geostreams/core/src/components/ol';
import {  LAYERS, MAP_CENTER } from './config';
import { makeStyles } from '@material-ui/core/styles';
import Control from '@geostreams/core/src/components/ol/Control';
const useStyle = makeStyles((theme) => ({
    mapContainer: {
        height: 'calc(100% - 50px)'
    },
}));

const SpecificMap = ({ handleMapClick, handleMapHover, hoveredBoundaryInfo }) => {
    const classes = useStyle();
    const mapControlsRef = React.useRef({
        boundaryInfo: new Control({
            className: classes.boundaryInfoMapControl
        })
    });

    return (
        <Grid
            className={classes.mapContainer}
            item
            xs={6}
        >
            <Map
                className="fillContainer"
                zoom={5}
                center={MAP_CENTER}
                layers={Object.values(LAYERS)}
                layerSwitcherOptions={{}}
                controls={[mapControlsRef.current.boundaryInfo]}
                events={{
                    click: handleMapClick,
                    pointermove: handleMapHover
                }}
            >
                <BaseControlPortal el={mapControlsRef.current.boundaryInfo.element}>
                    <Container>
                        <Typography variant="subtitle2">
                            Select boundaries using the map or the form on the right
                        </Typography>
                        <Divider />
                        {hoveredBoundaryInfo.map(([label, value]) => (
                            <Typography key={label} variant="body2">{label}: {value}</Typography>
                        ))}
                    </Container>
                </BaseControlPortal>
            </Map>
        </Grid>
    );
};

export default SpecificMap;
