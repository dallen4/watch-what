import React from 'react';
import clsx from 'clsx';
import useStyles from './styles';
import BaseLink from 'atoms/BaseLink';
import Image from 'next/image';

const BrandLogo = (props: BrandLogoPropTypes) => {
    const classes = useStyles();

    return (
        <BaseLink href={'/'}>
            Watch What?
        </BaseLink>
    );
};

export type BrandLogoPropTypes = {};

export default BrandLogo;
