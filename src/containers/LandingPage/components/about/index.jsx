import React from "react";
import {
	Box,
	Button,
	Typography,
	Grid,
	useTheme,
	useMediaQuery,
} from "@material-ui/core";
import classes from "./index.css";
import ReactPlayer from "react-player/youtube";

const About = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			<div className={classes.introDiv}>
				<Typography
					variant={isMobile ? "h5" : "h4"}
					align="left"
					className={classes.introTitle}
					gutterBottom
				>
					We all have a vested interest in healthy waterways.
				</Typography>
			</div>

			<Box sx={{ padding: isMobile ? "1em" : "2em" }}>
				<Grid container spacing={3}>
					{/* Left Column */}
					<Grid item xs={12} md={6} className={classes.column}>
						<Box className={classes.leftContent}>
							<Typography
								variant={isMobile ? "h6" : "h5"}
								align="center"
								gutterBottom
							>
								Welcome to Great Lakes to Gulf: Tracking
								Nutrients in the Mississippi
							</Typography>
							<Typography
								variant="body1"
								align="center"
								gutterBottom
								className={classes.responsiveText}
							>
								Great Lakes to Gulf (GLTG) is an interactive
								website that provides curated nutrient-focused
								water quality information about the Mississippi
								River and its tributaries. GLTG takes a massive
								amount of complex water quality data from across
								geographies and standardizes, distills, and
								presents it in a way that makes the information
								accessible and easy-to-understand for
								scientists, managers, advocates, and the
								interested public.
							</Typography>
							<Typography
								variant="body1"
								align="center"
								gutterBottom
								className={classes.responsiveText}
							>
								Importantly, GLTG shows nutrient levels and long
								term trends throughout the
								Mississippi/Atchafalaya River Basin (MARB),
								suggests relationships between these observed
								trends and conservation indicators, and serves
								as an information hub about state efforts to
								improve water quality.
							</Typography>
							<Typography
								variant="body1"
								align="center"
								gutterBottom
								className={classes.responsiveText}
							>
								Improving America's water quality is not just
								good for the environment—it's good for families,
								communities, and the economy.
							</Typography>
						</Box>
					</Grid>

					{/* Right Column with Two Videos */}
					<Grid item xs={12} md={6} className={classes.rightColumn}>
						<div className={classes.videoContainer}>
							<div className={classes.playerWrapper}>
								<ReactPlayer
									url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
									width="100%"
									height={isMobile ? "200px" : "250px"}
									className={classes.reactPlayer}
								/>
							</div>
							<div className={classes.playerWrapper}>
								<ReactPlayer
									url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
									width="100%"
									height={isMobile ? "200px" : "250px"}
									className={classes.reactPlayer}
								/>
							</div>
						</div>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default About;
