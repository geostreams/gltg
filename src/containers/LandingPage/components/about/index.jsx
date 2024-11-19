import React from "react";
import { Box, Typography, Grid, useTheme, useMediaQuery, makeStyles } from "@material-ui/core";
import ReactPlayer from "react-player/youtube";
import bannerImage from "../../Images/gltg-banner.jpg";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	introDiv: {
		position: "relative",
		display: "flex",
		width: "100%",
		height: ({ isMobile }) => (isMobile ? "15em" : "20em"),
		marginTop: ({ isMobile }) => (isMobile ? theme.spacing(2) : theme.spacing(3)),
		backgroundImage: `url(${bannerImage})`,
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundColor: "#1a4984",
	},
	introTitle: {
		position: "absolute",
		left: "4%",
		bottom: "7%",
		color: theme.palette.common.white,
		textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
		fontWeight: "bold",
		zIndex: 1,
		maxWidth: "90%",
	},
	photoCredit: {
		position: "absolute",
		bottom: 0,
		right: 0,
		color: "#bec4c9",
		fontStyle: "italic",
		fontWeight: 400,
		fontSize: 10,
		lineHeight: "12px",
	},
	contentContainer: {
		padding: ({ isMobile }) => theme.spacing(isMobile ? 1 : 2),
	},
	leftColumn: {
		display: "flex",
		alignItems: "center",
		minHeight: "100%",
	},
	leftContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: ({ isMobile }) => theme.spacing(isMobile ? 1 : 1.5),
		textAlign: "center",
		maxWidth: ({ isMobile }) => (isMobile ? "100%" : "90%"),
		margin: "auto",
		padding: theme.spacing(1),
	},
	rightColumn: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: theme.spacing(1),
	},
	videoContainer: {
		display: "flex",
		flexDirection: "column",
		gap: ({ isMobile }) => theme.spacing(isMobile ? 1 : 2),
		width: "100%",
		maxWidth: 600,
		paddingLeft: theme.spacing(2),
	},
	playerWrapper: {
		width: "100%",
		marginBottom: theme.spacing(0.5),
		"& > div": {
			borderRadius: theme.shape.borderRadius,
			overflow: "hidden",
		},
	},
	responsiveText: {
		fontSize: ({ isMobile }) => (isMobile ? "0.9rem" : "1rem"),
		lineHeight: 1.5,
	},
}));

const About = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const classes = useStyles({ isMobile });

	return (
		<Box className={classes.root}>
			<Box className={classes.introDiv}>
				<Typography variant={isMobile ? "h5" : "h4"} className={classes.introTitle} gutterBottom>
					We all have a vested interest in healthy waterways.
				</Typography>
			</Box>

			<Box display="flex" justifyContent="center" width="100%">
				<Box className={classes.contentContainer}>
					<Grid container spacing={3} style={{ minHeight: "inherit" }}>
						<Grid item xs={12} md={8} className={classes.leftColumn}>
							<Box className={classes.leftContent}>
								<Typography variant={isMobile ? "h6" : "h5"} align="center" gutterBottom>
									Welcome to Great Lakes to Gulf: Tracking Nutrients in the Mississippi
								</Typography>
								<Typography
									variant="body1"
									align="center"
									style={{ fontWeight: 500 }}
									className={classes.responsiveText}
									gutterBottom
								>
									Great Lakes to Gulf (GLTG) is an interactive website that provides curated
									nutrient-focused water quality information about the Mississippi River and its
									tributaries. GLTG takes a massive amount of complex water quality data from across
									geographies and standardizes, distills, and presents it in a way that makes the
									information accessible and easy-to-understand for scientists, managers, advocates,
									and the interested public.
								</Typography>
								<Typography
									variant="body1"
									align="center"
									className={classes.responsiveText}
									gutterBottom
								>
									Importantly, GLTG shows nutrient levels and long term trends throughout the
									Mississippi/Atchafalaya River Basin (MARB), suggests relationships between these
									observed trends and conservation indicators, and serves as an information hub about
									state efforts to improve water quality.
								</Typography>
								<Typography
									variant="body1"
									align="center"
									className={classes.responsiveText}
									gutterBottom
								>
									Improving America's water quality is not just good for the environment—it's good for
									families, communities, and the economy.
								</Typography>
							</Box>
						</Grid>

						<Grid item xs={12} md={4} className={classes.rightColumn}>
							<Box className={classes.videoContainer}>
								<Box className={classes.playerWrapper}>
									<ReactPlayer
										url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
										width="70%"
										height={isMobile ? "200px" : "250px"}
									/>
								</Box>
								<Box className={classes.playerWrapper}>
									<ReactPlayer
										url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
										width="70%"
										height={isMobile ? "200px" : "250px"}
									/>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};

export default About;
