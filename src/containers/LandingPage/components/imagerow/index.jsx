import React from 'react';
import classes from './index.css';

const ImageRow = (props) => {
    const { image1, image2, image3, header1, header2, header3, subheader1,subheader2,subheader3 } = props;
    const [image1Hover, setImage1Hover] = React.useState(false);
    const [image2Hover, setImage2Hover] = React.useState(false);
    const [image3Hover, setImage3Hover] = React.useState(false);



    return (
        <div className={classes.row} >
            <div className={classes.column} style={{ background: `-moz-linear-gradient(270deg, rgba(0, 0, 0, 0) 8.58%, rgba(0, 0, 0, 0.8) 100%),url(${image1})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                onMouseEnter={() => setImage1Hover(true)}
                onMouseLeave={() => setImage1Hover(false)}
            >
                {image1Hover ?
                    (<>
                        <div className={classes.bottomLeft}>
                            <h2 className={classes.header} > {header1}</h2>
                        </div>
                        <div className={classes.subHeadingbottomLeft}>
                            <p className={classes.descriptionText}> {subheader1}</p>
                        </div>
                    </>) :
                    (<div className={classes.headingBottomLeft}>
                        <h2 className={classes.header} > {header1}</h2>
                    </div>)}
            </div>
            <div className={classes.column} style={{ background: `-moz-linear-gradient(270deg, rgba(0, 0, 0, 0) 8.58%, rgba(0, 0, 0, 0.8) 100%),url(${image2})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                onMouseEnter={() => setImage2Hover(true)}
                onMouseLeave={() => setImage2Hover(false)}
            >
                {image2Hover ?
                    (<>
                        <div className={classes.bottomLeft}>
                            <h2 className={classes.header} > {header2}</h2>
                        </div>
                        <div className={classes.subHeadingbottomLeft}>
                            <p className={classes.descriptionText}> {subheader2}</p>
                        </div>
                    </>) :
                    (<div className={classes.headingBottomLeft}>
                        <h2 className={classes.header} > {header2}</h2>
                    </div>)}
            </div>
            <div className={classes.column} style={{ background: `-moz-linear-gradient(270deg, rgba(0, 0, 0, 0) 8.58%, rgba(0, 0, 0, 0.8) 100%),url(${image3})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                onMouseEnter={() => setImage3Hover(true)}
                onMouseLeave={() => setImage3Hover(false)}
            >
                {image3Hover ?
                    (<>
                        <div className={classes.bottomLeft}>
                            <h2 className={classes.header} > {header3}</h2>
                        </div>
                        <div className={classes.subHeadingbottomLeft}>
                            <p className={classes.descriptionText}> {subheader3}</p>
                        </div>
                    </>) :
                    (<div className={classes.headingBottomLeft}>
                        <h2 className={classes.header} > {header1}</h2>
                    </div>)}
            </div>
        </div>
    );
};

export default ImageRow;

