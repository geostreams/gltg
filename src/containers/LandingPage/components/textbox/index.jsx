import React from 'react';
import classes from './index.css';

const TextBox = (props) => {
    const {title, text} = props;
    return(
        <div className={classes.textDiv}>
            <h1 className={classes.textTitle}>{title}</h1>
            <p className={classes.textSubTitle}>{text}</p>
        </div>
    );
};

export default TextBox;