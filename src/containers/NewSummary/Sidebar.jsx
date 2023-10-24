import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, FormLabel, InputBase, NativeSelect, Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import Divider from '@material-ui/core/Divider';
import trendStationsData_30years from '../../data/trend_station_data.json';
import trendStationsData_20years from '../../data/trend_station_data.json';
import trendStationsData_10years from '../../data/trend_station_data.json';
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
    featureProp:{
        color: '#E05769'
    },
    stationNameText:{
        color: '#E05769',
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

    }
}));

const Sidebar = ({ stationData, selectedNutrient,setSelectedNutrient,selectedTimePeriod,setSelectedTimePeriod }) => {
    const classes = useStyles();

    const [data,setData] = React.useState(null);

    React.useEffect(() => {
        if (stationData) {
            switch (selectedTimePeriod) {
                case '10_years':
                    setData(trendStationsData_10years[stationData.WQ_MonitoringLocationIdentifier]);
                    break;
                case '20_years':
                    setData(trendStationsData_20years[stationData.WQ_MonitoringLocationIdentifier]);
                    break;
                case '30_years':
                    setData(trendStationsData_30years[stationData.WQ_MonitoringLocationIdentifier]);
                    break;

            }
        } else {
            setData(null);
        }
    }, [selectedTimePeriod,stationData]);



    return (
        <div>
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
                    <NativeSelect
                        className={classes.selectButton}
                        value={selectedNutrient}
                        onChange={({ target: { value } }) => {
                            selectedNutrient(value);
                        }}
                        input={<InputBase />}
                    >
                        <option value="Nitrogen">Nitrogen</option>
                    </NativeSelect>
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
                    <NativeSelect
                        className={classes.selectButton}
                        value={selectedTimePeriod}
                        onChange={({ target: { value } }) => {
                            setSelectedTimePeriod(value);
                        }}
                        input={<InputBase />}
                    >
                        <option value="10_years">Last 10 years</option>
                        <option value="20_years">Last 20 years</option>
                        <option value="30_years">Last 30 years</option>
                    </NativeSelect>
                </FormControl>
            </Box>
            <div className={classes.sidebarBody}>
                <Typography
                    className={classes.header}
                    variant="h5"
                >
                    Nutrient Trend Dashboard
                </Typography>
                <Divider className={classes.divider} />
                {!stationData ?
                    (<>
                        <div className={classes.headerText}>
                            <h3 className={classes.featureProp}>
                        Select Station
                                <Tooltip title="Click on any station to view nutrient data graphs." arrow placement="top">
                                    <InfoIcon className={classes.infoIcon} />
                                </Tooltip>
                            </h3>
                        </div>
                    </>) :
                    (<>
                        <Typography
                            className={classes.headerText}
                            variant="h6"
                        >
                            Station Name - <span className={classes.stationNameText}>{stationData.WQ_MonitoringLocationName}</span>
                        </Typography>
                        <div>
                            {data &&
                        <Box className={classes.chart}>
                            <h4 className={classes.chartHeader}>Flux Graph</h4>
                            <SummaryGraph graph_data={data.flux} width={350} height={330} startAtZero={false}
                                stationary_y_line_field="stationaryFNFlux"
                                stationary_high_interval="stationaryFNFluxHigh"
                                stationary_low_interval="stationaryFNFluxLow"
                                non_stationary_y_line_field="nonStationaryFNFlux"
                                non_stationary_high_interval="nonStationaryFNFluxHigh"
                                non_stationary_low_interval="nonStationaryFNFluxLow"
                                y_scatter_field="stationaryFluxDay"
                                y_label="Flux in 10^6 kg/yr"
                                x_label='Years'
                                title="Mean (dots) & Flow-Normalized (line) Flux Estimates" />
                        </Box>}

                            <Divider />
                            <br />
                            {data &&
                        <Box className={classes.chart}>
                            <h4 className={classes.chartHeader}>Concentration Graph</h4>
                            <SummaryGraph graph_data={data.concentration} width={350} height={330} startAtZero={false}
                                stationary_y_line_field="stationaryFNConc"
                                stationary_high_interval="stationaryFNConcHigh"
                                stationary_low_interval="stationaryFNConcLow"
                                non_stationary_y_line_field="nonStationaryFNConc"
                                non_stationary_high_interval="nonStationaryFNConcHigh"
                                non_stationary_low_interval="nonStationaryFNConcLow"
                                y_scatter_field="stationaryConcDay"
                                y_label="Concentration in mg/L"
                                x_label='Years'
                                title="Mean (dots) & Flow-Normalized (line) Concentration " />
                        </Box>}
                        </div>
                    </>)}
                <br />
            </div>
        </div>
    );
};

export default Sidebar;
