import React from "react";
import {
	Typography,
	Box,
	Button,
	Paper,
	Grid,
	List,
	ListItem,
	ListItemText,
	makeStyles,
	useTheme,
	useMediaQuery,
} from "@material-ui/core";
import ReactPlayer from "react-player/youtube";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		minHeight: ({ isMobile }) => (isMobile ? "auto" : "600px"),
		display: "flex",
		flexDirection: "column",
		paddingBottom: theme.spacing(2),
	},
	topBar: {
		backgroundColor: theme.palette.grey[100],
		padding: ({ isMobile }) => (isMobile ? theme.spacing(1) : theme.spacing(2)),
		marginBottom: theme.spacing(0.75),
	},
	content: {
		flex: 1,
		padding: ({ isMobile }) => (isMobile ? theme.spacing(2) : theme.spacing(3)),
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
		alignItems: "center",
		justifyContent: "center",
		marginTop: ({ isMobile }) => (isMobile ? theme.spacing(2) : "auto"),
		marginBottom: ({ isMobile }) => (isMobile ? theme.spacing(2) : "auto"),
	},
	leftColumn: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: theme.spacing(2),
		padding: ({ isMobile }) => (isMobile ? theme.spacing(1) : theme.spacing(2)),
	},
	imageContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: 0,
		maxWidth: ({ isMobile }) => (isMobile ? "100%" : "70%"),
		margin: ({ isMobile }) => (isMobile ? theme.spacing(2, 0) : 0),
	},
	infoImage: {
		height: "100%",
		width: "100%",
		objectFit: "contain",
		borderRadius: theme.shape.borderRadius,
	},
	launchButton: {
		maxWidth: ({ isMobile }) => (isMobile ? "100%" : "70%"),
		margin: theme.spacing(2, 0),
	},
	textContent: {
		padding: ({ isMobile }) => (isMobile ? theme.spacing(1) : theme.spacing(2)),
	},
	contentSection: {
		marginBottom: theme.spacing(1),
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	list: {
		padding: 0,
	},
	listItem: {
		display: "list-item",
		listStyleType: "disc",
		marginLeft: theme.spacing(2),
		padding: theme.spacing(0.5, 1),
	},
	numberedListItem: {
		display: "list-item",
		listStyleType: "decimal",
		marginLeft: theme.spacing(2),
		padding: theme.spacing(0.5, 1),
		[theme.breakpoints.down("sm")]: {
			fontSize: "0.9rem",
		},
	},
	caption: {
		textAlign: "center",
		padding: theme.spacing(0, 2),
		[theme.breakpoints.down("sm")]: {
			fontSize: "0.8rem",
		},
	},
}));

const ContentRenderer = ({ content, isMobile }) => {
	const classes = useStyles({ isMobile });

	const renderContent = (item) => {
		switch (item.type) {
			case "paragraph":
				if (item.content) {
					return (
						<Typography
							component="div"
							style={{
								fontSize: isMobile ? "0.9rem" : "1rem",
								lineHeight: isMobile ? 1.5 : 1.6,
								marginBottom: "1em",
							}}
						>
							{item.content.map((segment, index) =>
								segment.link ? (
									<a
										key={index}
										href={segment.link}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											color: "#1976d2",
											textDecoration: "none",
											"&:hover": {
												textDecoration: "underline",
											},
										}}
									>
										{segment.text}
									</a>
								) : (
									<span key={index}>{segment.text}</span>
								),
							)}
						</Typography>
					);
				}
				return (
					<Typography
						paragraph
						style={{
							fontSize: isMobile ? "0.9rem" : "1rem",
							lineHeight: isMobile ? 1.5 : 1.6,
						}}
					>
						{item.text}
					</Typography>
				);
			case "heading":
				return (
					<Typography variant={isMobile ? "subtitle1" : "h5"} gutterBottom>
						{item.text}
					</Typography>
				);
			case "list":
				return (
					<List className={classes.list}>
						{item.items.map((listItem, index) => (
							<ListItem key={index} className={classes.listItem}>
								<ListItemText
									primary={listItem}
									primaryTypographyProps={{
										style: {
											fontSize: isMobile ? "0.9rem" : "1rem",
											margin: 0,
										},
									}}
								/>
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

const ImageComponent = ({ src, alt, isMobile }) => {
	const classes = useStyles({ isMobile });

	return (
		<Paper elevation={3} className={classes.imageContainer}>
			<img src={src} alt={alt} className={classes.infoImage} />
		</Paper>
	);
};

const HomeInfoSection = ({ title, infoImage, imageCaption, launchButtonText, infoJSON, buttonLink, youtubeLink }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const classes = useStyles({ isMobile });
	const infoData = JSON.parse(infoJSON);

	return (
		<div className={classes.root}>
			<div className={classes.topBar}>
				<Typography variant={isMobile ? "h5" : "h4"} component="h1" align="center">
					{title}
				</Typography>
			</div>

			<Grid container spacing={isMobile ? 2 : 3} className={classes.gridContainer}>
				<Grid item xs={12} md={6} className={classes.leftColumn}>
					<ImageComponent src={infoImage} alt={title} isMobile={isMobile} />
					<Box className={classes.caption}>
						<Typography variant="caption" gutterBottom>
							{imageCaption}
						</Typography>
					</Box>
				</Grid>

				<Grid item xs={12} md={6} className={classes.column}>
					<div className={classes.textContent}>
						<ContentRenderer content={infoData.content} isMobile={isMobile} />
					</div>
					{youtubeLink && (
						<ReactPlayer url={youtubeLink} controls width="50%" height={isMobile ? "200px" : "300px"} />
					)}
					<Button
						variant="contained"
						color="primary"
						className={classes.launchButton}
						href={buttonLink}
						size={isMobile ? "medium" : "large"}
						fullWidth={isMobile}
					>
						{launchButtonText}
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default HomeInfoSection;
