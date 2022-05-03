import React from 'react';
import { Button, Typography } from '@material-ui/core';
import useCheckout from 'hooks/use-checkout';

const Premium = () => {
    const { startCheckout } = useCheckout();

    return (
        <div>
            Want to Join Premium?
            <Button onClick={startCheckout}>Get Premium</Button>
        </div>
    );
};

export default Premium;
