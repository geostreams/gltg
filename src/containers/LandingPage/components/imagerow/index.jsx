import React from 'react';
import { useHistory } from 'react-router-dom'
import classes from './index.css';
import { Button } from '@material-ui/core';
const ImageRow = (props) => {
    const history = useHistory();

    const { image1, image2, image3, header1, header2, header3, subheader1, subheader2, subheader3, link1, link2, link3, link4, link5 } = props;
    const [image1Hover, setImage1Hover] = React.useState(false);
    const [image2Hover, setImage2Hover] = React.useState(false);
    const [image3Hover, setImage3Hover] = React.useState(false);



    return (
        <div className={classes.row} >
            <div className={classes.column}
                style={{ background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)),url(${image1})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                onMouseEnter={() => setImage1Hover(true)}
                onMouseLeave={() => setImage1Hover(false)}
                onClick={() => history.push(link1)}
            >


                <div className={classes.topLeft} style={{ margin: "1em 0em 0em 0em" }}>
                    <h2 className={classes.header} > {header1}</h2>
                </div>
                <div className={classes.subHeadingtopLeft} style={{ margin: "1em 0em 1em"}}>
                    <p className={classes.descriptionText}> {subheader1}</p>
                </div>


            </div>
            <div className={classes.column}
                style={{ background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)),url(${image2})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                onMouseEnter={() => setImage2Hover(true)}
                onMouseLeave={() => setImage2Hover(false)}
                onClick={(e) => {
                    history.push(link2)
                }}
            >
                <div className={classes.topLeft} style={{ margin: "1em 0em 0em 0em" }}>
                    <h2 className={classes.header} > {header2}</h2>
                </div>
                <div className={classes.subHeadingtopLeft} style={{ margin: "1em 0em 1em"}}>
                    <p className={classes.descriptionText}> {subheader2}</p>
                </div>

                {header2 == "State Portals" ?
                    (<>
                        <a href={link4} target="_blank">
                            <Button
                                variant='outlined'
                                style={{ color: "white", margin: "13em 0.5em 1em 2em",borderColor:"white" }}>
                                Illinois
                            </Button>
                        </a>
                        <a href={link5} target="_blank">
                            <Button
                            variant='outlined'
                                style={{ color: "white", margin: "13em 0em 1em 2em" ,borderColor:"white" }}> Arkansas
                            </Button>
                        </a>
                    </>) :
                    (<div >

                    </div>)}

            </div>
            <div className={classes.column}
                style={{ background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)),url(${image3})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                onMouseEnter={() => setImage3Hover(true)}
                onMouseLeave={() => setImage3Hover(false)}
                onClick={() => history.push(link3)}
            >
                <div className={classes.topLeft} style={{ margin: "1em 0em 0em 0em" }}>
                    <h2 className={classes.header} > {header3}</h2>
                </div>
                <div className={classes.subHeadingtopLeft} style={{ margin: "1em 0em 1em"}} >
                    <p className={classes.descriptionText} > {subheader3}</p>
                </div>

            </div>
        </div>
    );
};

export default ImageRow;

