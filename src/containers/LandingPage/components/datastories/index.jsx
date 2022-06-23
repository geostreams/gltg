import React from 'react';
import { Box ,Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import DataStory from '../../Images/DataStory.jpg'
import classes from './index.css';


const DataStories = () => (
    <div className={classes.row} >
        <div className={classes.imageColumn} style={{ background: `url(${DataStory})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', backgroundPosition: 'center' }} >
            <div className={classes.photoCredit}>
                <p> Photo by Justin Wilkens on Unsplash</p>
            </div>
        </div>
        <div className={classes.textColumn}>
            <Box textAlign='center'>
                <h1 className={classes.header}> Data Stories</h1>
                <p className={classes.text}> Learn more about specific water quality case studies from throughout the region.</p>
                <div className={classes.button}>
                    <Button component={Link} to="data-stories" variant="outlined" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}>Learn More</Button>
                </div>
            </Box>
        </div>
    </div>
);

export default DataStories;