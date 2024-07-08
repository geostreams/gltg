import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid,Stack ,
    Button,
    Modal,
    Box,
    Typography,
    Link,
    FormControl,
    InputLabel,
    Menu,
    Select,
    MenuItem,
    Popover,
    MenuList
} from '@material-ui/core';
import classes from './index.css';

const ImageRow = (props) => {
    const history = useHistory();

    const {
        image1,
        image2,
        image3,
        header1,
        header2,
        header3,
        subheader1,
        subheader2,
        subheader3,
        link1,
        link2,
        link3,
        link4,
        link5,
        link6,
        link7,
        link8,
        link9
    } = props;
    const [image1Hover, setImage1Hover] = React.useState(false);
    const [image2Hover, setImage2Hover] = React.useState(false);
    const [anchorElIA, setAnchorElIA] = React.useState(null);
    const [anchorElIN, setAnchorElIN] = React.useState(null);

    const handleClickIA = (event) => {
        setAnchorElIA(event.currentTarget);
    };

    const handleCloseIA = () => {
        setAnchorElIA(null);
    };

    const handleClickIN = (event) => {
        setAnchorElIN(event.currentTarget);
    };

    const handleCloseIN = () => {
        setAnchorElIN(null);
    };

    return (
        <div className={classes.row}>
            <div
                className={classes.column}
                style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)),url(${image1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    cursor: 'pointer'
                }}
                onMouseEnter={() => setImage1Hover(true)}
                onMouseLeave={() => setImage1Hover(false)}
                onClick={() => history.push(link1)}
            >
                <div
                    className={classes.topLeft}
                    style={{ margin: '1em 0em 0em 0em', padding: '0.5em' }}
                >
                    <h2 className={classes.header}> {header1}</h2>
                </div>
                <div
                    className={classes.subHeadingtopLeft}
                    style={{ margin: '1em 0em 1em', padding: '0.5em' }}
                >
                    <p className={classes.descriptionText}> {subheader1}</p>
                </div>
            </div>
            <div
                className={classes.column}
                style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)),url(${image2})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    cursor: 'pointer'
                }}
                onMouseEnter={() => setImage2Hover(true)}
                onMouseLeave={() => setImage2Hover(false)}
                onClick={(e) => {
                    history.push(link2);
                }}
            >
                <div
                    className={classes.topLeft}
                    style={{
                        margin: '1em 0em 0em 0em',
                        padding: '0.5em 0.5em 0em 0.5em'
                    }}
                >
                    <h2 className={classes.header}> {header2}</h2>
                </div>
                <div
                    className={classes.subHeadingtopLeft}
                    style={{ margin: '1em 0em 1em', padding: '0.5em 0.5em 0.5em 0.5em' }}
                >
                    <p className={classes.descriptionText}> {subheader2}</p>
                </div>

                {header2 == 'State Portals' ? (
                    <>
                  
                        <Grid container spacing={2} style={{ margin: '7em 1em 0em 0em' }} >
                            <Grid item xs={2.5}>
                                <a href={link4}>
                                    <Button
                                        variant="contained"
                                        style={{ color: 'black', margin: '0em 0em 0em 1em' }}
                                    >
                  Illinois
                                    </Button>
                                </a>
                            </Grid>

                            <Grid item xs={2.5}>
                                <Button
                                    variant="contained"
                                    style={{ color: 'black', margin: '0em 0em 0em 1em' }}
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={handleClickIA}
                                >
                                    {' '}
                Iowa
                                </Button>

                                <Popover
                                    open={Boolean(anchorElIA)}
                                    anchorEl={anchorElIA}
                                    onClose={handleCloseIA}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                >
                                    <MenuList>
                                        <a href="https://programs.iowadnr.gov/aquia/search/map">
                                            <MenuItem>AQuIA Monitoring Site Map</MenuItem>
                                        </a>
                                        <a href="https://programs.iowadnr.gov/aquia/">
                                            <MenuItem>AQuIA Data Portal</MenuItem>
                                        </a>
                                    </MenuList>
                                </Popover>
                            </Grid>

                            <Grid item xs={2.5}>
                                <a href={link5}>
                                    <Button
                                        variant="contained"
                                        style={{ color: 'black', margin: '0em 0em 0em 1em' }}
                                    >
                                        {' '}
                  Arkansas
                                    </Button>
                                </a>
                            </Grid>

                            <Grid item xs={2.5}>
                                <Button
                                    variant="contained"
                                    style={{ color: 'black', margin: '0em 0em 0em 1em' }}
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={handleClickIN}
                                >
                                    {' '}
                        Indiana
                                </Button>

                                <Popover
                                    open={Boolean(anchorElIN)}
                                    anchorEl={anchorElIN}
                                    onClose={handleCloseIN}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                >
                                    <MenuList>
                                        <a href="https://storymaps.arcgis.com/stories/977fe35741c34a2b860b5702c797e020">
                                            <MenuItem>Water Quality Trends</MenuItem>
                                        </a>
                                        <a href="https://gisdata.in.gov/portal/apps/experiencebuilder/experience/?id=a7a5365d78444f79bcddc1bbbf443d1a">
                                            <MenuItem>Sediment and Nutrient Trends</MenuItem>
                                        </a>
                                    </MenuList>
                                </Popover>
                            </Grid>

                            <Grid item xs={2.5}>
                                <a href={link8}>
                                    <Button
                                        variant="contained"
                                        style={{ color: 'black', margin: '0em 0em 0em 1em' }}
                                    >
                                        {' '}
                        Missouri
                                    </Button>
                                </a>
                            </Grid>

                            <Grid item xs={2.5}>
                                <a href={link9}>
                                    <Button
                                        variant="contained"
                                        style={{ color: 'black', margin: '0em 0em 0em 1em' }}
                                    >
                                        {' '}
                            Tennessee
                                    </Button>
                                </a>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <div />
                )}
            </div>
            <div
                className={classes.column}
                style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)),url(${image3})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    cursor: 'pointer'
                }}
                onMouseEnter={() => setImage3Hover(true)}
                onMouseLeave={() => setImage3Hover(false)}
                onClick={() => history.push(link3)}
            >
                <div
                    className={classes.topLeft}
                    style={{
                        margin: '1em 0em 0em 0em',
                        padding: '0.5em 0.5em 0em 0.5em'
                    }}
                >
                    <h2 className={classes.header}> {header3}</h2>
                </div>
                <div
                    className={classes.subHeadingtopLeft}
                    style={{ margin: '1em 0em 1em', padding: '0.5em 0.5em 0em 0.5em' }}
                >
                    <p className={classes.descriptionText}> {subheader3}</p>
                </div>
            </div>
        </div>
    );
};

export default ImageRow;
