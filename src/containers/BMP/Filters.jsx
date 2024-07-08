// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

import { entries } from '@geostreams/core/src/utils/array';
import { BOUNDARIES, YEAR_RANGE, YEAR_RANGE_MARKS } from './config';
import { BMPContext } from './Context';

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

const Filters = () => {
    const classes = useStyle();

    const { dispatchFilterUpdate, filters, config } = React.useContext(BMPContext);

    const [areParametersExpanded, updateExpandParameters] = React.useState(true);

    const {
        years,
        boundaryType,
        selectedBoundaries
    } = filters;

    const handleParameterExpandClick = () => {
        updateExpandParameters(!areParametersExpanded);
    };

    return (
        <Container className={classes.container}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">Parameter Selections</Typography>
                <ButtonGroup>
                    <Button
                        className={classes.outlinedButton}
                        disabled={!areParametersExpanded}
                        onClick={() => {
                            dispatchFilterUpdate({ type: 'reset' });
                        }}>
                        Clear Parameters
                    </Button>
                    <Button className={classes.outlinedButton} onClick={handleParameterExpandClick}>
                        {areParametersExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
                    </Button>
                </ButtonGroup>
            </Box>

            {areParametersExpanded ?
                <>
                    <Typography variant="h6">
                        Select Boundary type
                    </Typography>
                    <Box display="flex">
                        <ToggleButtonGroup
                            className={classes.boundaryToggleContainer}
                            size="small"
                            value={boundaryType}
                            exclusive
                            onChange={(e, value) => {
                                if (value) {
                                    dispatchFilterUpdate({ type: 'boundaryType', value });
                                }
                            }}
                        >
                            {entries(BOUNDARIES).map(([name, { label }]) => (
                                <ToggleButton
                                    classes={{
                                        root: classes.boundaryToggleGroup,
                                        selected: classes.boundaryToggleGroupSelected
                                    }}
                                    key={name}
                                    value={name}
                                    selected={boundaryType === name}
                                >
                                    {label}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>

                        <Autocomplete
                            className={classes.boundarySelect}
                            size="small"
                            disableCloseOnSelect
                            options={config[boundaryType].map((attrs) => attrs[BOUNDARIES[boundaryType].idKey])}
                            filterOptions={
                                (options: string[]) => options.filter((option) => !selectedBoundaries.includes(option))
                            }
                            value={[]}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={`${BOUNDARIES[boundaryType].label}`}
                                    placeholder={`Select ${BOUNDARIES[boundaryType].label}`}
                                    variant="outlined"
                                />
                            )}
                            onChange={(e, selectedOptions) => {
                                dispatchFilterUpdate({ type: 'selectedBoundaries', value: [...selectedBoundaries, selectedOptions] });
                            }}
                        />
                    </Box>
                </> : null}
            {selectedBoundaries.length ?
                selectedBoundaries.map((boundary) => (
                    <Chip
                        key={boundary}
                        className={classes.selectedBoundary}
                        variant="outlined"
                        label={boundary}
                        onDelete={() => {
                            dispatchFilterUpdate({
                                type: 'selectedBoundaries',
                                value: selectedBoundaries.filter((b) => b !== boundary)
                            });
                        }}
                    />
                )) : <Typography className={classes.filtersSummary} variant="overline">
                    Results are aggregated across all {BOUNDARIES[boundaryType].label}s.
                </Typography>}

            {areParametersExpanded ?
                <>
                    <Typography variant="h6">Select Data Range</Typography>
                    <Container className={classes.dateRangeContainer}>
                        <Typography variant="h6" gutterBottom>{years[0]} - {years[1]}</Typography>
                        <Slider
                            marks={YEAR_RANGE_MARKS}
                            value={years}
                            min={YEAR_RANGE[0]}
                            max={YEAR_RANGE[1]}
                            onChange={(e, value) => dispatchFilterUpdate({ type: 'years', value })}
                            valueLabelDisplay="auto"
                        />
                    </Container>
                </> : <>
                    <Typography className={classes.filtersSummary} variant="overline" gutterBottom>
                        ({years[0]} - {years[1]})
                    </Typography>
                    <br />
                </>}
        </Container>
    );
};

export default Filters;
