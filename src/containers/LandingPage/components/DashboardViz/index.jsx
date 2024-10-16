import React, { useState } from "react";
import {
	Typography,
	Tabs,
	Tab,
	Button,
	Paper,
	Grid,
	List,
	ListItem,
	ListItemText,
	makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "600px",
		display: "flex",
		flexDirection: "column",
	},
	topBar: {
		backgroundColor: theme.palette.grey[100],
		padding: theme.spacing(2),
	},
	content: {
		flex: 1,
		padding: theme.spacing(3),
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
	},
	gridContainer: {
		flex: 1,
		overflow: "hidden",
	},
	column: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	leftColumn: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	mapContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: theme.spacing(2),
		overflow: "hidden",
	},
	mapImage: {
		maxWidth: "100%",
		maxHeight: "100%",
		objectFit: "contain",
	},
	launchButton: {
		maxWidth: "70%",
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
	numberedListItem: {
		display: "list-item",
		listStyleType: "decimal",
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
			case "numberedList":
				return (
					<List>
						{item.items.map((listItem, index) => (
							<ListItem
								key={index}
								className={classes.numberedListItem}
							>
								<ListItemText primary={listItem} />
							</ListItem>
						))}
					</List>
				);
			default:
				return null;
		}
	};

	return (
		<>
			{content.map((item, index) => (
				<div key={index} className={classes.contentSection}>
					{renderContent(item)}
				</div>
			))}
		</>
	);
};

const ImageComponent = ({ src, alt }) => {
	const classes = useStyles();

	return (
		<Paper elevation={3} className={classes.mapContainer}>
			<img src={src} alt={alt} className={classes.mapImage} />
		</Paper>
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
		<div className={classes.root}>
			<div className={classes.topBar}>
				<Typography variant="h4" component="h1" align="center">
					{title}
				</Typography>
			</div>

			<Grid container spacing={3} className={classes.gridContainer}>
				{/* Left column */}
				<Grid item xs={12} md={6} className={classes.leftColumn}>
					<ImageComponent src={mapImage} />
					<Button
						variant="contained"
						color="primary"
						className={classes.launchButton}
						onClick={onLaunch}
					>
						{launchButtonText}
					</Button>
				</Grid>

				{/* Right column */}
				<Grid item xs={12} md={6} className={classes.column}>
					{dashboardData.length > 1 && (
						<Tabs value={activeTab} onChange={handleTabChange}>
							{dashboardData.map((tab, index) => (
								<Tab key={index} label={tab.label} />
							))}
						</Tabs>
					)}

					<div className={classes.tabContent}>
						<ContentRenderer
							content={dashboardData[activeTab].content}
						/>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default DashboardViz;
