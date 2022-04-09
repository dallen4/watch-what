import { Theme, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: theme.spacing(3, 4),
    },
    iconButton: {
        backgroundColor: 'transparent',
    },
    instagramIcon: {
        fontSize: '30px',
        color: theme.palette.custom.gray,
    },
    assistanceText: {
        paddingBottom: theme.spacing(0.5),
    },
    emailLink: {
        fontWeight: 'bold'
    },
}));

export default styles;
