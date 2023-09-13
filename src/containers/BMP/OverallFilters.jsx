// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';

import { Autocomplete } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

import { entries } from '@geostreams/core/src/utils/array';
import { BOUNDARIES, YEAR_RANGE, YEAR_RANGE_MARKS } from './config';
import { BMPContext } from './Context';

import {FUNDING_AGENCIES} from './config';

const useStyle = makeStyles((theme) => ({
    container: {
        'background': '#F0F6F9',
        'padding': theme.spacing(2),
        '& > *' : {
            marginBottom: theme.spacing(2)
        }
    },
    filtersSummary: {
        fontSize: '1rem',
        fontWeight: 500,
        marginRight: theme.spacing(2)
    },
    outlinedButton: {
        color: '#1677B6',
        borderColor: '#1677B6'
    },
    boundaryToggleContainer: {
        background: '#d4dce0'
    },
    boundaryToggleGroup: {
        margin: theme.spacing(0.5),
        border: 'none',
        minWidth: 200,
        height: 30,
        color: '#000',
        borderRadius: '5px !important'
    },
    boundaryToggleGroupSelected: {
        color: '#000 !important',
        backgroundColor: '#fff !important',
        border: '1px solid #384B59 !important'
    },
    boundarySelect: {
        marginLeft: theme.spacing(1),
        minWidth: 200
    },
    selectedBoundary: {
        margin: theme.spacing(.5),
        border: '2px solid #CC2C40'
    },
    dateRangeContainer: {
        background: '#fff'
    }
}));

const OverallFilters = () => {

    const classes = useStyle();
    const fundingAgenices = FUNDING_AGENCIES;
    const [fundingAgency, setFundingAgency] = React.useState(fundingAgenices[0].value);
    const [allYears, setAllYears] = React.useState(false);
    // TODO: Figure out how to dynamically set the year range
    const YEAR_RANGE = [2010, 2020];
    return (
        <Container className={classes.container}>
            <FormControl>
                <Typography variant="h6">
                    Select Funding Agency
                </Typography>
                <RadioGroup
                    aria-label="funding-agency"
                    name="funding-agency"
                    value={fundingAgency}
                    onChange={(event) => setFundingAgency(event.target.value)}
                >
                    {fundingAgenices.map((agency) => (
                        <FormControlLabel
                            key={agency.value}
                            value={agency.value}
                            control={<Radio />}
                            label={agency.label}
                        />
                    ))}
                </RadioGroup>
                <br />
                <Typography variant="h6">
                    Years
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={allYears}
                            onChange={(event) => setAllYears(event.target.checked)}
                            name="all-years"
                            color="primary"
                        />
                    }
                    label="All Years"
                />
            </FormControl>
            {
                !allYears &&
                <>
                    <Typography variant="h6">
                        Select Date Range
                    </Typography>
                    <Slider
                        defaultValue={YEAR_RANGE[0]}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={YEAR_RANGE[0]}
                        max={YEAR_RANGE[1]}
                    />
                </>
            }
        </Container>
    );
};

export default OverallFilters;
