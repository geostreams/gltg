// @flow
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
	AppBar,
	Avatar,
	Collapse,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
	Tab,
	Toolbar,
	Typography,
	makeStyles,
	useMediaQuery,
	useTheme,
} from "@material-ui/core";
import { ArrowDropDown as ArrowDropDownIcon, ExpandLess, ExpandMore, Menu as MenuIcon } from "@material-ui/icons";

import LogoApp from "../../images/logo_app.png";

export const HEADERS_HEIGHT = 65;

const NEW_SITE_URL = process.env.NEW_SITE_URL || "https://gltg-apps-dev.ncsa.illinois.edu";

const useStyles = makeStyles((theme) => ({
	appbar: {
		zIndex: 1100,
	},
	mainHeader: {
		background: "#2D3C4A",
		color: "#ffffff",
		textDecoration: "none",
		height: HEADERS_HEIGHT,
		minHeight: HEADERS_HEIGHT,
		paddingRight: 0,
		display: "flex",
		justifyContent: "space-between",
	},
	logoContainer: {
		display: "flex",
		alignItems: "center",
	},
	avatar: {
		width: 36,
		height: 36,
		[theme.breakpoints.down("sm")]: {
			width: 28,
			height: 28,
		},
	},
	titleContainer: {
		display: "flex",
		flexDirection: "column",
		marginLeft: "1em",
	},
	headerText: {
		color: "#ffffff",
		textDecoration: "none",
		marginBottom: 0,
		lineHeight: 1.33,
		fontSize: "24px",
		letterSpacing: "0px",
		fontWeight: 600,
		[theme.breakpoints.down("sm")]: {
			fontSize: "22px",
		},
	},
	tagline: {
		color: "#ffffff",
		fontSize: "12px",
		textAlign: "left",
		lineHeight: 1.66,
		letterSpacing: "0.4px",
		fontWeight: 400,
		[theme.breakpoints.down("sm")]: {
			fontSize: "11px",
		},
	},
	desktopTabs: {
		display: "flex",
		marginLeft: "2em",
		flexGrow: 1,
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
	tabRoot: {
		fontSize: "14px",
		fontWeight: 700,
		color: "#ffffff",
		"&.Mui-selected": {
			color: "#ffffff",
		},
	},
	tabLabel: {
		display: "flex",
		alignItems: "center",
	},
	contactTab: {
		display: "flex",
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
	mobileMenuButton: {
		marginLeft: "auto",
		display: "none",
		color: "inherit",
		[theme.breakpoints.down("sm")]: {
			display: "flex",
		},
	},
	menuItem: {
		color: "#000000",
		"&:hover": {
			backgroundColor: "#2D3C4A",
			color: "white",
		},
	},
	drawer: {
		display: "block",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
		"& .MuiDrawer-paper": {
			backgroundColor: "#2D3C4A",
			color: "#ffffff",
			width: 250,
		},
	},
	drawerList: {
		width: 250,
	},
	expandedListItem: {
		paddingLeft: theme.spacing(4),
	},
	groupHeader: {
		fontWeight: "bold",
		color: "#ffffff",
	},
}));

const Header = ({ location }) => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// About Us dropdown state
	const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
	const aboutOpen = Boolean(aboutAnchorEl);
	const aboutHandleClick = (event) => {
		setAboutAnchorEl(event.currentTarget);
	};
	const aboutHandleClose = () => {
		setAboutAnchorEl(null);
	};

	// Dashboards dropdown state
	const [dashboardsAnchorEl, setDashboardsAnchorEl] = useState(null);
	const dashboardsOpen = Boolean(dashboardsAnchorEl);
	const dashboardsHandleClick = (event) => {
		setDashboardsAnchorEl(event.currentTarget);
	};
	const dashboardsHandleClose = () => {
		setDashboardsAnchorEl(null);
	};

	// Mobile drawer state
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [expandedGroups, setExpandedGroups] = useState(new Set());

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	const toggleGroup = (groupName) => {
		setExpandedGroups((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(groupName)) {
				newSet.delete(groupName);
			} else {
				newSet.add(groupName);
			}
			return newSet;
		});
	};

	const drawer = (
		<div className={classes.drawerList} role="presentation">
			<List>
				<ListItem button component={Link} to="/getting-started" onClick={handleDrawerToggle}>
					<ListItemText primary="Getting Started" />
				</ListItem>

				{/* About Us Section */}
				<ListItem button onClick={() => toggleGroup("about")}>
					<ListItemText
						primary="About Us"
						primaryTypographyProps={{
							className: classes.groupHeader,
						}}
					/>
					{expandedGroups.has("about") ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={expandedGroups.has("about")} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							component="a"
							href={`${NEW_SITE_URL}/our-story`}
							onClick={handleDrawerToggle}
							className={classes.expandedListItem}
						>
							<ListItemText primary="Our Story" />
						</ListItem>
						<ListItem
							button
							component="a"
							href={`${NEW_SITE_URL}/our-team`}
							onClick={handleDrawerToggle}
							className={classes.expandedListItem}
						>
							<ListItemText primary="Our Team" />
						</ListItem>
						<ListItem
							button
							component="a"
							href="mailto:lkammin@lc.edu"
							onClick={handleDrawerToggle}
							className={classes.expandedListItem}
						>
							<ListItemText primary="Contact Us" />
						</ListItem>
					</List>
				</Collapse>

				{/* Dashboards Section */}
				<ListItem button onClick={() => toggleGroup("dashboards")}>
					<ListItemText
						primary="Dashboards"
						primaryTypographyProps={{
							className: classes.groupHeader,
						}}
					/>
					{expandedGroups.has("dashboards") ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={expandedGroups.has("dashboards")} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							component={Link}
							to="/dashboards/nutrient-trends"
							onClick={handleDrawerToggle}
							className={classes.expandedListItem}
						>
							<ListItemText primary="Nutrient Trends" />
						</ListItem>
						<ListItem
							button
							component="a"
							href={`${NEW_SITE_URL}/dashboards/state-efforts`}
							onClick={handleDrawerToggle}
							className={classes.expandedListItem}
						>
							<ListItemText primary="State Efforts" />
						</ListItem>
						<ListItem
							button
							component={Link}
							to="/dashboards/explore/all"
							onClick={handleDrawerToggle}
							className={classes.expandedListItem}
						>
							<ListItemText primary="Explore Data" />
						</ListItem>
					</List>
				</Collapse>

				<ListItem button component="a" href={`${NEW_SITE_URL}/resources`} onClick={handleDrawerToggle}>
					<ListItemText primary="Resources" />
				</ListItem>
				<ListItem button component="a" href="mailto:lkammin@lc.edu" onClick={handleDrawerToggle}>
					<ListItemText primary="Contact" />
				</ListItem>
			</List>
		</div>
	);

	return (
		<AppBar position="fixed" className={classes.appbar}>
			<Toolbar className={classes.mainHeader}>
				<div className={classes.logoContainer}>
					<Avatar component="a" href={`${NEW_SITE_URL}/`} src={LogoApp} className={classes.avatar} />
					<div className={classes.titleContainer}>
						<Typography
							component="a"
							href={`${NEW_SITE_URL}/`}
							className={classes.headerText}
							variant="h5"
							noWrap
						>
							Great Lakes to Gulf
						</Typography>
						<Typography className={classes.tagline} variant="h6" noWrap>
							Tracking nutrients in the Mississippi River Basin
						</Typography>
					</div>
				</div>

				<div className={classes.desktopTabs}>
					<Tab
						className={classes.tabRoot}
						label={
							<div className={classes.tabLabel}>
								About Us <ArrowDropDownIcon />
							</div>
						}
						aria-controls={aboutOpen ? "about-us-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={aboutOpen ? "true" : undefined}
						onClick={aboutHandleClick}
					/>
					<Tab className={classes.tabRoot} label="Getting Started" component={Link} to="/getting-started" />
					<Tab
						className={classes.tabRoot}
						label={
							<div className={classes.tabLabel}>
								Dashboards <ArrowDropDownIcon />
							</div>
						}
						aria-controls={dashboardsOpen ? "dashboards-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={dashboardsOpen ? "true" : undefined}
						onClick={dashboardsHandleClick}
					/>
					<Tab
						className={classes.tabRoot}
						label="Resources"
						component="a"
						href={`${NEW_SITE_URL}/resources`}
					/>
				</div>

				<div className={classes.contactTab}>
					<Tab className={classes.tabRoot} label="Contact" component="a" href="mailto:lkammin@lc.edu" />
				</div>

				<IconButton className={classes.mobileMenuButton} onClick={handleDrawerToggle}>
					<MenuIcon />
				</IconButton>

				{/* About Us Menu */}
				<Menu
					id="about-us-menu"
					anchorEl={aboutAnchorEl}
					open={aboutOpen}
					onClose={aboutHandleClose}
					MenuListProps={{
						"aria-labelledby": "about-us-button",
					}}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					getContentAnchorEl={null}
					style={{ marginTop: "8px" }}
				>
					<MenuItem
						onClick={aboutHandleClose}
						component="a"
						href={`${NEW_SITE_URL}/our-story`}
						className={classes.menuItem}
					>
						Our Story
					</MenuItem>
					<MenuItem
						onClick={aboutHandleClose}
						component="a"
						href={`${NEW_SITE_URL}/our-team`}
						className={classes.menuItem}
					>
						Our Team
					</MenuItem>
					<MenuItem
						onClick={aboutHandleClose}
						component="a"
						href="mailto:lkammin@lc.edu"
						className={classes.menuItem}
					>
						Contact Us
					</MenuItem>
				</Menu>

				{/* Dashboards Menu */}
				<Menu
					id="dashboards-menu"
					anchorEl={dashboardsAnchorEl}
					open={dashboardsOpen}
					onClose={dashboardsHandleClose}
					MenuListProps={{
						"aria-labelledby": "dashboards-button",
					}}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					getContentAnchorEl={null}
					style={{ marginTop: "8px" }}
				>
					<MenuItem
						onClick={dashboardsHandleClose}
						component={Link}
						to="/dashboards/nutrient-trends"
						className={classes.menuItem}
					>
						Nutrient Trends
					</MenuItem>
					<MenuItem
						onClick={dashboardsHandleClose}
						component="a"
						href={`${NEW_SITE_URL}/dashboards/state-efforts`}
						className={classes.menuItem}
					>
						State Efforts
					</MenuItem>
					<MenuItem
						onClick={dashboardsHandleClose}
						component={Link}
						to="/dashboards/explore/all"
						className={classes.menuItem}
					>
						Explore Data
					</MenuItem>
				</Menu>
			</Toolbar>

			{/* Mobile Drawer */}
			<Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle} className={classes.drawer}>
				{drawer}
			</Drawer>
		</AppBar>
	);
};

export default withRouter(Header);
