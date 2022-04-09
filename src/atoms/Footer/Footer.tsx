import React from 'react';
import clsx from 'clsx';
import { Box, IconButton, Typography } from '@material-ui/core';
import { Instagram } from 'react-feather';
import useStyles from './styles';

const Footer = (props: FooterPropTypes) => {
    const classes = useStyles();

    const year = new Date().getFullYear();

    return (
        <footer className={classes.root}>
            <Typography variant={'caption'}>
                Copyright &copy; Nieky Allen {year}.
            </Typography>
        </footer>
    );
};

export type FooterPropTypes = {};

export default Footer;
