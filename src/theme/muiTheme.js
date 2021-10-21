import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  fontFamily: 'Nunito, sans-serif',
  palette: {
    primary: {
      light: '#FF9C51',
      main: '#FF8326',
      dark: '#F15B15',
      contrastText: '#fff',
    },
  },
});

export default theme;
