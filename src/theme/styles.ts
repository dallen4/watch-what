import { Theme, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme: Theme) => ({
    filterList: {
        maxHeight: '200px',
        overflow: 'scroll',
        flexWrap: 'unset',
    }
}));

export default styles;
