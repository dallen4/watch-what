import { getTitleDetails } from '@lib/imdb';
import { Box, Typography } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { IMDbTitle } from 'types/imdb';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { id } = query;

    const data: IMDbTitle = await getTitleDetails(id as string);

    return {
        props: {
            titleId: id,
            title: {
                ...data,
                poster:
                    `https://image.tmdb.org/t/p/w300_and_h450_bestv2` + data.poster_path,
                name: data.title || data.name || data.original_name || data.original_title,
            },
        },
    };
};

export default function Title({ title }: TitleProps) {
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
            <Typography>{title.name}</Typography>
            <img src={title.poster} width={'34%'} />
        </Box>
    );
}

export type TitleProps = {
    titleId: string;
    title: IMDbTitle;
};
