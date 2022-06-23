import React from 'react';
import classes from './index.css';

const Funding = (props) => {
    const { image1, link1 } = props;
    return(
        <>
            <div className={classes.textDiv}>
                <h1 className={classes.textTitle}>Funding</h1>
                <div className={classes.row} >
                    <div className={classes.column} style = {{ backgroundColor :'white' }} />
                    <div className={classes.column} style={{ background: `url(${image1})`, backgroundRepeat: 'no-repeat', backgroundSize: '80%', backgroundPosition: 'center' }} onClick={() => window.open(link1)} />
                    <div className={classes.column} />
                </div>
                <p className={classes.textSubTitle} >The Great Lakes to Gulf Virtual Observatory is a cyber-infrastructure framework constructed in collaboration with the National Center for Supercomputing Applications (NCSA) and the National Great Rivers Research and Education Center (NGRREC) with funding provided by NGRREC and the Walton Family Foundation. </p>
            </div>
        </>
    );
};

export default Funding;