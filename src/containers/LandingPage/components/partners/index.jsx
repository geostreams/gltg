import React from "react";
import { makeStyles, Typography, Box, Grid, Link, useTheme, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2),
	},
	gridContainer: {
		alignItems: "center",
	},
	partnerContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(2),
		height: "100%", // Ensures container takes full height of grid item
		transition: "transform 0.2s ease-in-out",

		"&:hover": {
			transform: "scale(1.05)",
		},
	},
	partnerImage: {
		maxWidth: "100%",
		height: "auto",
		objectFit: "contain",
	},
	title: {
		marginTop: "auto",
		marginBottom: "auto",
		textAlign: "center",
	},
	headerBox: {
		backgroundColor: "#f5f5f5",
		padding: "0.5em",
		marginBottom: "2em",
	},
}));

const Partners = ({ partner1, partner2, link1, link2, maxHeight1, maxHeight2 }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const classes = useStyles();

	// Default heights based on mobile/desktop
	const defaultHeight = isMobile ? "150px" : "190px";

	return (
		<div className={classes.root}>
			<Box className={classes.headerBox}>
				<Typography variant={isMobile ? "h5" : "h4"} className={classes.title}>
					Our Partners
				</Typography>
			</Box>
			<Grid container spacing={isMobile ? 2 : 4} className={classes.gridContainer}>
				<Grid item xs={12} sm={6}>
					<Link
						href={link1}
						target="_blank"
						rel="noopener noreferrer"
						style={{ display: "block", height: "100%" }}
					>
						<div className={classes.partnerContainer}>
							<img
								src={partner1}
								alt="Partner 1"
								className={classes.partnerImage}
								style={{ maxHeight: maxHeight1 || defaultHeight }}
							/>
						</div>
					</Link>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Link
						href={link2}
						target="_blank"
						rel="noopener noreferrer"
						style={{ display: "block", height: "100%" }}
					>
						<div className={classes.partnerContainer}>
							<img
								src={partner2}
								alt="Partner 2"
								className={classes.partnerImage}
								style={{ maxHeight: maxHeight2 || defaultHeight }}
							/>
						</div>
					</Link>
				</Grid>
			</Grid>
		</div>
	);
};

export default Partners;
