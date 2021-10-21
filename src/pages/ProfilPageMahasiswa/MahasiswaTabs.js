import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import RiwayatSupervisi from './RiwayatSupervisi';
import PenilaianSupervisi from './PenilaianSupervisi/PenilaianSupervisi';
import DetailPraktikum from './PenilaianSupervisi/DetailPraktikumMahasiswa/DetailPraktikum';
import DetailLaporan from '../MKPPL/DetailProgressMahasiswa/DetailLaporan';
import NotFound from '../MKPPL/NotFound/NotFound';

const GrayLine = styled.div`
  border: 1px solid #dedede;
  width: 100%;
`;

// Function for styling material tabs
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: 'white',
    textTransform: 'none',
    indicator: {
      backgroundColor: '#FF8326',
    },
  },
}));

const StyledTab = withStyles((theme) => ({
  root: {
    'textTransform': 'none',
    'color': '#AAAAAA',
    'fontWeight': theme.typography.fontWeightRegular,
    'fontSize': theme.typography.pxToRem(18),
    'marginRight': theme.spacing(1),
    '&$selected': {
      color: '#FF8326',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#FF8326',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:hover': {
      color: '#F15B15',
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const routes = [
  {
    label: 'Riwayat',
    path: '/mahasiswa',
    exact: true,
    main: () => RiwayatSupervisi(),
  },
  {
    label: 'Penilaian',
    path: '/mahasiswa/penilaian',
    exact: true,
    main: () => PenilaianSupervisi(),
  },
];

/**
 * Handle tabs di profil mahasiswa
 * @return {Component}
 */
export default function MahasiswaTabs() {
  // const path = window.location.pathname;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Router>
      <AppBar
        data-test="component-appbar"
        position="static"
        color="default"
        elevation={0}
      >
        <div className={classes.root}>
          <Tabs
            value={value}
            variant="fullWidth"
            aria-label="full width tabs example"
            onChange={handleChange}
            indicatorColor='primary'
            classes={{indicator: classes.indicator}}
          >
            <StyledTab
              value={0}
              label="Riwayat Supervisi"
              component={Link}
              to="/mahasiswa"
            />
            <StyledTab
              value={1}
              label="Penilaian Supervisi"
              component={Link}
              to="/mahasiswa/penilaian"
            />
          </Tabs>
          <GrayLine />
        </div>
      </AppBar>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={() => <route.main />}
          />
        ))}
        <Route
          exact
          path="/mahasiswa/penilaian/detail-praktikum"
          component={DetailPraktikum}
        ></Route>
        <Route
          exact
          path="/mahasiswa/penilaian/detail-laporan/:jenis/:id"
          component={DetailLaporan}
        ></Route>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}
