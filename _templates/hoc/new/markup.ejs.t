---
to: hocs/<%=name%>/<%=name%>.tsx
---
import React from 'react';
import { NextComponentType, NextPageContext } from 'next';
import clsx from 'clsx';
import useStyles from './styles';

const <%= name %> = (
    Component: NextComponentType<NextPageContext, any, any>
) => (props: any) => {
    const classes = useStyles();

    return <Component {...props} />;
};

export default <%= name %>;
