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
	Tab,
	Tabs,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import LogoApp from "../../images/logo_app.png";

export const HEADERS_HEIGHT = 61;

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
	},
	tagline: {
		color: theme.palette.primary.contrastText,
		fontSize: "0.875rem",
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
	menuIcon: {
		display: "block",
		marginLeft: "auto",
		marginRight: 0,
	},
}));

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
						id="menu"
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
							onClick={menuHandleClose}
							component={Link}
							to="nutrient-trends"
						>
							Nutrient Trends
						</MenuItem>
						<MenuItem
							classes={{ root: classes.menuItem }}
							onClick={menuHandleClose}
							component={Link}
							to="/state-portal"
						>
							State Efforts
						</MenuItem>
						<MenuItem
							classes={{ root: classes.menuItem }}
							onClick={menuHandleClose}
							component={Link}
							to="/explore/all"
						>
							Explore Data
						</MenuItem>
						{/* Contact us */}
						<MenuItem
							classes={{ root: classes.menuItem }}
							onClick={menuHandleClose}
							component="a"
							href="mailto:lkammin@lc.edu"
						>
							Contact Us
						</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default withRouter(SmallHeader);
