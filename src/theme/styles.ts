import { Theme, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme: Theme) => ({
    filter: {
        maxHeight: '198px',
    },
    filterList: {
        maxHeight: '100%',
        overflow: 'scroll',
        flexWrap: 'unset',
    }
}));

export default styles;
