// @flow
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    AppBar,
    Avatar,
    ClickAwayListener,
    MenuItem,
    Paper,
    Popper,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    makeStyles
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
        tabsRoot: {
            fontSize: 16,
            flexGrow: 1
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

    const geostreamingMenuEl = React.useRef(null);
    const [geostreamingMenuOpen, updateGeostreamingMenuOpen] = React.useState(false);

    const activeTab = location.pathname.split('/')[1];

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
                    centered
                    value={activeTab.search(/^(explore|search|analysis)/) === 0 ? 'geostreaming' : activeTab}
                >
                    <Tab
                        className={classes.tabRoot}
                        label="Home"
                        component={Link}
                        to="/"
                        value=""
                    />
                    <Tab
                        className={classes.tabRoot}
                        label="About"
                        component={Link}
                        to="/about"
                        value="about"
                    >
                        About
                    </Tab>
                    <Tab
                        className={classes.tabRoot}
                        label="How to Use This Site"
                        component={Link}
                        to="/help"
                        value="help"
                    >
                        How to Use This Site
                    </Tab>
                    <Tab
                        ref={geostreamingMenuEl}
                        component="a"
                        className={classes.tabRoot}
                        label={
                            <span className={classes.dropdownIcon}>
                                Dashboard <ArrowDropDownIcon />
                            </span>
                        }
                        value="dashboard"
                        onClick={() => updateGeostreamingMenuOpen(true)}
                    />
                    <Popper
                        className={classes.dropdown}
                        anchorEl={geostreamingMenuEl.current}
                        open={geostreamingMenuOpen}
                    >
                        <ClickAwayListener
                            onClickAway={() => updateGeostreamingMenuOpen(false)}
                        >
                            <Paper>
                                <MenuItem
                                    component={Link}
                                    to="/explore/all"
                                >
                                    Explore
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/search"
                                >
                                    Download
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/analysis"
                                >
                                    Analysis
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/bmp"
                                >
                                    Best Management Practices
                                </MenuItem>
                            </Paper>
                        </ClickAwayListener>
                    </Popper>
                    <Tab
                        className={classes.tabRoot}
                        label="(Data Stories)"
                        component={Link}
                        to="/data-stories"
                        value="data-stories"
                    />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
};

export default withRouter(Header);
