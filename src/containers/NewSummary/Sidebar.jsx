import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, FormLabel, InputBase, NativeSelect } from '@material-ui/core';
import trendStationsData_30years from '../../data/trend_station_data_30years.json';
import trendStationsData_20years from '../../data/trend_station_data_20years.json';
import trendStationsData_10years from '../../data/trend_station_data_10years.json';
import SummaryGraph from './SummaryGraph';

const useStyles = makeStyles((theme) => ({
    sidebar: {
        backgroundColor: '#f4f4f4',
        padding: theme.spacing(2),
        textAlign: 'center',
        maxWidth: '100%',
        margin: '0 auto'
    },
    header: {
        marginBottom: theme.spacing(2)
    },
    headerText: {
        color: '#333'
    },
    chartsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    chart: {
        backgroundColor: '#fff',
        padding: theme.spacing(2),
        borderRadius: '5px',
        marginBottom: theme.spacing(2),
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
    },
    chartHeader: {
        color: '#333',
        marginBottom: theme.spacing(1)
    },
    dropdownsContainer: {
        background: '#e2ebf4'
    },
    formControl: {
        margin: theme.spacing(1),
        width: '150%'
    },
    formLabel: {
        padding: theme.spacing(1),
        fontSize: '.88rem'
    },
    infoIcon: {
        color: '#0D73C5',
        fontSize: '1rem'
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

const Sidebar = ({ stationData, legend, selectedNutrient,setSelectedNutrient,selectedTimePeriod,setSelectedTimePeriod }) => {
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
        <div className={classes.sidebar}>
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
                            Nutrient
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
                            Time Period
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
            <div className={classes.header}>
                <h3 className={classes.headerText}>Station Name</h3>
                <h4 className={classes.headerText}>{stationData ? stationData.WQ_MonitoringLocationName : null}</h4>
            </div>
            <br />
            <div className={classes.chartsContainer}>
                <h3 className={classes.headerText}>Charts</h3>
                <br />
                {data &&
                    <div className={classes.chart}>
                        <h4 className={classes.chartHeader}>Flux Graph</h4>
                        <SummaryGraph graph_data={data.flux} width={350} height={300} startAtZero={false}
                            y_line_field="FNFlux" y_scatter_field="FluxDay"
                            y_label="Flux in 10^6 kg/yr"
                            x_label='Years'
                            title="Mean (dots) & Flow-Normalized (line) Flux Estimates" />
                    </div>}
                <br />
                {data &&
                    <div className={classes.chart}>
                        <h4 className={classes.chartHeader}>Concentration Graph</h4>
                        <SummaryGraph graph_data={data.concentration} width={350} height={300} startAtZero={false}
                            y_line_field="FNConc" y_scatter_field="ConcDay"
                            y_label="Concentration in mg/L"
                            x_label='Years'
                            title="Mean (dots) & Flow-Normalized (line) Concentration " />
                    </div>}
            </div>
            <br />
            <div>
                {legend}
            </div>
        </div>
    );
};

export default Sidebar;
