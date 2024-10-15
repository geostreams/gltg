import React, { useState } from "react";
import {
	Box,
	Typography,
	Tabs,
	Tab,
	Button,
	Paper,
	makeStyles,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "600px",
		padding: theme.spacing(3),
		display: "flex",
		flexDirection: "column",
	},
	flexContainer: {
		display: "flex",
		flex: 1,
		overflow: "hidden",
	},
	column: {
		width: "50%",
		height: "100%",
		padding: theme.spacing(0, 2),
		display: "flex",
		flexDirection: "column",
	},
	mapContainer: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: theme.spacing(2),
	},
	mapImage: {
		maxWidth: "100%",
		maxHeight: "100%",
		objectFit: "contain",
	},
	launchButton: {
		marginTop: "auto",
	},
	tabContent: {
		padding: theme.spacing(2),
		overflow: "auto",
		flex: 1,
	},
	contentSection: {
		marginBottom: theme.spacing(2),
	},
	listItem: {
		display: "list-item",
		listStyleType: "disc",
		marginLeft: theme.spacing(2),
	},
}));

const ContentRenderer = ({ content }) => {
	const classes = useStyles();

	const renderContent = (item) => {
		switch (item.type) {
			case "paragraph":
				return <Typography paragraph>{item.text}</Typography>;
			case "heading":
				return (
					<Typography variant="h6" gutterBottom>
						{item.text}
					</Typography>
				);
			case "list":
				return (
					<List>
						{item.items.map((listItem, index) => (
							<ListItem key={index} className={classes.listItem}>
								<ListItemText primary={listItem} />
							</ListItem>
						))}
					</List>
				);
			default:
				return null;
		}
	};

	console.log("content", content);
	return (
		<>
			{content.map((item, index) => (
				<Box key={index} className={classes.contentSection}>
					{renderContent(item)}
				</Box>
			))}
		</>
	);
};

const DashboardViz = ({
	title,
	mapImage,
	launchButtonText,
	dashboardDataJson,
	onLaunch,
}) => {
	const classes = useStyles();
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	const dashboardData = JSON.parse(dashboardDataJson);

	return (
		<Box className={classes.root}>
			<Typography variant="h4" component="h1" gutterBottom align="center">
				{title}
			</Typography>

			<Box className={classes.flexContainer}>
				{/* Left column */}
				<Box className={classes.column}>
					<Paper elevation={3} className={classes.mapContainer}>
						<img
							src={mapImage}
							alt="Conservation Practices Map"
							className={classes.mapImage}
						/>
					</Paper>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						className={classes.launchButton}
						onClick={onLaunch}
					>
						{launchButtonText}
					</Button>
				</Box>

				{/* Right column */}
				<Box className={classes.column}>
					<Tabs value={activeTab} onChange={handleTabChange}>
						{dashboardData.map((tab, index) => (
							<Tab key={index} label={tab.label} />
						))}
					</Tabs>

					<Box className={classes.tabContent}>
						<ContentRenderer
							content={dashboardData[activeTab].content}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default DashboardViz;
