// @flow
import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	footer: {
		width: "100%",
		background: "#000000",
		color: "#BEC4C9",
		textDecoration: "none",
		textAlign: "center",
		fontSize: 13,
		flex: "0 0 auto",
	},
	sticky: {
		marginTop: "auto",
	},
	content: {
		color: "gray",
		width: "100%",
		margin: "10px auto 5px",
		lineHeight: 1.1,
	},
}));

type Props = {
	sticky: boolean,
};

const Footer = ({ sticky }: Props) => {
	const classes = useStyles();
	return (
		<footer className={`${classes.footer} ${sticky ? classes.sticky : ""}`}>
			<Grid container>
				<Grid item xs={12}>
					<Typography component="div" variant="body2" className={classes.content}>
						This website was developed by National Great Rivers, Lewis & Clark Community College, University
						of Illinois National Center for Supercomputing Applications and the University of Illinois at
						Urbana-Champaign.
						<br />
						&copy; 2024 National Center for Supercomputing Applications.
					</Typography>
				</Grid>
			</Grid>
		</footer>
	);
};

Footer.defaultProps = {
	sticky: false,
};

export default Footer;
