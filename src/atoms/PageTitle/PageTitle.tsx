import React from 'react';
import clsx from 'clsx';
import useStyles from './styles';
import { Typography, Box } from '@material-ui/core';

const PageTitle = ({ label, error }: PageTitlePropTypes) => {
    const classes = useStyles();

    return (
        <Typography
            color={error ? 'error' : undefined}
            variant={'h3'}
            className={classes.root}
        >
            {label}
        </Typography>
    );
};

export type PageTitlePropTypes = {
    label: string;
    error?: boolean;
};

export default PageTitle;
