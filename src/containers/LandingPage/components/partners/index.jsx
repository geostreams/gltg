import React from 'react';
import classes from './index.css';

const Funding = (props) => {
    const { partner1, partner2, partner3, partner4, partner5 } = props;
    return(
        <div className={classes.textDiv}>
            <h1 className={classes.textTitle}>Partners</h1>
            <div className={classes.row} >
                <div className={classes.column} style={{ background: `url(${partner1})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
                <div className={classes.column} style={{ background: `url(${partner2})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
                <div className={classes.column} style={{ background: `url(${partner3})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
                <div className={classes.column} style={{ background: `url(${partner4})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
                <div className={classes.column} style={{ background: `url(${partner5})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
            </div>
            <div className={classes.row} >
                <div className={classes.column} style={{ background: `url(${partner1})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
                <div className={classes.column} style={{ background: `url(${partner2})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
                <div className={classes.column} style={{ background: `url(${partner3})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
                <div className={classes.column} style={{ background: `url(${partner4})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
                <div className={classes.column} style={{ background: `url(${partner5})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
            </div>
        </div>
    );
};

export default Funding;