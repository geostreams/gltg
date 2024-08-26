import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableSortLabel,
    Box
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import nitrateStationGeoData from '../../data/nitrate_trend_stations_20_years.geojson';
import phosStationGeoData from '../../data/phos_trend_stations_20_years.geojson';

const confidenceMapping = {
    1: '0%-10%',
    2: '10%-33%',
    3: '33%-66%',
    4: '66%-90%',
    5: '90%-100%'
};

// Utility function to parse the GeoJSON data
const parseTrendJSONData = (data, trendTableData, selectedParameter) => {
    try {
        if (data) {
            return data.features.map((feature) => {

                const {
                    SF_station_nm, conc_trend_inc_prob_range, conc_icon_trend,
                    flux_icon_trend, flux_trend_inc_prob_range, WQ_MonitoringLocationIdentifier, SF_site_no
                } = feature.properties;
                // Getting the last years value for that parameter
                // TODO - The parameter can switch between conc and flux, need to handle this

                let ret = null;
                switch (selectedParameter) {
                    case 'concentration':
                        ret = {
                            station: SF_station_nm,
                            confidence_range: conc_trend_inc_prob_range,
                            trend: conc_icon_trend,
                            confidence: confidenceMapping[conc_trend_inc_prob_range] || 'Unknown',
                            lastValue: trendTableData[WQ_MonitoringLocationIdentifier]
                                .concentration.slice(-1)[0].nonStationaryFNConc,
                            SF_site_no
                        };
                        break;
                    case 'flux':
                        ret = {
                            station: SF_station_nm,
                            confidence_range: flux_trend_inc_prob_range,
                            trend: flux_icon_trend,
                            confidence: confidenceMapping[flux_trend_inc_prob_range] || 'Unknown',
                            lastValue: trendTableData[WQ_MonitoringLocationIdentifier].flux.slice(-1)[0].nonStationaryFNFlux,
                            SF_site_no
                        };

                }
                return ret;
            });
        }
        return null;
    } catch (error) {
        console.error('Error parsing JSON data:', error);
        return [];
    }
};

const TrendStationTable = ({ data, title, selectedParameter, onSelectStation, selectedStation }) => {
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        const sorted = [...data].sort((a, b) =>
            sortOrder === 'asc' ? a.lastValue - b.lastValue : b.lastValue - a.lastValue
        );
        setSortedData(sorted);
    }, [data, sortOrder]);

    const handleSortRequest = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleRowClick = (watershedID) => {
        onSelectStation(watershedID);
    };

    const chooseConfidenceColor = (confidence) => {
        switch (confidence) {
            case '90%-100%':
                return '#ffcccc';
            case '66%-90%':
                return '#ffebcc';
            default:
                return '#f2f2f2';
        }
    }
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
            >
                <Typography variant="h6" style={{
                    fontWeight: 400,
                    size: '1rem',
                    color: '#2D3C4A'
                }}>{title}</Typography>
                <Typography variant="subtitle1" style={{
                    marginLeft: 'auto',
                    fontWeight: 700,
                    size: '1rem',
                    color: '#2D3C4A'
                }}>
                    {sortedData.length}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ width: '100%', maxHeight: 300, overflow: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Water Quality Station Name</TableCell>
                                <TableCell sortDirection={sortOrder}>
                                    <TableSortLabel
                                        active
                                        direction={sortOrder}
                                        onClick={handleSortRequest}
                                    >
                                        {selectedParameter === 'concentration'
                                            ? 'Most recent concentration value (mg/L)'
                                            : 'Most recent load value (10^4 kg/yr)'}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Probability of Increasing Trend</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.map((row) => (
                                <TableRow
                                    onClick={() => handleRowClick(row.SF_site_no)}
                                    hover
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor:
                                            row.SF_site_no === selectedStation ? '#f0f0f0' : 'inherit',
                                    }}
                                >
                                    <TableCell>{row.station}</TableCell>
                                    <TableCell>{row.lastValue}</TableCell>
                                    <TableCell>
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                padding: '4px 8px',
                                                backgroundColor:chooseConfidenceColor(row.confidence),
                                                borderRadius: '20px',
                                                color: '#333',
                                                fontWeight: 500
                                            }}
                                        >
                                            {row.confidence}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default function TrendTables({ trendTableData, selectedNutrient, selectedParameter,setSelectedTrendTableStation }) {
    const [trendStationData, setTrendStationData] = useState({});
    const [upwardTrendData, setUpwardTrendData] = useState([]);
    const [downwardTrendData, setDownwardTrendData] = useState([]);
    const [stableTrendData, setStableTrendData] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);

    useEffect(() => {
        const fetchGeoJSONData = async () => {
            try {
                let response = null;
                switch (selectedNutrient) {
                    case 'Nitrogen':
                        response = await fetch(nitrateStationGeoData);
                        break;
                    case 'Phosphorus':
                        response = await fetch(phosStationGeoData);
                        break;
                }
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const geoJSONData = await response.json();
                setTrendStationData(geoJSONData);
            } catch (error) {
                console.error('Error fetching GeoJSON data:', error);
            }
        };
        fetchGeoJSONData();
    }, [selectedNutrient]);

    useEffect(() => {
        if (trendTableData && Object.keys(trendTableData).length > 0) {
            const parsedData = parseTrendJSONData(trendStationData, trendTableData, selectedParameter);
            const filterData = (trendType) => parsedData.filter((station) => station.trend === trendType);

            setUpwardTrendData(filterData('Upward Trend'));
            setDownwardTrendData(filterData('Downward Trend'));
            setStableTrendData(filterData('No Significant Trend'));
        }
    }, [selectedParameter, trendStationData, trendTableData]);

    const handleSelectStation = (watershedID) => {
        setSelectedTrendTableStation(watershedID);
        setSelectedStation(watershedID);
    };


    return (
        <div>
            <TrendStationTable
                data={upwardTrendData}
                title="Number of Upward Trend Stations"
                selectedParameter={selectedParameter}
                onSelectStation={handleSelectStation}
                selectedStation={selectedStation}
            />
            <TrendStationTable
                data={downwardTrendData}
                title="Number of Downward Trend Stations"
                selectedParameter={selectedParameter}
                onSelectStation={handleSelectStation}
                selectedStation={selectedStation}
            />
            <TrendStationTable
                data={stableTrendData}
                title="Number of No Significant Trend Stations"
                selectedParameter={selectedParameter}
                onSelectStation={handleSelectStation}
                selectedStation={selectedStation}
            />
        </div>
    );
}
