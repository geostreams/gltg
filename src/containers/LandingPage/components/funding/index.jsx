import React from "react";
import { Typography, Box, useTheme, useMediaQuery } from "@material-ui/core";
import classes from "./index.css";

const Funding = ({ image1, link1 }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			<div className={classes.textDiv}>
				<Box className={classes.headerBox}>
					<Typography
						variant={isMobile ? "h5" : "h4"}
						component="h1"
						align="center"
						className={classes.title}
					>
						Funding
					</Typography>
				</Box>

				<div className={classes.row}>
					<div className={classes.column} style={{ backgroundColor: "white" }} />
					<div
						className={classes.column}
						style={{
							background: `url(${image1})`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "contain",
							backgroundPosition: "center",
							cursor: "pointer",
						}}
						onClick={() => window.open(link1)}
						role="button"
						aria-label="Open funding link"
					/>
					<div className={classes.column} />
				</div>

				<Box mt={2} mb={4}>
					<Typography
						variant="body1"
						align="center"
						className={classes.textSubTitle}
						style={{ margin: "0 auto" }}
					>
						The Great Lakes to Gulf is a cyber-infrastructure framework constructed in collaboration with
						the National Center for Supercomputing Applications (NCSA) and the National Great Rivers
						Research and Education Center (NGRREC) with funding provided by NGRREC and the Walton Family
						Foundation.
					</Typography>
				</Box>
			</div>
		</>
	);
};

export default Funding;
