import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles, withStyles} from '@material-ui/core/styles';

import AksesKontrol from './AksesKontrol';
import DaftarUser from '../MKPPL/DaftarUser/DaftarUser';
import DetailUser from '../MKPPL/DetailUser/DetailUser';
import KelolaUser from '../MKPPL/KelolaUser/KelolaUser';
import NotFound from '../MKPPL/NotFound/NotFound';

const url = 'http://ppl-berkah-backend.herokuapp.com/api/v1/administrator/list-user/';

const GrayLine = styled.div`
  border: 1px solid #dedede;
  width: 100%;
`;

// Sub routes for profile Admin
const routes = [
  {
    label: 'Kontrol',
    path: '/admin',
    exact: true,
    main: () => kontrol(),
  },
  {
    label: 'User',
    path: '/admin/daftar-pengguna',
    exact: true,
    main: () => user(),
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

// Function for routing tabs 'Riwayat' and 'Penilaian'
export default function TabsAdmin() {
  // const path = window.location.pathname;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <AppBar
        data-test='component-appbar'
        position='static'
        color='default'
        elevation={0}
      >
        <div className={classes.root}>
          <Tabs
            value={value}
            variant='fullWidth'
            aria-label='full width tabs example'
            onChange={handleChange}
            indicatorColor='primary'
            classes={{indicator: classes.indicator}}>

            <StyledTab
              value={0}
              label='Tambah Pengguna'
              component={Link}
              to='/admin'
            />
            <StyledTab
              value={1}
              label='Daftar Pengguna'
              component={Link}
              to='/admin/daftar-pengguna'
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
          path='/admin/kelola/:role/:username'
          component={KelolaUser}
        />
        <Route
          exact
          path='/admin/detail/:role/:username'
          component={DetailUser}
        />
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

// Function for return a component for tab 'Riwayat'
export function kontrol() {
  return <AksesKontrol />;
}

// Function for return a component for tab 'Penilaian'
export function user() {
  return (
    <DaftarUser api={url}/>
  );
}
