import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@material-ui/core';
import { getCheckoutStatus } from '@lib/client';

const PremiumResult = () => {
    const router = useRouter();

    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        if (router.query.session_id)
            getCheckoutStatus(router.query.session_id as string)
                .then((status) => {
                    setStatus(status);
                })
                .catch((err) => {
                    console.error(err);
                    setStatus('error');
                });
    }, [router.query.session_id]);

    return (
        <div>
            Welcome to Premium!
            <Typography>Payment {status?.toUpperCase()}!</Typography>
        </div>
    );
};

export default PremiumResult;
