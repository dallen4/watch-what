import React, { useState } from 'react';
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import useStyles from 'theme/styles';
import { Sources } from '@config/Sources';
import { SortBy } from 'types/general';
import { Genres } from '@config/Genres';

export default function Home() {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const [sources, setSources] = useState<number[]>([]);
    const [genres, setGenres] = useState<number[]>([]);
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.RelevanceDesc);

    const onSourceToggle = (source: number) => {
        const sourceIndex = sources.indexOf(source);

        if (sourceIndex === -1) setSources([...sources, source]);
        else setSources(sources.filter((s) => s !== source));
    };

    const onGenreToggle = (genre: number) => {
        const genreIndex = genres.indexOf(genre);

        if (genreIndex === -1) setGenres([...genres, genre]);
        else setGenres(genres.filter((g) => g !== genre));
    };

    return (
        <Box
            width={'100%'}
            padding={3}
            maxWidth={'750px'}
            flexGrow={1}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'flex-start'}
            alignItems={'center'}
        >
            <style jsx>{`
                svg {
                    stroke-width: 1;
                }
            `}</style>
            <Box
                width={'100%'}
                display={'flex'}
                flexDirection={isMobile ? 'column' : 'row'}
                justifyContent={'flex-start'}
                alignItems={'flex-start'}
                paddingBottom={2}
            >
                <FormControl component="fieldset">
                    <FormLabel component="legend">Platforms</FormLabel>
                    <FormGroup className={classes.filterList}>
                        {Sources.map((source) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={sources.includes(source.id)}
                                        onChange={() => onSourceToggle(source.id)}
                                        name={source.name}
                                    />
                                }
                                label={source.name}
                            />
                        ))}
                    </FormGroup>
                    <FormHelperText>Choose streaming platforms</FormHelperText>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Genres</FormLabel>
                    <FormGroup className={classes.filterList}>
                        {Genres.map((genre) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={genres.includes(genre.id)}
                                        onChange={() => onGenreToggle(genre.id)}
                                        name={genre.name}
                                    />
                                }
                                label={genre.name}
                            />
                        ))}
                    </FormGroup>
                    <FormHelperText>Choose genres</FormHelperText>
                </FormControl>
            </Box>
        </Box>
    );
}
