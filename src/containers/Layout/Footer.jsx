// @flow
import React from 'react';
import {
    Divider,
    Grid,
    makeStyles
} from '@material-ui/core';


const useStyles = makeStyles((theme) => {
    return ({
        footer: {
            'width': '100%',
            'background': theme.palette.primary.lighter,
            'color': theme.palette.primary.contrastText,
            'textDecoration': 'none',
            'textAlign': 'center',
            'padding': '10px 180px',
            'marginTop': '20px',
            '& a': {
                margin: 15
            },
            'fontSize': 13
        },
        sticky: {
            position: 'absolute',
            height: 110,
            bottom: -110,
            left: 0,
            marginTop: 0
        },
        content: {
            color: 'gray',
            width: '75%',
            margin: '10px auto 5px',
            lineHeight: 1.1
        }
    });
});

type Props = {
    sticky: boolean;
}

const Footer = ({ sticky }: Props) => {
    const classes = useStyles();

    return (
        <footer className={`${classes.footer} ${sticky ? classes.sticky : ''}`}>
            <Grid container>
                <Grid item xs={12}>
                    <p className={classes.content}>
                        This website was developed by NGRREC, Lewis & Clark Community College,
                        University of Illinois National Center for Supercomputing Applications and
                        the University of Illinois at Urbana-Champaign.
                        <br />
                        &copy; 2014 National Center for Supercomputing Applications.
                    </p>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <a
                        href="https://geodashboard.ncsa.illinois.edu/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Geodashboard v.{process.env.VERSION}
                    </a>
                </Grid>
            </Grid>
        </footer>
    );
};


Footer.defaultProps = {
    sticky: false
};

export default Footer;
