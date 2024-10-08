// @flow
import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
	AppBar,
	Avatar,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	makeStyles,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

import LogoApp from "../../images/logo_app.png";

export const HEADERS_HEIGHT = 61;

const useStyles = makeStyles((theme) => {
	return {
		appbar: {
			zIndex: theme.zIndex.drawer + 1,
		},
		mainHeader: {
			background: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
			textDecoration: "none",
			height: HEADERS_HEIGHT,
			minHeight: HEADERS_HEIGHT,
			"& a": {
				margin: 5,
			},
		},
		headerText: {
			color: theme.palette.primary.contrastText,
			textDecoration: "none",
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
		menuIcon: {
			display: "block",
			marginLeft: "auto",
			marginRight: 0,
		},
	};
});

type Props = {
	location: {
		pathname: string,
	},
};

const SmallHeader = ({ location }: Props) => {
	const classes = useStyles();

	const [menuAnchorEL, setMenuAnchorEL] = React.useState(null);
	const menuOpen = Boolean(menuAnchorEL);
	const menuHandleClick = (event) => {
		setMenuAnchorEL(event.currentTarget);
	};
	const menuHandleClose = () => {
		setMenuAnchorEL(null);
	};

	const [dashboardAnchorEl, setDashboardAnchorEl] = React.useState(null);
	const dashboardOpen = Boolean(dashboardAnchorEl);
	const dashboardHandleClick = (event) => {
		setDashboardAnchorEl(event.currentTarget);
	};
	const dashboardHandleClose = () => {
		setDashboardAnchorEl(null);
		setMenuAnchorEL(null);
	};

	const [geoAppAnchorEl, setGeoAppAnchorEl] = React.useState(null);
	const geoAppOpen = Boolean(geoAppAnchorEl);
	const geoAppHandleClick = (event) => {
		setGeoAppAnchorEl(event.currentTarget);
	};
	const geoAppHandleClose = () => {
		setGeoAppAnchorEl(null);
		setMenuAnchorEL(null);
	};

	return (
		<AppBar position="fixed" className={classes.appbar}>
			<Toolbar className={classes.mainHeader}>
				<Avatar component={Link} to="/" src={LogoApp} />
				<Typography
					component={Link}
					to="/"
					className={classes.headerText}
					variant="h6"
					noWrap
				>
					Great Lakes to Gulf
				</Typography>
				<div className={classes.menuIcon}>
					<IconButton
						label="burger-menu"
						id="menu-dropdown"
						aria-controls={menuOpen ? "dropdown-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={menuOpen ? "true" : undefined}
						onClick={menuHandleClick}
					>
						<MenuIcon style={{ color: "white" }} />
					</IconButton>
					<Menu
						id="dashboard-menu"
						anchorEl={menuAnchorEL}
						open={menuOpen}
						onClose={menuHandleClose}
						MenuListProps={{
							"aria-labelledby": "burger-button",
						}}
						getContentAnchorEl={null}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						transformOrigin={{ horizontal: "center" }}
						className={classes.dropdown}
					>
						<MenuItem
							classes={{ root: classes.menuItem }}
							onClick={dashboardHandleClick}
						>
							{" "}
							<div
								style={{
									display: "flex",
									alignItems: "center",
									flexWrap: "wrap",
								}}
							>
								<ArrowLeftIcon />
								<span>Dashboards</span>
							</div>{" "}
						</MenuItem>
						<MenuItem
							classes={{ root: classes.menuItem }}
							onClick={menuHandleClose}
							component={Link}
							to="/explore/all"
						>
							Explore Data
						</MenuItem>
						<MenuItem
							classes={{ root: classes.menuItem }}
							onClick={(event) =>
								(window.location.href =
									"https://greatlakestogulf.web.illinois.edu")
							}
							component={Link}
							to="data-stories"
						>
							GLTG News
						</MenuItem>
					</Menu>
					<Menu
						id="dashboard-menu"
						anchorEl={dashboardAnchorEl}
						open={dashboardOpen}
						onClose={dashboardHandleClose}
						MenuListProps={{
							"aria-labelledby": "dashboard-button",
						}}
						getContentAnchorEl={null}
						anchorOrigin={{ vertical: 0, horizontal: -235 }}
						className={classes.dropdown}
					>
						<MenuItem
							classes={{ root: classes.menuItem }}
							onClick={dashboardHandleClose}
							component={Link}
							to="summary"
						>
							Nutrient Trends Dashboard
						</MenuItem>
						<MenuItem
							classes={{ root: classes.menuItem }}
							onClick={dashboardHandleClose}
							component={Link}
							to="/bmp"
						>
							Best Management Practices
						</MenuItem>
						<MenuItem
							classes={{ root: classes.menuItem }}
							onClick={dashboardHandleClose}
							component={Link}
							to="/nutrient-trends"
						>
							State Portals
						</MenuItem>
					</Menu>
					<Menu
						id="geoApp-menu"
						anchorEl={geoAppAnchorEl}
						open={geoAppOpen}
						onClose={geoAppHandleClose}
						MenuListProps={{
							"aria-labelledby": "geoApp-button",
						}}
						getContentAnchorEl={null}
						anchorOrigin={{ vertical: 0, horizontal: -100 }}
						className={classes.dropdown}
					>
						<MenuItem
							classes={{ root: classes.menuItem }}
							onClick={geoAppHandleClose}
							component={Link}
							to="/explore/all"
						>
							Explore
						</MenuItem>
						<MenuItem
							classes={{ root: classes.menuItem }}
							onClick={geoAppHandleClose}
							component={Link}
							to="/search"
						>
							Download
						</MenuItem>
						<MenuItem
							classes={{ root: classes.menuItem }}
							onClick={geoAppHandleClose}
							component={Link}
							to="/analysis"
						>
							Analysis
						</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default withRouter(SmallHeader);
