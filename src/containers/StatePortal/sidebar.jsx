import React from "react";
import {
	Typography,
	Box,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
} from "@material-ui/core";
import { Language, PictureAsPdf, Map, Dashboard } from "@material-ui/icons";
import { sidebarConfig } from "./sidebarConfig";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	sidebarContainer: {
		padding: "20px",
		backgroundColor: "#f4f4f4",
	},
	header: {
		fontSize: "1.5rem",
		marginBottom: "10px",
	},
	subHeader: {
		fontSize: "1rem",
		color: "#555",
		marginBottom: "20px",
	},
	sectionTitle: {
		fontSize: "1.2rem",
		marginBottom: "10px",
		fontWeight: "bold",
	},
	gridContainer: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gap: "20px",
	},
	card: {
		backgroundColor: "#eef3f8",
		borderRadius: "8px",
		padding: "15px",
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: "150px",
		position: "relative",
		textDecoration: "none",
		color: "inherit",
	},
	cardText: {
		fontSize: "1rem",
		fontWeight: "600",
		color: "#333",
		alignSelf: "flex-start",
	},
	icon: {
		position: "absolute",
		bottom: "10px",
		right: "10px",
		fontSize: "40px",
	},
	stateSelect: {
		marginTop: theme.spacing(3),
		minWidth: 200,
		backgroundColor: "#fff",
	},
}));

const highlightedStates = [
	"Minnesota",
	"Wisconsin",
	"Iowa",
	"Illinois",
	"Missouri",
	"Indiana",
	"Ohio",
	"Kentucky",
	"Arkansas",
	"Mississippi",
	"Tennessee",
	"Louisiana",
];

const Sidebar = ({ selectedState, onStateSelect }) => {
	const classes = useStyles();

	const handleStateChange = (event) => {
		onStateSelect(event.target.value);
	};

	const defaultView = (
		<>
			<Box mb={3}>
				<Typography variant="subtitle2" color="primary" gutterBottom>
					What is this page about?
				</Typography>
				<Typography variant="body2" color="primary" gutterBottom>
					Lorem ipsum dolor sit amet consectetur. Nulla tellus integer
					nisi fringilla facilisi ut ultrices. Malesuada ut faucibus
					lacus amet malesuada laoreet. Pellentesque sit nec dui id.
					Risus id lorem pellentesque bibendum tellus consequat turpis
					justo hac.
				</Typography>
			</Box>
			<Box>
				<Typography variant="subtitle2" color="primary" gutterBottom>
					What information will you get?
				</Typography>
				<Typography variant="body2" color="primary" gutterBottom>
					Lorem ipsum dolor sit amet consectetur. Nulla tellus integer
					nisi fringilla facilisi ut ultrices. Malesuada ut faucibus
					lacus amet malesuada laoreet. Pellentesque sit nec dui id.
					Risus id lorem pellentesque bibendum tellus consequat turpis
					justo hac.
				</Typography>
			</Box>
			<FormControl variant="outlined" className={classes.stateSelect}>
				<InputLabel id="state-select-label">Select a State</InputLabel>
				<Select
					labelId="state-select-label"
					id="state-select"
					value={selectedState || ""}
					onChange={handleStateChange}
					label="Select a State"
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{highlightedStates.map((state) => (
						<MenuItem key={state} value={state}>
							{state}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	);

	const stateView = (selectedState) => {
		const getIcon = (fileType) => {
			switch (fileType) {
				case "web":
					return <Language className={classes.icon} />;
				case "dashboard":
					return <Dashboard className={classes.icon} />;
				case "map":
					return <Map className={classes.icon} />;
				case "pdf":
					return <PictureAsPdf className={classes.icon} />;
				default:
					return null;
			}
		};

		const { header, subHeader, dataAndResources } =
			sidebarConfig[selectedState.toLowerCase()];

		return (
			<div className={classes.sidebarContainer}>
				<h1 className={classes.header}>{header}</h1>
				<p className={classes.subHeader}>{subHeader}</p>
				<h2 className={classes.sectionTitle}>Data and Resources</h2>
				<div className={classes.gridContainer}>
					{dataAndResources.map((resource, index) => (
						<a
							key={index}
							href={resource.url}
							className={classes.card}
							target="_blank"
							rel="noopener noreferrer"
						>
							<p className={classes.cardText}>{resource.name}</p>
							{getIcon(resource.fileType)}
						</a>
					))}
				</div>
				<FormControl variant="outlined" className={classes.stateSelect}>
					<InputLabel id="state-select-label">
						Select a State
					</InputLabel>
					<Select
						labelId="state-select-label"
						id="state-select"
						value={selectedState}
						onChange={handleStateChange}
						label="Select a State"
					>
						{highlightedStates.map((state) => (
							<MenuItem key={state} value={state}>
								{state}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
		);
	};

	return (
		<div
			style={{
				width: "45%",
				padding: "20px",
				background: "#f4f4f4",
				overflowY: "auto",
			}}
		>
			{selectedState && sidebarConfig[selectedState.toLowerCase()]
				? stateView(selectedState)
				: defaultView}
		</div>
	);
};

export default Sidebar;
