import React from 'react';
import {
    ListItem,
    ListItemText,
    Typography,
    CircularProgress,
    Box,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { ViewMode } from 'pages';
import { TitleWithDetails } from 'types/general';

export const TitleCard = ({
    title,
    mode,
}: {
    title: TitleWithDetails;
    mode: ViewMode;
}) => {
    const router = useRouter();

    const customStyles: React.CSSProperties =
        mode === 'grid'
            ? {
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
              }
            : {};

    return (
        <ListItem
            key={title.id}
            onClick={() => router.push(`/title/${title.imdb_id}`)}
            style={{
                height: '250px',
                ...customStyles,
            }}
        >
            <img height={'100%'} src={title.details?.poster} />
            {/* <Typography variant={'subtitle2'}>{title.title}</Typography> */}
            {mode === 'list' && (
                <Box padding={2}>
                    <ListItemText
                        primary={
                            <>
                                <Typography variant={'h5'}>{title.title}</Typography>
                                <Typography component={'span'} variant={'caption'}>
                                    {title.year}
                                </Typography>
                            </>
                        }
                        secondary={title.details?.overview}
                    />
                    <Box position={'relative'} display={'inline-flex'}>
                        <CircularProgress
                            variant={'determinate'}
                            value={(title.details?.vote_average || 0) * 10}
                        />
                        <Box
                            top={0}
                            left={0}
                            bottom={0}
                            right={0}
                            position={'absolute'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Typography
                                variant={'caption'}
                                component={'div'}
                                color={'textSecondary'}
                            >{`${((title.details?.vote_average || 0) * 10).toFixed(
                                0,
                            )}%`}</Typography>
                        </Box>
                    </Box>
                </Box>
            )}
        </ListItem>
    );
};
