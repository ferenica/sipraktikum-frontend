import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme/muiTheme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router className="App">
        <Routes />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
