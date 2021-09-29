// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

const useStyle = makeStyles((theme) => ({
    header: {
        height: '50px',
        background: '#283D4B',
        opacity: 0.9,
        color: theme.palette.primary.contrastText,
        textDecoration: 'none'
    },
    toolbar: {
        justifyContent: 'space-between'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
}));

const Header = () => {
    const classes = useStyle();

    const [isHelpOpen, updateHelpOpen] = React.useState(false);

    return (
        <AppBar className={classes.header} position="relative">
            <Toolbar className={classes.toolbar} variant="dense">
                <Typography variant="h6" noWrap>Best Management Practices</Typography>
                <Typography
                    variant="button"
                    component={Button}
                    color="inherit"
                    onClick={() => updateHelpOpen(true)}
                >
                    About BMP
                </Typography>
                <Dialog open={isHelpOpen}>
                    <DialogTitle disableTypography onClose={() => updateHelpOpen(false)}>
                        <Typography variant="h6">About BMP</Typography>
                        <IconButton className={classes.closeButton} onClick={() => updateHelpOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography variant="body1" gutterBottom>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nunc lacus, venenatis ac
                            fringilla non, ultricies condimentum risus. Curabitur ante arcu, porttitor non erat ut,
                            blandit commodo orci. Aliquam ullamcorper consequat erat, quis semper diam maximus sed.
                            Vestibulum id nulla at justo sagittis sagittis. Suspendisse at convallis lectus,
                            dapibus porta mi. Aliquam a diam vulputate, gravida tortor nec, bibendum lacus.
                            Curabitur augue libero, tempor sit amet finibus at, sollicitudin in magna. Maecenas urna
                            quam, venenatis vitae ligula eleifend, elementum hendrerit eros. Nulla sagittis auctor enim.
                            Praesent nec quam blandit, euismod ante a, sollicitudin risus. Donec auctor augue ut
                            efficitur elementum.
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            Aenean tincidunt metus et nisi sagittis egestas. Pellentesque habitant morbi tristique
                            senectus et netus et malesuada fames ac turpis egestas. Morbi porttitor erat at felis
                            pulvinar tempor. Etiam commodo ipsum justo, tincidunt iaculis velit mollis ac.
                            Vestibulum augue arcu, varius in sapien a, pretium semper lacus. Donec semper,
                            nibh at gravida tincidunt, nisl urna euismod orci, vel cursus lectus leo ac turpis.
                            Quisque venenatis sed mi vel ultrices. Proin non neque hendrerit, posuere sem ac,
                            hendrerit odio. Sed porta, odio eget gravida fringilla, tortor nulla mattis eros,
                            vitae venenatis nibh metus eget metus. Nam ante tortor, cursus eu nunc ut, tincidunt
                            malesuada odio. Etiam at lacinia dolor. Ut turpis metus, congue id arcu non, pharetra
                            ultrices arcu.
                        </Typography>
                    </DialogContent>
                </Dialog>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
