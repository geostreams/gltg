import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import classes from './index.css';

const About = () => (

    <div className={classes.introDiv}>
        <Box className={classes.introBox} >
            <div style ={{ marginTop:'1.875em' }}>
                <Typography variant="h4" align="center" className={classes.introTitle} gutterBottom>
                    Welcome to the Great Lakes to Gulf Virtual Observatory
                </Typography>
            </div>
            <div style={{ marginLeft: '3em' , width: '90%' }}>
                <Typography className={classes.introSubtitle} gutterBottom>
                    The Great Lakes to Gulf Virtual Observatory (GLTG) is an interactive application that provides user-friendly access to water quality information about the Mississippi River and its tributaries. Users can:
                </Typography>
            </div>
            <div style={{ marginLeft: '7em' , marginTop:'1em', width: '80%' }}>
                <Typography className={classes.introList} gutterBottom>
                    <ul>
                        <li>Select and compare current and historic water quality conditions in rivers and streams.</li>
                        <li>Analyze and graph specific parameters.</li>
                        <li>Examine data layers contributing to observed water quality - such as land cover, rainfall, and more.</li>
                        <li>Download data for further exploration.</li>
                    </ul>
                </Typography>
            </div>
            <div style={{ marginLeft: '3em' , marginTop:'1em', width: '90%' }}>
                <Typography className={classes.introSubtitle} gutterBottom>
                    GLTG helps people visualize and better understand nutrient pollution and its potential causes. Find out more and try it out for yourself via the resources below.                    </Typography>
            </div>
        </Box>
        <div className={classes.photoCredit}>
            <p> Photo by Todd Trapani on Unsplash</p>
        </div>
    </div>
);

export default About;
