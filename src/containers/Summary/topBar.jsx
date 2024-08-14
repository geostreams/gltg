import React from 'react';
import { Typography, FormControl, Grid, RadioGroup, FormControlLabel, FormLabel, Select, MenuItem, Radio, Button, InputLabel } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    topBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1),
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxHeight: '14%'
    },
    topBarTitle:{
        fontFamily: 'Poppins',
        fontSize: '2em',
        fontWeight: 700,
        textAlign: 'left'
    },
    topBarItem: {
        padding: theme.spacing(2)
    },
    formControl: {
        minWidth: 200,
        margin: theme.spacing(1)
    },
    formLabel: {
        fontSize: '.88rem'
    },
    selectButton: {
        'background': theme.palette.primary.main,
        'borderRadius': 4,
        'color': theme.palette.primary.contrastText,
        'position': 'relative',
        'padding': theme.spacing(1),
        'fontSize': '.75rem',
        '&:focus': {
            borderRadius: 4
        }
    },
    button: {
        margin: theme.spacing(1)
    }
}));

const TopBar = ({
    selectedNutrient,
    setSelectedNutrient,
    selectedTimePeriod,
    setSelectedTimePeriod,
    selectedParameter,
    setSelectedParameter
}) => {
    const classes = useStyles();

    const selectNutrientComponent = (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Choose a Nutrient</InputLabel>
            <Select
                value={selectedNutrient}
                onChange={({ target: { value } }) => {
                    setSelectedNutrient(value);
                }}
                label="Choose a Nutrient"
            >
                <MenuItem value="Nitrogen">Nitrate-N</MenuItem>
                <MenuItem value="Phosphorus">Phosphorus</MenuItem>
            </Select>
        </FormControl>
    );

    const selectPeriodComponent = (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Select Period</InputLabel>
            <Select
                value={selectedTimePeriod}
                onChange={({ target: { value } }) => {
                    setSelectedTimePeriod(value);
                }}
                label="Select Period"
            >
                <MenuItem value="20_years">2020-2020</MenuItem>
            </Select>
        </FormControl>
    );

    // Create custom radio
    const CustomRadio = withStyles({
        root: {
            '&$checked': {
                color: '#1976D2' // Checked color
            }
        },
        checked: {}
    })((props) => <Radio color="default" {...props} />);


    const selectVariableComponent = (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel>Choose a Flow normalized Nutrient Variable</FormLabel>
            <RadioGroup row value={selectedParameter} onChange={(e) => setSelectedParameter(e.target.value)}>
                {/*Common term for flux is load*/}
                <FormControlLabel value="flux" control={<CustomRadio />} label="Load" />
                <FormControlLabel value="concentration" control={<CustomRadio />} label="Concentration" />
            </RadioGroup>
        </FormControl>
    );

    return (
        <Grid container spacing={2} className={classes.topBar}>
            <Grid item className={classes.topBarItem}>
                <Typography variant="h1" className={classes.topBarTitle} >
                    Nutrient Trend Dashboard
                </Typography>
            </Grid>
            <Grid item className={classes.topBarItem}>
                {selectNutrientComponent}
            </Grid>
            <Grid item className={classes.topBarItem}>
                {selectPeriodComponent}
            </Grid>
            <Grid item className={classes.topBarItem}>
                {selectVariableComponent}
            </Grid>
        </Grid>
    );
};

export default TopBar;
