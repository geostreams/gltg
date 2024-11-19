import React from "react";
import { makeStyles, Typography, Box, Grid, Link, useTheme, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2),
	},
	partnerContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(2),
		transition: "transform 0.2s ease-in-out",

		"&:hover": {
			transform: "scale(1.05)",
		},
	},
	partnerImage: {
		maxWidth: "100%",
		height: "auto",
		maxHeight: ({ isMobile }) => (isMobile ? "100px" : "150px"),
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

const Partners = ({ partner1, partner2, link1, link2 }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const classes = useStyles({ isMobile });

	return (
		<div className={classes.root}>
			<Box className={classes.headerBox}>
				<Typography variant={isMobile ? "h5" : "h4"} className={classes.title}>
					Our Partners
				</Typography>
			</Box>
			<Grid container spacing={isMobile ? 2 : 4}>
				<Grid item xs={12} sm={6}>
					<Link href={link1} target="_blank" rel="noopener noreferrer">
						<div className={classes.partnerContainer}>
							<img src={partner1} alt="Partner 1" className={classes.partnerImage} />
						</div>
					</Link>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Link href={link2} target="_blank" rel="noopener noreferrer">
						<div className={classes.partnerContainer}>
							<img src={partner2} alt="Partner 2" className={classes.partnerImage} />
						</div>
					</Link>
				</Grid>
			</Grid>
		</div>
	);
};

export default Partners;
