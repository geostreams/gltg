import React from 'react';
import classes from './index.css';

const Partners = (props) => {
    const { partner1, partner2, link1, link2 } = props;
    return(
        <div className={classes.textDiv}>
            <h1 className={classes.textTitle}>Partners</h1>
            <div className={classes.row} >
                <div className={classes.column} style={{ background: `url(${partner1})`, backgroundRepeat: 'no-repeat', backgroundSize: '50%', backgroundPosition: 'center' }} onClick={() => window.open(link1)}/>
                <div className={classes.column} style={{ background: `url(${partner2})`, backgroundRepeat: 'no-repeat', backgroundSize: '60%', backgroundPosition: 'center' }} onClick={() => window.open(link2)}/>
            </div>
        </div>
    );
};

export default Partners;