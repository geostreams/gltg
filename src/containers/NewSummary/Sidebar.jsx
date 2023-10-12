import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import trendStationsData from '../../data/trend_station_data_dates_aggregated.json';
import SummaryGraph from './SummaryGraph';
import { Box, FormControl, FormLabel, InputBase, NativeSelect } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { BOUNDARIES, VARIABLES_INFO } from '../Summary/config';
import { entries } from '../../../../../geodashboard/packages/core/src/utils/array';

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
    }
}));

const Sidebar = ({ stationData, legend }) => {
    const classes = useStyles();

    let data = null;

    if (stationData) {
        data = trendStationsData[stationData.WQ_MonitoringLocationIdentifier];
    }

    return (
        <div className={classes.sidebar}>
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
