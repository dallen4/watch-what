import { Theme, makeStyles, createStyles } from '@material-ui/core';
import { ASPECT_RATIOS } from '@config/Media';

const styles = (theme: Theme) =>
    createStyles({
        container: {
            position: 'relative',
            width: '100%',
        },
        iframe: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
        standardAspectRatio: {
            paddingTop: ASPECT_RATIOS.videos.teasers.standard,
            [theme.breakpoints.down('sm')]: {
                paddingTop: ASPECT_RATIOS.videos.embeds.square,
            },
        },
        featuredAspectRatio: {
            paddingTop: ASPECT_RATIOS.videos.embeds.featured,
        },
    });

export default makeStyles(styles);
