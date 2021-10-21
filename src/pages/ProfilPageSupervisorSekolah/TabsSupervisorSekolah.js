import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles, withStyles} from '@material-ui/core/styles';

import DetailSubmisiMahasiswa
  from '../MKPPL/SubmisiMahasiswa/DetailSubmisiMahasiswa';
import DetailSubmisiMahasiswaLaporanAkhir
  from '../MKPPL/SubmisiMahasiswa/DetailSubmisiMahasiswaLaporanAkhir';
import DetailSubmisiMahasiswaLaporanBorang
  from '../MKPPL/SubmisiMahasiswa/DetailSubmisiMahasiswaLaporanBorang';
import DaftarMahasiswa from '../DaftarMahasiswa/DaftarMahasiswa';
import KelolaMahasiswa from '../MKPPL/KelolaMahasiswa/KelolaMahasiswa';
import RiwayatSupervisorSekolah from './RiwayatSupervisorSekolah';
import SubmisiMahasiswa from '../MKPPL/SubmisiMahasiswa/SubmisiMahasiswa';
import KelolaBorang from './KelolaBorang';
import NotFound from '../MKPPL/NotFound/NotFound';

const urlMahasiswa = 'http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-sekolah/list-mahasiswa/praktikum/';

const GrayLine = styled.div`
  border: 1px solid #dedede;
  width: 100%;
`;

// Sub routes for profile Supervisor Sekolah
const routes = [
  {
    label: 'Riwayat',
    path: '/spv-sekolah',
    exact: true,
    main: () => riwayat(),
  },
  {
    label: 'Praktikum 1',
    path: '/spv-sekolah/praktikum-1',
    exact: true,
    main: () => praktikum1(),
  },
  {
    label: 'Praktikum 2',
    path: '/spv-sekolah/praktikum-2',
    exact: true,
    main: () => praktikum2(),
  },
  {
    label: 'Template Borang',
    path: '/spv-sekolah/template-borang',
    exact: true,
    main: () => templateBorang(),
  },
];

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


/**
 * Function for routing tabs 'Riwayat' and 'Penilaian'
 * @param {*} props
 * @return {Component}
 */
export default function TabsSupervisorSekolah(props) {
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
            classes={{indicator: classes.indicator}}>

            <StyledTab
              value={0}
              label="Riwayat"
              component={Link}
              to="/spv-sekolah"
            />
            <StyledTab
              value={1}
              label="Praktikum 1"
              component={Link}
              to="/spv-sekolah/praktikum-1"
            />
            <StyledTab
              value={2}
              label="Praktikum 2"
              component={Link}
              to="/spv-sekolah/praktikum-2"
            />
            <StyledTab
              value={3}
              label="Template Borang"
              component={Link}
              to="/spv-sekolah/template-borang"
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
          path="/spv-sekolah/penilaian/kelola/:username"
          component={KelolaMahasiswa}
        />
        <Route
          exact
          path="/spv-sekolah/penilaian/lihat/:username"
          component={SubmisiMahasiswa}
        />
        <Route
          exact
          path="/spv-sekolah/penilaian/detail/:username/:id"
          component={DetailSubmisiMahasiswa}
        />
        <Route
          exact
          path="/spv-sekolah/penilaian-laporan-akhir/detail/:username/:id"
          component={DetailSubmisiMahasiswaLaporanAkhir}
        />
        <Route
          exact
          path="/spv-sekolah/penilaian-laporan-borang/detail/:username/:id"
          component={DetailSubmisiMahasiswaLaporanBorang}
        />
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

/**
 * Function for return a component for tab 'Riwayat'
 */
export function riwayat() {
  return <RiwayatSupervisorSekolah/>;
}

// TODO: Function for return a component for tab 'Praktikum 1'
export function praktikum1() {
  return (
    <DaftarMahasiswa type='supervisor-sekolah' praktikum = "Praktikum 1" api={urlMahasiswa}/>
  );
}

// TODO: Function for return a component for tab 'Praktikum 2'
export function praktikum2() {
  return (
    <DaftarMahasiswa type='supervisor-sekolah' praktikum = "Praktikum 2" api={urlMahasiswa}/>
  );
}

/**
 *
 */
export function templateBorang() {
  return <KelolaBorang/>;
}
