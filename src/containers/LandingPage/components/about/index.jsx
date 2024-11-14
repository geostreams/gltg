import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import classes from "./index.css";

const About = () => (
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
);

export default About;
