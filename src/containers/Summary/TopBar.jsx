import React from "react";
import {
	Typography,
	FormControl,
	RadioGroup,
	FormControlLabel,
	FormLabel,
	Select,
	MenuItem,
	Radio,
	InputLabel,
	Container,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		backgroundColor: theme.palette.background.default,
		boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
		padding: theme.spacing(2),
		flexShrink: 0,
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(1),
		},
		position: "absolute",
	},
	container: {
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.up("md")]: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
	},
	topBarTitle: {
		fontFamily: "Poppins",
		fontSize: "2.2rem",
		fontWeight: 700,
		margin: theme.spacing(0.5),
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.25rem",
			marginBottom: theme.spacing(1),
		},
	},
	controlsContainer: {
		display: "flex",
		flexDirection: "column",
		gap: theme.spacing(1), // Reduced gap
		[theme.breakpoints.up("md")]: {
			flexDirection: "row",
			alignItems: "center",
			flexWrap: "wrap",
		},
	},
	formControl: {
		minWidth: "180px", // Slightly reduced
		[theme.breakpoints.up("md")]: {
			margin: theme.spacing(0, 1),
		},
	},
	formLabel: {
		fontSize: ".75rem", // Slightly reduced
		marginBottom: theme.spacing(0.5),
	},
	radioGroup: {
		justifyContent: "center",
		[theme.breakpoints.up("md")]: {
			justifyContent: "flex-start",
		},
	},
	selectButton: {
		background: theme.palette.primary.main,
		borderRadius: 4,
		color: theme.palette.primary.contrastText,
		padding: theme.spacing(1),
		fontSize: ".75rem",
		"&:focus": {
			borderRadius: 4,
		},
	},
	// Make form controls more compact
	selectRoot: {
		"& .MuiOutlinedInput-input": {
			padding: "10px 14px",
		},
	},
	radioLabel: {
		"& .MuiFormControlLabel-label": {
			fontSize: ".875rem",
		},
	},
}));

const TopBar = ({
	selectedNutrient,
	setSelectedNutrient,
	selectedTimePeriod,
	setSelectedTimePeriod,
	selectedParameter,
	setSelectedParameter,
}) => {
	const classes = useStyles();

	const CustomRadio = withStyles({
		root: {
			padding: "4px", // Reduced padding
			"&$checked": {
				color: "#1976D2",
			},
		},
		checked: {},
	})((props) => <Radio color="default" {...props} />);

	const selectNutrientComponent = (
		<FormControl
			variant="outlined"
			className={classes.formControl}
			size="small" // Add size="small"
		>
			<InputLabel>Choose a Nutrient</InputLabel>
			<Select
				value={selectedNutrient}
				onChange={({ target: { value } }) => setSelectedNutrient(value)}
				label="Choose a Nutrient"
				className={classes.selectRoot}
			>
				<MenuItem value="Nitrogen">Nitrate-N</MenuItem>
				<MenuItem value="Phosphorus">Total Phosphorus</MenuItem>
			</Select>
		</FormControl>
	);

	const selectPeriodComponent = (
		<FormControl
			variant="outlined"
			className={classes.formControl}
			size="small" // Add size="small"
		>
			<InputLabel>Select Period</InputLabel>
			<Select
				value={selectedTimePeriod}
				onChange={({ target: { value } }) => setSelectedTimePeriod(value)}
				label="Select Period"
				className={classes.selectRoot}
			>
				<MenuItem value="20_years">2000-2020</MenuItem>
			</Select>
		</FormControl>
	);

	const selectVariableComponent = (
		<FormControl
			component="fieldset"
			className={classes.formControl}
			size="small" // Add size="small"
		>
			<FormLabel className={classes.formLabel}>Choose a Flow normalized Nutrient Variable</FormLabel>
			<RadioGroup
				row
				value={selectedParameter}
				onChange={(e) => setSelectedParameter(e.target.value)}
				className={classes.radioGroup}
			>
				<FormControlLabel value="flux" control={<CustomRadio />} label="Load" className={classes.radioLabel} />
				<FormControlLabel
					value="concentration"
					control={<CustomRadio />}
					label="Concentration"
					className={classes.radioLabel}
				/>
			</RadioGroup>
		</FormControl>
	);

	return (
		<div className={classes.root}>
			<Container maxWidth="xl" style={{ padding: "0 16px" }}>
				<div className={classes.container}>
					<Typography variant="h1" className={classes.topBarTitle}>
						Nutrient Trend Dashboard
					</Typography>
					<div className={classes.controlsContainer}>
						{selectNutrientComponent}
						{selectPeriodComponent}
						{selectVariableComponent}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default TopBar;
