import React from 'react';
import clsx from 'clsx';
import useStyles from './styles';
import BaseLink from 'atoms/BaseLink';
import Image from 'next/image';
import { Typography } from '@material-ui/core';

const BrandLogo = (props: BrandLogoPropTypes) => {
    const classes = useStyles();

    return (
        <BaseLink href={'/'}>
            <Typography variant={'h4'}>
            Watch What?
            </Typography>
        </BaseLink>
    );
};

export type BrandLogoPropTypes = {};

export default BrandLogo;
