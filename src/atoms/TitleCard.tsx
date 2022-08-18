import React from 'react';
import {
    ListItem,
    ListItemText,
    Typography,
    CircularProgress,
    Box,
    Grid,
    BoxProps,
    Theme,
    makeStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { ViewMode } from 'pages';
import { TitleWithDetails } from 'types/general';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: `${theme.palette.primary.light}A5`,
            color: 'white',
            '& svg': {
                color: theme.palette.secondary.light,
            },
        },
    },
}));

export const TitleCard = ({
    title,
    mode,
}: {
    title: TitleWithDetails;
    mode: ViewMode;
}) => {
    const router = useRouter();
    const classes = useStyles();

    const gridMode = mode === 'grid';

    const customStyles: BoxProps = gridMode
        ? {
              flexDirection: 'column',
          }
        : {
              flexDirection: 'row',
              height: '250px',
          };

    return (
        <Grid
            item
            key={title.id}
            onClick={() => router.push(`/title/${title.imdb_id}`)}
            xs={gridMode ? 4 : 12}
            className={classes.root}
        >
            <Box display={'flex'} {...customStyles}>
                <img
                    {...{ [gridMode ? 'width' : 'height']: '100%' }}
                    src={title.details?.poster}
                />
                {!gridMode ? (
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
                            secondary={
                                title.details?.overview &&
                                title.details?.overview.length > 325
                                    ? title.details?.overview.substring(0, 324) + '...'
                                    : title.details?.overview
                            }
                        />
                        <Box marginTop={2} position={'relative'} display={'inline-flex'}>
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
                ) : (
                    <Typography variant={'subtitle2'}>{title.title}</Typography>
                )}
            </Box>
        </Grid>
    );
};
