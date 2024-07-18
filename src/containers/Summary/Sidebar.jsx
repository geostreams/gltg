import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, FormLabel, Select, MenuItem, Typography, Dialog, DialogTitle, DialogContent,
    DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper }from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import Divider from '@material-ui/core/Divider';
import { Clear } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import NoSignificantTrendIcon from '../../images/No_Significant_Trend_Icon.png';
import UpwardTrendIcon from '../../images/Upward_Trending_Icon.png';
import DownwardTrendIcon from '../../images/Downward_Trending_Icon.png';

import phosTrendStationDataUrl from '../../data/phos_trend_station_data_20years.json';
import nitrateTrendStationsDataUrl from '../../data/nitrate_trend_station_data_20years.json';


import SummaryGraph from './SummaryGraph';

const useStyles = makeStyles((theme) => ({
    sidebarBody: {
        width: '100%',
        paddingLeft: '1em',
        paddingRight: '1em'
    },
    divider: {
        borderTop: '1px dashed #000',
        backgroundColor: 'unset'
    },
    header: {
        display: 'flex',       // Using flexbox
        flexDirection: 'column',  // Align items vertically
        alignItems: 'flex-start',
        paddingTop: '0.5em',
        paddingRight: '1em',
        margin: '10px auto'
    },
    promptText:{
        margin: 0,
        letterSpacing: '0.5px',
        whiteSpace: 'nowrap',  // prevent wrapping
        overflow: 'hidden',    // hide overflow
        textOverflow: 'ellipsis',  // show ellipsis when text overflows
        color: '#E05769'
    },
    stationNameText:{
        color: '#E05769',
        fontSize: '1.15rem'
    },
    trendText:{
        color: '#073296',
        fontSize: '1rem'
    },
    headerText: {
        margin: 0,
        color: '#333',
        letterSpacing: '0.5px',
        whiteSpace: 'nowrap',  // prevent wrapping
        overflow: 'hidden',    // hide overflow
        textOverflow: 'ellipsis'  // show ellipsis when text overflows
    },
    subHeaderText:{
        margin: 0,
        color: '#333',
        letterSpacing: '0.5px',
        alignSelf: 'center' ,
        paddingTop: '0.5em'
    },
    infoIcon: {
        verticalAlign: 'super',
        fontSize: '0.8rem',
        marginLeft: '4px',
        cursor: 'pointer',
        color: '#333'
    },
    chartsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    chart: {
        backgroundColor: '#fff',
        // TODO: Change padding
        padding: theme.spacing(2),
        borderRadius: '5px',
        marginBottom: theme.spacing(2),
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
    },
    chartHeader: {
        // Centre the text
        textAlign: 'center',
        fontSize: '1.2rem',
        color: '#333',
        marginBottom: theme.spacing(1)
    },
    dropdownsContainer: {
        background: '#e2ebf4',
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        width: '150%'
    },
    formLabel: {
        padding: theme.spacing(1),
        fontSize: '.88rem'
    },
    selectButton: {
        'background': theme.palette.primary.main,
        'borderRadius': 4,
        'color': theme.palette.primary.contrastText,
        'position': 'relative',
        'height': 42,
        'padding': theme.spacing(2),
        'fontSize': '.75rem',
        '&:focus': {
            borderRadius: 4
        }
    },
    summaryBox: {
        padding: theme.spacing(2),
        backgroundColor: '#f7f7f7',
        borderRadius: '4px',
        margin: theme.spacing(2, 0)
    },
    legendIcon: {
        width: '1.75em',
        height: 'auto',
        marginRight: theme.spacing(1)
    },
    legendContainer: {
        display: 'flex',
        flexDirection: 'column', // Add this line to stack children vertically
        alignItems: 'flex-start',
        marginBottom: theme.spacing(1)
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1)
    },
    backButton:{
    //    right align the icon on the same line
        alignSelf: 'flex-end'
    },
    dialogCloseButton:{
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1)
    },
    table: {
        minWidth: 650
    },
    tableHeader: {
        fontWeight: 'bold',
        backgroundColor: '#f5f5f5' // This sets the background color for the header
    },
    title: {
        padding: 16, // Add padding around the title text
        fontWeight: 'bold'
    }

}));

