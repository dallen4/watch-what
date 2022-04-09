import { Theme, makeStyles } from '@material-ui/core';

const styles: any = (theme: Theme | any) => ({
    root: {
        alignSelf: 'center',
        marginBottom: theme.spacing(4),
    },
});

export default makeStyles(styles);
