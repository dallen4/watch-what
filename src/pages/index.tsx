import React, { useState } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
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
import { ViewComfy, ViewList } from '@material-ui/icons';

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
            order: 'desc',
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
                <FormControl component={'fieldset'} className={classes.filter}>
                    <FormLabel component={'legend'}>Platforms</FormLabel>
                    <FormGroup className={classes.filterList}>
                        {Sources.map((source) => (
                            <FormControlLabel
                                key={source.id}
                                control={
                                    <Checkbox
                                        checked={sources.includes(source.id)}
                                        onChange={() => onSourceToggle(source.id)}
                                        name={source.name}
                                        style={{ padding: '2px' }}
                                    />
                                }
                                label={source.name}
                                style={{
                                    paddingLeft: '6px',
                                    paddingTop: '2px',
                                    paddingBottom: '2px',
                                }}
                            />
                        ))}
                    </FormGroup>
                    <FormHelperText>Choose streaming platforms</FormHelperText>
                </FormControl>
                <FormControl component={'fieldset'} className={classes.filter}>
                    <FormLabel component={'legend'}>Genres</FormLabel>
                    <FormGroup className={classes.filterList}>
                        {Genres.map((genre) => (
                            <FormControlLabel
                                key={genre.id}
                                control={
                                    <Checkbox
                                        checked={genres.includes(genre.id)}
                                        onChange={() => onGenreToggle(genre.id)}
                                        name={genre.name}
                                        style={{ padding: '2px' }}
                                    />
                                }
                                label={genre.name}
                                style={{
                                    paddingLeft: '6px',
                                    paddingTop: '2px',
                                    paddingBottom: '2px',
                                }}
                            />
                        ))}
                    </FormGroup>
                    <FormHelperText>Choose genres</FormHelperText>
                </FormControl>
                <FormControl component={'fieldset'} className={classes.filter}>
                    <FormLabel component={'legend'}>Types</FormLabel>
                    <FormGroup className={classes.filterList}>
                        {TitleTypes.map((type) => (
                            <FormControlLabel
                                key={type}
                                control={
                                    <Checkbox
                                        checked={types.includes(type)}
                                        onChange={() => onTypeToggle(type)}
                                        name={type}
                                        style={{ padding: '2px' }}
                                    />
                                }
                                label={type}
                                style={{
                                    paddingLeft: '6px',
                                    paddingTop: '2px',
                                    paddingBottom: '2px',
                                }}
                            />
                        ))}
                    </FormGroup>
                    <FormHelperText>Choose genres</FormHelperText>
                </FormControl>
                <Select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value as string)}
                >
                    {SortOptions.map((sort, index) => (
                        <MenuItem key={index} value={sort}>
                            {sort}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <ButtonGroup variant={'outlined'} color={'secondary'}>
                <Button variant={'contained'}>
                    <ViewList />
                </Button>
                <Button>
                    <ViewComfy />
                </Button>
            </ButtonGroup>
            <List
                style={{
                    marginTop: '16px',
                    minHeight: '250px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
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
                    <ListItem
                        key={title.id}
                        onClick={() => router.push(`/title/${title.imdb_id}`)}
                        style={{ height: '250px' }}
                    >
                        <img height={'100%'} src={title.details?.poster} />
                        <Box padding={2}>
                            <ListItemText
                                primary={
                                    <>
                                        {title.title}
                                        <Typography
                                            component={'span'}
                                            variant={'caption'}
                                        >
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
                                    >{`${
                                        (title.details?.vote_average || 0) * 10
                                    }%`}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
