import React from 'react';
import { Box, Typography, FormControl, RadioGroup, FormControlLabel,FormLabel, NativeSelect, Radio, Button,InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    topBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.default,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    formControl: {
        width: '10%'
    },
    formLabel: {
        fontSize: '.88rem'
    },
    selectButton: {
        'background': theme.palette.primary.main,
        'borderRadius': 4,
        'color': theme.palette.primary.contrastText,
        'position': 'relative',
    'padding': theme.spacing(2),
    'fontSize': '.75rem',
    '&:focus': {
        borderRadius: 4
    }
}
});

const TopBar = () => {
    const classes = useStyles();
    const [nutrient, setNutrient] = React.useState('');
    const [period, setPeriod] = React.useState('');
    const [variable, setVariable] = React.useState('load');

    const selectNutrientComponent = (
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
                value={nutrient}
                onChange={({ target: { value } }) => {
                    setNutrient(value);
                }}
                input={<InputBase />}
            >
                <option value="Nitrogen">Nitrogen</option>
            </NativeSelect>
        </FormControl>
    );

    const selectPeriodComponent = (
        <FormControl
            component="fieldset"
            className={classes.formControl}
        >
            <FormLabel
                component="legend"
                className={classes.formLabel}
            >
                <Box display="flex" alignItems="center">
                  Select Period
                </Box>
            </FormLabel>
            <NativeSelect
                className={classes.selectButton}
                value={period}
                onChange={({ target: { value } }) => {
                    setPeriod(value);
                }}
                input={<InputBase />}
            >
                <option value="2010-2019">2010-2019</option>
            </NativeSelect>
        </FormControl>
    );

    const selectVariableComponent = (
        <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup row value={variable} onChange={(e) => setVariable(e.target.value)}>
                <FormControlLabel value="load" control={<Radio />} label="Load" />
                <FormControlLabel value="concentration" control={<Radio />} label="Concentration" />
            </RadioGroup>
        </FormControl>
    );
    return (
        <Box className={classes.topBar}>
            <Typography variant="h6">
        Nutrient Trend Dashboard
            </Typography>
            {selectNutrientComponent}
            {selectPeriodComponent}
            {selectVariableComponent}
            <Button variant="outlined" className={classes.button}>
        Advanced Search
            </Button>
        </Box>
    );
};

export default TopBar;
