import { Theme, makeStyles } from '@material-ui/core';

const styles: any = (theme: Theme) => ({
    header: {
        height: '100%',
    },
    banner: {
        height: 'auto',
        maxHeight: '40vh',
        maxWidth: '70vw',
    },
});

export default makeStyles(styles);
