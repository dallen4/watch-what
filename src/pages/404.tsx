import React from 'react';
import { Box, Typography, useTheme } from '@material-ui/core';
import BaseLink from 'atoms/BaseLink';
import { ROUTES } from '@config/Nav';

export default function Error(props: any) {
    return (
        <Box
            width={'100%'}
            maxWidth={'750px'}
            flexGrow={1}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Typography variant={'h5'}>Page Not Found</Typography>
            <BaseLink href={ROUTES.HOME.path}>
                <Typography>Back to Home</Typography>
            </BaseLink>
        </Box>
    );
}
