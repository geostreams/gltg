// @flow
import React from 'react';
import {
    Box,
    Container,
    Divider,
    FormControl,
    InputLabel,
    Select,
    Slider,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { entries } from 'gd-core/src/utils/array';

import { BOUNDARIES, YEAR_RANGE } from '../config';
import { FiltersContext } from './Context';

const useStyle = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150
    }
}));

const Filters = () => {
    const classes = useStyle();

    const { dispatch, filters } = React.useContext(FiltersContext);

    const {
        years,
        boundaryType,
        selectedBoundaries
    } = filters;

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Years - {years[0]} - {years[1]}</Typography>
            <Slider
                marks
                value={years}
                min={YEAR_RANGE[0]}
                max={YEAR_RANGE[1]}
                onChange={(e, value) => dispatch({ type: 'years', value })}
                valueLabelDisplay="auto"
            />

            <Divider />

            <Typography variant="h6" gutterBottom>
                Boundaries
            </Typography>
            <Box display="flex">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="BoundaryType">
                        Boundary type
                    </InputLabel>
                    <Select
                        native
                        value={boundaryType}
                        inputProps={{
                            name: 'boundary-type',
                            id: 'BoundaryType'
                        }}
                        onChange={({ target: { value } }) => {
                            dispatch({ type: 'boundaryType', value });
                        }}
                    >
                        {entries(BOUNDARIES).map(([name, { label }]) => (
                            <option
                                key={name}
                                value={name}
                            >
                                {label}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <Autocomplete
                    className={classes.formControl}
                    multiple
                    disableCloseOnSelect
                    includeInputInList
                    limitTags={2}
                    ChipProps={{
                        size: 'small'
                    }}
                    options={BOUNDARIES[boundaryType].options}
                    value={selectedBoundaries}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={`${BOUNDARIES[boundaryType].label}`}
                            placeholder={`Select ${BOUNDARIES[boundaryType].label}`}
                        />
                    )}
                    onChange={(e, selectedOptions) => {
                        dispatch({ type: 'selectedBoundaries', value: selectedOptions });
                    }}
                />
            </Box>
        </Container>
    );
};

export default Filters;