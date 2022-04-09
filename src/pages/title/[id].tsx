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
            title: { ...data },
        },
    };
};

export default function Title(props: TitleProps) {
    const { title, titleId } = props;

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
            <Typography>{title.Title}</Typography>
            <img src={title.Poster} width={'34%'} />
        </Box>
    );
}

export type TitleProps = {
    titleId: string;
    title: any;
};
