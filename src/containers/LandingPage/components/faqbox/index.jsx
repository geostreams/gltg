import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import classes from './index.css';


const FAQBox = (props) => {
    const {title, text} = props;
    return(
        <div className={classes.textDiv}>
            <h1 className={classes.textTitle}>{title}</h1>
            <p className={classes.textSubTitle}>{text}</p>
            <Button component={Link} to="/help" variant="outlined" style={{ color: '#000000', borderColor: '#000000', margin: 'auto' }} >Learn More</Button>
        </div>
    );
};

export default FAQBox;