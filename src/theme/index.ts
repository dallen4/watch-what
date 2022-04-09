import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: '#b085f5',
            main: '#7e57c2',
            dark: '#4d2c91',
            contrastText: '#fff',
        },
        secondary: {
            light: '#6ff9ff',
            main: '#26c6da',
            dark: '#0095a8',
            contrastText: '#000',
        },
        custom: {},
    },
});

export default theme;
