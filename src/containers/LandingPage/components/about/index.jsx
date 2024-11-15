import React from "react";
import { Box, Button, Typography, Grid } from "@material-ui/core";
import classes from "./index.css";
import ReactPlayer from "react-player/youtube";

const About = () => (
	<>
		<div className={classes.introDiv}>
			<Typography
				variant="h4"
				align="left"
				className={classes.introTitle}
				gutterBottom
			>
				We all have a vested interest in healthy waterways.
			</Typography>
		</div>

		<Box sx={{ padding: "2em" }}>
			<Grid container spacing={3}>
				{/* Left Column */}
				<Grid item xs={12} md={6} className={classes.column}>
					<Box m="auto" className={classes.leftContent}>
						<Typography variant="h5" align="center" gutterBottom>
							Welcome to Great Lakes to Gulf: Tracking Nutrients
							in the Mississippi
						</Typography>
						<Typography variant="body1" align="center" gutterBottom>
							Great Lakes to Gulf (GLTG) is an interactive website
							that provides curated nutrient-focused water quality
							information about the Mississippi River and its
							tributaries. GLTG takes a massive amount of complex
							water quality data from across geographies and
							standardizes, distills, and presents it in a way
							that makes the information accessible and
							easy-to-understand for scientists, managers,
							advocates, and the interested public.
						</Typography>
						<Typography variant="body1" align="center" gutterBottom>
							Importantly, GLTG shows nutrient levels and long
							term trends throughout the Mississippi/Atchafalaya
							River Basin (MARB), suggests relationships between
							these observed trends and conservation indicators,
							and serves as an information hub about state efforts
							to improve water quality. This information can help
							track the effectiveness of nutrient reduction
							efforts at federal, state, and local levels and
							inform future nutrient loss reduction work.
						</Typography>
						<Typography variant="body1" align="center" gutterBottom>
							Improving America’s water quality is not just good
							for the environment—it’s good for families,
							communities, and the economy. From farmers to
							scientists and policymakers to environmental
							advocates, we welcome everyone to join us in
							charting a healthy course forward for the
							Mississippi.
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
								height="250px"
								className={classes.reactPlayer}
							/>
						</div>
						<div className={classes.playerWrapper}>
							<ReactPlayer
								url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
								width="100%"
								height="250px"
								className={classes.reactPlayer}
							/>
						</div>
					</div>
				</Grid>
			</Grid>
		</Box>
	</>
);

export default About;
