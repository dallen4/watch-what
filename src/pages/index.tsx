import React, { useState } from 'react';
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    LinearProgress,
    List,
    ListItem,
    MenuItem,
    Select,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { Sources } from '@config/Sources';
import { SortOptions, TitleTypes } from 'types/general';
import { Genres } from '@config/Genres';
import useSearch from 'hooks/use-search';
import { useRouter } from 'next/router';
import useStyles from 'theme/styles';

export default function Home() {
    const router = useRouter();
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const [sources, setSources] = useState<number[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [genres, setGenres] = useState<number[]>([]);
    const [sortField, setSortField] = useState<string>(SortOptions[0]);

    const { titles, loading, error } = useSearch({
        query: '',
        sources,
        types,
        genres,
        sort: {
            field: sortField,
            order: 'asc',
        },
    });

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

    const onTypeToggle = (type: string) => {
        const typeIndex = types.indexOf(type);

        if (typeIndex === -1) setTypes([...types, type]);
        else setTypes(types.filter((t) => t !== type));
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
                <FormControl component="fieldset">
                    <FormLabel component="legend">Types</FormLabel>
                    <FormGroup className={classes.filterList}>
                        {TitleTypes.map((type) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={types.includes(type)}
                                        onChange={() => onTypeToggle(type)}
                                        name={type}
                                    />
                                }
                                label={type}
                            />
                        ))}
                    </FormGroup>
                    <FormHelperText>Choose genres</FormHelperText>
                </FormControl>
                <Select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value as string)}
                >
                    {SortOptions.map((sort) => (
                        <MenuItem value={sort}>{sort}</MenuItem>
                    ))}
                </Select>
            </Box>
            <List style={{ width: '100%' }}>
                {loading && (
                    <div>
                        <LinearProgress />
                    </div>
                )}
                {error && <div>Error!</div>}
                {titles.length === 0 && !loading && !error && (
                    <Typography variant="h6" align="center">
                        No results found
                    </Typography>
                )}
                {titles.map((title) => (
                    <ListItem onClick={() => router.push(`/title/${title.imdb_id}`)}>
                        <Typography>{title.title}</Typography>
                        <Typography variant={'caption'}>{title.year}</Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
