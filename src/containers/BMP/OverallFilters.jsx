// @flow
import React from 'react';
import { makeStyles,Dialog, DialogTitle, DialogContent, DialogContentText,IconButton } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import InfoIcon from '@material-ui/icons/Info';
import { Clear } from '@material-ui/icons';

import Container from '@material-ui/core/Container';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';

import {
    FUNDING_AGENCIES,
    FUNDING_YEAR_RANGES
} from './config';

const useStyle = makeStyles((theme) => ({
  
    container: {
        'background': '#F0F6F9',
        'padding': theme.spacing(2),
        '& > *': {
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
        margin: theme.spacing(0.5),
        border: '2px solid #CC2C40'
    },
    dateRangeContainer: {
        background: '#fff'
    },
    infoIcon: {
        color: '#0D73C5',
        fontSize: '0.9rem',
        verticalAlign: 'super'
    },
    dialogCloseButton:{
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1)
    }
}));

const OverallFilters = ({ setParameterString }) => {
    const classes = useStyle();
    const fundingAgenices = FUNDING_AGENCIES;
    const [fundingAgency, setFundingAgency] = React.useState(
        fundingAgenices[0].value
    );
    const [allYears, setAllYears] = React.useState(false);
    const [selectedStateBoundary, setSelectedStateBoundary] =
    React.useState(true);
    const [selectedFunding, setSelectedFunding] = React.useState(true);
    const FA_YEAR_RANGE = FUNDING_YEAR_RANGES[fundingAgency];
    const [selectedYear, setSelectedYear] = React.useState(FA_YEAR_RANGE[0]);
    
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialogContent, setDialogContent] = React.useState(null);
    const [dialogTitle, setDialogTitle] = React.useState(null);

    // TODO: Replace placeholder data with data from Laura
    const programDialogText = (
        <>
            <p>
                <strong>EQIP:</strong> The Environmental Quality Incentives Program (EQIP) provides financial and technical assistance to agricultural producers to address natural resource concerns and deliver environmental benefits.
            </p>
            <br />
            <p>
                <strong>CSP:</strong> The Conservation Stewardship Program (CSP) helps agricultural producers maintain and improve their existing conservation systems and adopt additional conservation activities to address priority resource concerns.
            </p>
            <br />
            <p>
                <strong>EPA 319:</strong> The EPA Section 319 grant program supports a range of activities including technical assistance, financial assistance, education, training, technology transfer, demonstration projects, and monitoring to assess the success of specific nonpoint source implementation projects.
            </p>
        </>
    );

    const fundCostInfo = (
        <>
            <p>
                <strong>FUNDING:</strong> This option allows users to view the total funding allocated to various programs. It provides insights into the budgetary allocation and distribution across different sectors and activities.
            </p>
            <br />
            <p>
                <strong>PROGRAM COUNT:</strong> By selecting this option, users can view the total number of programs initiated or currently running. It's a metric to understand the volume and scale of efforts made in different areas.
            </p>
        </>
    );
    

    
    React.useEffect(() => {
        let urlEndPoint = 'gltg:';

        if (selectedStateBoundary) {
            urlEndPoint += 'state';
        } else {
            urlEndPoint += 'huc8';
        }

        urlEndPoint += `_bmp_${ fundingAgency.toUpperCase() }_${ selectedYear }_`;

        if (selectedFunding) {
            urlEndPoint += 'funding';
        } else {
            urlEndPoint += 'count';
        }
        setParameterString(urlEndPoint);
   
    }, [fundingAgency, selectedYear, selectedFunding, selectedStateBoundary]);
    const handleYearChange = (event, newValue) => {
        setSelectedYear(newValue);
    };
    // Make a list of all slider marks
    const slider_marks = [];
    for (let i = FA_YEAR_RANGE[0]; i <= FA_YEAR_RANGE[1]; i += 1) {
        slider_marks.push({
            value: i,
            label: i
        });
    }

    const bmpDialog = (
        <Dialog open={openDialog} onClose={() => {setOpenDialog(false);}}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <IconButton
                className={classes.dialogCloseButton}
                onClick={() => setOpenDialog(false)}
            >
                <Clear />
            </IconButton>
            <DialogContent>
                <DialogContentText>
                    {dialogContent}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );

    return (
        <>
            {bmpDialog}
            <Container className={classes.container}>
                <FormControl>
                    <Typography variant="h6">
                    Select Program Type
                        <InfoIcon
                            className={`actionIcon ${classes.infoIcon}`}
                            onClick = {() => {
                                setDialogTitle('Program Type Information');
                                setDialogContent(programDialogText);
                                setOpenDialog(true);
                            }}
                        />
                    </Typography>
                    <RadioGroup
                
                        aria-label="funding-agency"
                        name="funding-agency"
                        value={fundingAgency}
                        onChange={(event) => {
                            setFundingAgency(event.target.value);
                            const newYearRange = FUNDING_YEAR_RANGES[event.target.value];
                            if (selectedYear < newYearRange[0]){
                                setSelectedYear(newYearRange[0]);
                            } else if (selectedYear > newYearRange[1]){
                                setSelectedYear(newYearRange[1]);
                            }
                        }}
                    >
                        {fundingAgenices.map((agency) => (
                            <FormControlLabel
                                key={agency.value}
                                value={agency.value}
                                control={<Radio color='primary' />}
                                label={agency.label}
                            />
                        ))}
                    </RadioGroup>
                    <br />
                    <Typography variant="h6">Select  Boundary</Typography>
                    <ToggleButtonGroup
                        value={selectedStateBoundary}
                        exclusive
                        onChange={(event, value) => setSelectedStateBoundary(value)}
                        className={classes.boundaryToggleContainer}
                    >
                        <ToggleButton
                            value
                            className={`${classes.boundaryToggleGroup} ${
                                selectedStateBoundary ? classes.boundaryToggleGroupSelected : ''
                            }`}
                        >
            State
                        </ToggleButton>
                        <ToggleButton
                            value={false}
                            className={`${classes.boundaryToggleGroup} ${
                                !selectedStateBoundary ? classes.boundaryToggleGroupSelected : ''
                            }`}
                        >
            HUC8
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <br />
                    <br />
                    <Typography variant="h6">
                    Select Funding/Practice Count
                        <InfoIcon
                            className={`actionIcon ${classes.infoIcon}`}
                            onClick={()=>{
                                setDialogTitle('Funding/Practice Count Information');
                                setDialogContent(fundCostInfo);
                                setOpenDialog(true);
                            }}
                        />
                    </Typography>
                    <ToggleButtonGroup
                        value={selectedFunding}
                        exclusive
                        onChange={(event, value) => setSelectedFunding(value)}
                        className={classes.boundaryToggleContainer}
                    >
                        <ToggleButton
                            value
                            className={`${classes.boundaryToggleGroup} ${
                                selectedFunding ? classes.boundaryToggleGroupSelected : ''
                            }`}
                        >
            Funding
                        </ToggleButton>
                        <ToggleButton
                            value={false}
                            className={`${classes.boundaryToggleGroup} ${
                                !selectedFunding ? classes.boundaryToggleGroupSelected : ''
                            }`}
                        >
            Program Count
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <br />
                    <Typography variant="h6">Years</Typography>
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
                {!allYears && (
                    <>
                        <Typography variant="h6">Select Year</Typography>
                        <Slider
                            value={selectedYear}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            onChange={handleYearChange}
                            marks={slider_marks}
                            min={FA_YEAR_RANGE[0]}
                            max={FA_YEAR_RANGE[1]}
                        />
                    </>
                )}
            </Container>
        </>
    );
};

export default OverallFilters;