function convertTrend(inputString) {
    const conversionDict = {
        'Downward trend in concentration is highly likely': 'Highly Likely Downward (0% - 10%)',
        'Upward trend in concentration is highly likely': 'Highly Likely Upward (90% - 100%)',
        'No Significant Trend': 'No Significant Trend (33% - 66%)',
        'Upward trend in concentration is likely': 'Likely Upward (66% - 90%)',
        'Downward trend in concentration is likely': 'Likely Downward (10% - 33%)',
        'Downward trend in flux is highly likely': 'Highly Likely Downward (0% - 10%)',
        'Upward trend in flux is highly likely': 'Highly Likely Upward (90% - 100%)',
        'Upward trend in flux is likely': 'Likely Upward (66% - 90%)',
        'Downward trend in flux is likely': 'Likely Downward (10% - 33%)'
    };

    return conversionDict[inputString];
}

// TO NOTE - The model by default provides "flux" but in the website use the more common term Load

const Sidebar = ({ stationData, selectedNutrient,setSelectedNutrient,selectedTimePeriod,setSelectedTimePeriod, removeSelectedStation, selectedParameter, setSelectedParameter }) => {
    const classes = useStyles();
    const [data, setData] = React.useState(null);
    const [openInfoDialog, setOpenInfoDialog] = React.useState(false);
    const [nitrateTrendStationsData20Years, setNitrateTrendStationsData20Years] = React.useState(null);
    const [phosTrendStationData20Years, setPhosTrendStationData20Years] = React.useState(null);

    React.useEffect(() => {
        fetch(nitrateTrendStationsDataUrl)
            .then(response => response.json())
            .then(nitrateData => {
                setNitrateTrendStationsData20Years(nitrateData);
            });
        fetch(phosTrendStationDataUrl)
            .then(response => response.json())
            .then(phosData => {
                setPhosTrendStationData20Years(phosData);
            });
    }, []);

    React.useEffect(() => {
        if (stationData) {
            switch (selectedNutrient) {
                case 'Nitrogen':
                    setData(nitrateTrendStationsData20Years[stationData.WQ_MonitoringLocationIdentifier]);
                    break;
                case 'Phosphorus':
                    setData(phosTrendStationData20Years[stationData.WQ_MonitoringLocationIdentifier]);
                    break;
            }
        } else {
            setData(null);
        }
    }, [stationData,nitrateTrendStationsData20Years, phosTrendStationData20Years]);

    // Remove the selected station when the time period is changed
    React.useEffect(() => {
        removeSelectedStation();
    }, [selectedTimePeriod]);

    const infoDialog = (
        <Dialog open={openInfoDialog} onClose={() => {setOpenInfoDialog(false);}}>

            <DialogTitle>Trend Information</DialogTitle>
            <IconButton
                className={classes.dialogCloseButton}
                onClick={() => setOpenInfoDialog(false)}
            >
                <Clear />
            </IconButton>
            <DialogContent>
                <DialogContentText>
                    <div>
                        <p>
                            The symbols used are similar to those used by the <a href="https://nawqatrends.wim.usgs.gov/swtrends/" target="_blank" rel="noreferrer"><strong>USGS Water-Quality Changes in the Nation’s Streams and Rivers</strong></a> website.
                        </p>
                        <br />
                        <p>
                            A likelihood-based approach was used to report these trend results. When the trend is "likely up" or "likely down", the trend likelihood value associated with the trend is between 0.85 and 1.0 -- in other words, the chance of the trend occurring in the specified direction is at least an 85 out of 100. When the trend is "somewhat likely up" or "somewhat likely down", the trend likelihood value associated with the trend is between 0.7 and 0.85 -- in other words, the chance of the trend occurring in the specified direction is between 70 and 85 out of 100. When the trend is "about as likely as not", the trend likelihood value associated with the trend is less than 0.7 -- in other words, the chance of the trend being either upward or downward is less than 70 out of 100.
                        </p>
                        <br />
                        <p>
                            This likelihood-based approach is used as an alternative to the null-hypothesis significance testing (NHST) approach that is often used when reporting water-quality trends. The likelihood-based approach gives people more intuitive information on the certainty of a trend estimate, and provides more evidence of a growing problem or initial clean-up successes. Consider an example where the chance of an upward trend in nitrate concentrations at a site is 80 out of 100 (a trend likelihood value of 0.80). Using the NHST approach and a traditional alpha value of either 0.05 or 0.1, the trend would be reported as nonsignificant. Using the likelihood-based approach, the trend would be reported instead as "somewhat likely up". The NHST approach could lead to a false sense of security because it indicates that there isn't strong proof of a growing problem. The likelihood-based approach indicates instead that it is somewhat likely conditions in the stream are not improving, giving people more information to use when making decisions about watershed management.
                        </p>
                        <br />
                        <p>
                            For more information on the philosophy of the likelihood-based approach, please see Hirsch and others (2015), "A bootstrap method for estimating uncertainty of water quality trends", at <a href="http://dx.doi.org/10.1016/j.envsoft.2015.07.017" target="_blank" rel="noreferrer">http://dx.doi.org/10.1016/j.envsoft.2015.07.017</a>. Trend likelihood values for nutrients, sediment, salinity, major ions, and carbon were determined using the bootstrap approach in that same report. Trend likelihood values for pesticides and aquatic ecology metrics were determined using the p-value reported from their respective trend tests, using the equation 1-(p-value/2). See Vecchia and others (2008), "Modeling Variability and Trends in Pesticide Concentrations in Streams", at <a href="http://onlinelibrary.wiley.com/doi/10.1111/j.1752-1688.2008.00225.x/pdf" target="_blank" rel="noreferrer">http://onlinelibrary.wiley.com/doi/10.1111/j.1752-1688.2008.00225.x/pdf</a> for more information on calculating p-values in the pesticide models. See Oelsner, G.P., Sprague, L.A., Murphy, J.C., Zuellig, R.E., Johnson, H.M., Ryberg, K.R.,...
                        </p>
                    </div>

                </DialogContentText>
            </DialogContent>
        </Dialog>
    );


    return (
        <div>
            {infoDialog}
            <Box
                className={classes.dropdownsContainer}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <FormControl
                    component="fieldset"
                    className={classes.formControl}
                >
                    <FormLabel
                        component="legend"
                        className={classes.formLabel}
                    >
                        <Box display="flex" alignItems="center">
                           Select Nutrient
                        </Box>
                    </FormLabel>
                    <Select
                        className={classes.selectButton}
                        value={selectedNutrient}
                        onChange={({ target: { value } }) => {
                            setSelectedNutrient(value);
                        }}
                    >
                        <MenuItem value="Nitrogen">Nitrate-N</MenuItem>
                        <MenuItem value="Phosphorus">Total Phosphorus</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    component="fieldset"
                    className={classes.formControl}
                >
                    <FormLabel
                        component="legend"
                        className={classes.formLabel}
                    >
                        <Box display="flex" alignItems="center">
                            Select Parameter
                        </Box>
                    </FormLabel>
                    <Select
                        className={classes.selectButton}
                        value={selectedParameter}
                        onChange={({ target: { value } }) => {
                            setSelectedParameter(value);
                        }}
                    >
                        <MenuItem value="concentration">Concentration</MenuItem>
                        <MenuItem value="flux">Load</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    component="fieldset"
                    className={classes.formControl}
                >
                    <FormLabel
                        component="legend"
                        className={classes.formLabel}
                    >
                        <Box display="flex" alignItems="center">
                           Select Time Period
                        </Box>
                    </FormLabel>
                    <Select
                        className={classes.selectButton}
                        value={selectedTimePeriod}
                        onChange={({ target: { value } }) => {
                            setSelectedTimePeriod(value);
                        }}
                    >
                        <MenuItem value="20_years">2000-2020</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <div className={classes.sidebarBody}>
                <Typography
                    className={classes.header}
                    variant="h5"
                >
                    Nutrient Trends Dashboard
                </Typography>
                <Divider className={classes.divider} />
                {!stationData ?
                    (<>
                        <Typography
                            className={classes.promptText}
                            variant="h5"
                        >
                            Select Station
                            <Tooltip title="Click on any station to view nutrient data graphs." arrow placement="top">
                                <InfoIcon className={classes.infoIcon} />
                            </Tooltip>
                        </Typography>
                        <Divider />
                        <Box className={classes.summaryBox}>
                            <Typography variant="h6" gutterBottom>
                                Dashboard Summary
                            </Typography>
                            <Typography variant="body1">
                                This dashboard provides an overview of nutrient data across various stations.
                                Use the map to select a station and view detailed data graphs corresponding to the
                                chosen station.
                            </Typography>
                        </Box>
                        <Divider />
                        <Box className={classes.legendBox}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography
                                    variant="h5"
                                >
                                    Trend Results
                                    <InfoIcon className={classes.infoIcon}
                                        onClick={() => setOpenInfoDialog(true)}
                                    />
                                </Typography>

                            </div>
                            <br />
                            <div className={classes.legendContainer}>
                                <div className={classes.legendItem}>
                                    <img
                                        src={UpwardTrendIcon}
                                        alt="Upward Trend Icon"
                                        className={classes.legendIcon}
                                    />
                                    <span>Upward Trend </span>
                                </div>
                                <div className={classes.legendItem}>
                                    <img
                                        src={NoSignificantTrendIcon}
                                        alt="No Significant Trend Icon"
                                        className={classes.legendIcon}
                                    />
                                    <span>No Significant Trend</span>
                                </div>

                                <div className={classes.legendItem}>
                                    <img
                                        src={DownwardTrendIcon}
                                        alt=" Downward Trend "
                                        className={classes.legendIcon}
                                    />
                                    <span>Downward Trend </span>
                                </div>
                            </div>
                        </Box>
                    </>) :
                    (<>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                                className={classes.headerText}
                                variant="h6"
                            >
                                Water Quality Station Name:
                            </Typography>
                            <IconButton
                                className={classes.backButton}
                                onClick={() => {
                                    removeSelectedStation();
                                }}
                            >
                                <Clear />
                            </IconButton>
                        </div>
                        <Typography
                            className={classes.stationNameText}
                            variant="span"
                        >
                            {stationData.WQ_MonitoringLocationName}
                        </Typography>
                        <Divider />
                        <div>
                            {data &&
                              <Box className={classes.chart}>
                                  <h4 className={classes.chartHeader}>Load Graph</h4>
                                  <SummaryGraph graph_data={data.flux} width={350} height={330} startAtZero={false}
                                      stationary_y_line_field="stationaryFNFlux"
                                      stationary_high_interval="stationaryFNFluxHigh"
                                      stationary_low_interval="stationaryFNFluxLow"
                                      non_stationary_y_line_field="nonStationaryFNFlux"
                                      non_stationary_high_interval="nonStationaryFNFluxHigh"
                                      non_stationary_low_interval="nonStationaryFNFluxLow"
                                      y_scatter_field="stationaryFluxDay"
                                      y_label="Yearly Cumulative Load (10^6 kg/yr)"
                                      x_label="Year"
                                      title="Mean (dots) & Flow-Normalized (line) Load Estimates" />
                                  <br />
                                  <Typography
                                      className={classes.trendText}
                                      variant="span"
                                  >
                                      Load Trend - {convertTrend(stationData.significance_flux)}<sup>*</sup>
                                  </Typography>
                              </Box>}

                            <Divider />
                            <br />
                            {data &&
                              <Box className={classes.chart}>
                                  <h4 className={classes.chartHeader}>Concentration Graph</h4>
                                  <SummaryGraph graph_data={data.concentration} width={350} height={330}
                                      startAtZero={false}
                                      stationary_y_line_field="stationaryFNConc"
                                      stationary_high_interval="stationaryFNConcHigh"
                                      stationary_low_interval="stationaryFNConcLow"
                                      non_stationary_y_line_field="nonStationaryFNConc"
                                      non_stationary_high_interval="nonStationaryFNConcHigh"
                                      non_stationary_low_interval="nonStationaryFNConcLow"
                                      y_scatter_field="stationaryConcDay"
                                      y_label="Yearly Average Concentration (mg/L)"
                                      x_label="Year"
                                      title="Mean (dots) & Flow-Normalized (line) Concentration " />
                                  <br />
                                  <Typography
                                      className={classes.trendText}
                                      variant="span"
                                  >
                                      Concentration Trend - {convertTrend(stationData.significance_concent)}<sup>*</sup>
                                  </Typography>
                              </Box>}
                        </div>
                        <span>
                            <sup>*</sup> Percentage ranges represent the probability that the trend is upwards
                        </span>
                        <br /><br />
                        <a><b>Total Trend</b>: Flow-Normalized Non-Stationary Streamflow with 90% Confidence
                            Interval</a>
                        <br /><br />
                        <a><b>Source/Sink Component</b>: Flow-Normalized Stationary Streamflow with 90% Confidence
                            Interval</a>
                        <br /><br />
                        <a><b>Flow Component</b>: Total Trend - Source/Sink Component</a>
                        <br /><br />
                        <br /><br />
                    </>)}
                <br />
            </div>
        </div>
    );
};

export default Sidebar;
