import React from "react";
import {
	Typography,
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
		minHeight: "600px",
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
	},
	gridContainer: {
		flex: 1,
	},
	column: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	leftColumn: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: theme.spacing(2),
	},
	mapContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "80%",
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

const HomeInfoSection = ({
	title,
	mapImage,
	launchButtonText,
	infoJSON,
	buttonLink,
}) => {
	const classes = useStyles();
	const infoData = JSON.parse(infoJSON);

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
						href={buttonLink}
					>
						{launchButtonText}
					</Button>
				</Grid>

				{/* Right column */}
				<Grid item xs={12} md={6} className={classes.column}>
					<div className={classes.tabContent}>
						<ContentRenderer content={infoData.content} />
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default HomeInfoSection;
