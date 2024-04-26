// @flow
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    AppBar,
    Avatar,
    Button,
    Menu,
    MenuItem,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    makeStyles
} from '@material-ui/core';

import LogoApp from '../../images/logo_app.png';

export const HEADERS_HEIGHT = 61;

const useStyles = makeStyles((theme) =>{
    return ({
        appbar: {
            zIndex: theme.zIndex.drawer + 1
        },
        mainHeader: {
            'background': theme.palette.primary.main,
            'color': theme.palette.primary.contrastText,
            'textDecoration': 'none',
            'height': HEADERS_HEIGHT,
            'minHeight': HEADERS_HEIGHT,
            '& a': {
                margin: 5
            }
        },
        headerText: {
            color: theme.palette.primary.contrastText,
            textDecoration: 'none'
        },
        contactText:{
            fontSize: '1rem',
            color: '#BEC4C9',
            textDecoration: 'none'
        },
        headerButton:{
            fontSize: 16,
            flexGrow: 1
        },
        tabsRoot: {
            marginLeft: '6em',
            fontSize: 16,
            flexGrow: 1
        },
        menuItem: {
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: 'white'
            }
        },
        tabsIndicator: {
            backgroundColor: '#fff'
        },
        tabRoot: {
            fontSize: '1rem'
        },
        dropdown: {
            zIndex: 1100
        },
        dropdownIcon: {
            display: 'flex'
        }
    });
});

type Props = {
    location: {
        pathname: string
    }
}

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

    return (
        <AppBar position="fixed" className={classes.appbar}>
            <Toolbar className={classes.mainHeader}>
                <Avatar
                    component={Link}
                    to="/"
                    src={LogoApp}
                />
                <Typography
                    component={Link}
                    to="/"
                    className={classes.headerText}
                    variant="h6"
                    noWrap
                >
                    Great Lakes to Gulf
                </Typography>
                <Tabs
                    classes={{
                        root: classes.tabsRoot,
                        indicator: classes.tabsIndicator
                    }}
                >
                    <Tab
                        className={classes.tabRoot}
                        label="Dashboards"
                        component={Button}
                        id = "dashboard-button"
                        aria-controls={dashboardOpen ? 'dashboard-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={dashboardOpen ? 'true' : undefined}
                        onClick={dashboardHandleClick}
                        classes={classes.headerButton}
                    />
                    <Menu
                        id="dashboard-menu"
                        anchorEl={dashboardAnchorEl}
                        open={dashboardOpen}
                        onClose={dashboardHandleClose}
                        MenuListProps={{
                            'aria-labelledby': 'dashboard-button'
                        }}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ horizontal: 'center' }}
                        className={classes.dropdown}>
                        <MenuItem classes={{ root: classes.menuItem }}
                                  onClick={dashboardHandleClose}
                                  component={Link}
                                  to="/summary">
                            Trends Dashboard
                        </MenuItem>
                        <MenuItem
                            classes={{ root: classes.menuItem }}
                            onClick={dashboardHandleClose}
                            component={Link}
                            to="/bmp">
                            Best Management Practices
                        </MenuItem>
                    </Menu>
                    <Tab
                        className={classes.tabRoot}
                        label="Explore Data"
                        component={Link}
                        id="geoApp-button"
                        to="/explore/all"
                    />
                    <Tab
                        className={classes.tabRoot}
                        label="GLTG News"
                        component={Link}
                        to="/"
                        onClick={event => window.location.href='https://greatlakestogulf.web.illinois.edu'}
                        value="gltg news"
                    />
                </Tabs>
                <Typography
                    component='a'
                    to="/"
                    href='mailto:gltg-support@lists.illinois.edu'
                    className={classes.contactText}
                    noWrap
                >
                    CONTACT
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default withRouter(Header);
