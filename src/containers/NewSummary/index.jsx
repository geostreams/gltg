import React from 'react';
import Grid from '@material-ui/core/Grid';

// Summary Dashboard containing map displaying trendstations and a sidebar to display data
const Summary = () => {
    return(
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
                <div id="map">
                    <h1>Map</h1>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <div id="sidebar"></div>
            </Grid>
        </Grid>
    );
};

export default Summary;