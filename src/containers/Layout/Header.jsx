// @flow
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { AppBar, Avatar, Button, Menu, MenuItem, Tab, Tabs, Toolbar, Typography, makeStyles } from "@material-ui/core";

import LogoApp from "../../images/logo_app.png";

export const HEADERS_HEIGHT = 65;

const useStyles = makeStyles((theme) => ({
	appbar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	mainHeader: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		textDecoration: "none",
		height: HEADERS_HEIGHT,
		minHeight: HEADERS_HEIGHT,
	},
	headerText: {
		color: theme.palette.primary.contrastText,
		textDecoration: "none",
		marginBottom: 0,
		fontSize: "1.95rem",
	},
	tagline: {
		color: theme.palette.primary.contrastText,
		fontSize: "0.790rem",
		textAlign: "left",
	},
	contactText: {
		fontSize: "1rem",
		color: "#BEC4C9",
		textDecoration: "none",
	},
	headerButton: {
		fontSize: 16,
		flexGrow: 1,
	},
	tabsRoot: {
		marginLeft: "6em",
		fontSize: 16,
		flexGrow: 1,
	},
	menuItem: {
		"&:hover": {
			backgroundColor: theme.palette.primary.main,
			color: "white",
		},
	},
	tabsIndicator: {
		backgroundColor: "#fff",
	},
	tabRoot: {
		fontSize: "1rem",
	},
	dropdown: {
		zIndex: 1100,
	},
	dropdownIcon: {
		display: "flex",
	},
}));

type Props = {
	location: {
		pathname: string,
	},
};

const Header = ({ location }: Props) => {
	const classes = useStyles();

	const [dashboardAnchorEl, setDashboardAnchorEl] = React.useState(null);
	const dashboardOpen = Boolean(dashboardAnchorEl);
	const dashboardHandleClick = (event) => {
		setDashboardAnchorEl(event.currentTarget);
	};
	const dashboardHandleClose = () => {
		setDashboardAnchorEl(null);
	};

	const [geoAppAnchorEl, setGeoAppAnchorEl] = React.useState(null);
	const geoAppOpen = Boolean(geoAppAnchorEl);
	const geoAppHandleClick = (event) => {
		setGeoAppAnchorEl(event.currentTarget);
	};
	const geoAppHandleClose = () => {
		setGeoAppAnchorEl(null);
	};

	// State and handler for the State Portals submenu
	const [statePortalsAnchorEl, setStatePortalsAnchorEl] = React.useState(null);
	const statePortalsHandleClick = (event) => {
		setStatePortalsAnchorEl(event.currentTarget);
	};

	return (
		<AppBar position="fixed" className={classes.appbar}>
			<Toolbar className={classes.mainHeader}>
				<Avatar component={Link} to="/" src={LogoApp} style={{ width: "50px", height: "50px" }} />
				<div style={{ display: "flex", flexDirection: "column", marginLeft: "1em" }}>
					<Typography component={Link} to="/" className={classes.headerText} variant="h5" noWrap>
						Great Lakes to Gulf
					</Typography>
					<Typography className={classes.tagline} variant="h6" noWrap>
						Tracking nutrients in the Mississippi River Basin
					</Typography>
				</div>
				<Tabs
					classes={{
						root: classes.tabsRoot,
						indicator: classes.tabsIndicator,
					}}
				>
					<Tab
						className={classes.tabRoot}
						label="Nutrient Trends"
						component={Link}
						id="geoApp-button"
						to="/nutrient-trends"
					/>
					<Tab
						className={classes.tabRoot}
						label="State Efforts"
						component={Link}
						id="geoApp-button"
						to="/stateportal"
					/>
					<Tab
						className={classes.tabRoot}
						label="Explore Data"
						component={Link}
						id="geoApp-button"
						to="/explore/all"
					/>
				</Tabs>
				<Typography component="a" to="/" href="mailto:lkammin@lc.edu" className={classes.contactText} noWrap>
					CONTACT
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default withRouter(Header);
