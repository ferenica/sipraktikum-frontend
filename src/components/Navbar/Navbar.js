import React from 'react';
import PropTypes from 'prop-types';
import makaraui from '../../assets/INOS/Makara_UI.png';
import ProfileBtn from './ProfileBtn/ProfileBtn';

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MuiButton from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 0,
  },
  viewButtonLabel: {
    textTransform: 'none',
  },
  appBar: {
    position: 'static',
    color: '#404852',
    backgroundColor: '#ffffff',
  },
  avatar: {
    marginRight: 15,
  },
  typography: {
    variant: 'body1',
    flexGrow: 1,
  },
  buttomNavigation: {
    fontSize: 20,
    flexGrow: 1,
  },
  button: {
    'borderRadius': '20px',
    'textTransform': 'none',
    'letterSpacing': '0',
    'fontFamily': 'Nunito Sans',
    'fontWeight': 'bold',

    'backgroundColor': '#FF8326',
    'color': 'white',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      color: '#FF8326',

    },
  },
  icon: {
    width: '1.5em',
  },
}));

/**
 * Navbar
 * @param {Boolean} props - For login status
 * @return {Component} Navbar
 */
export default function Navbar(props) {
  const classes = useStyles();

  const handleLogin = () => {
    window.location.replace('/login');
  };

  let navigation;
  let button;

  if (props.isAdmin) {
    navigation = <BottomNavigation showLabels>
      <BottomNavigationAction
        className={classes.buttomNavigation}
        label="Home"
        href="/"/>
      <BottomNavigationAction
        className={classes.buttomNavigation}
        label="Kelola Penugasan"
        href="/admin-penugasan-dosen"/>
      <BottomNavigationAction
        className={classes.buttomNavigation}
        label="Statistik"
        href="/statistik" />
      <BottomNavigationAction
        className={classes.buttomNavigation}
        label="Laporan Akhir"
        href="/laporan-akhir" />
    </BottomNavigation>;
  } else if (props.isDosen) {
    navigation = <BottomNavigation showLabels>
      <BottomNavigationAction
        className={classes.buttomNavigation}
        label="Home"
        href="/"/>
      <BottomNavigationAction
        className={classes.buttomNavigation}
        label="Arsip Laporan"
        href="/arsip-laporan"/>
    </BottomNavigation>;  
  } else {
    navigation = <BottomNavigation showLabels>

      <BottomNavigationAction
        className={classes.buttomNavigation}
        label="Home"
        href="/"/>
    </BottomNavigation>;
  }

  if (props.isAuthenticated) {
    button = <ProfileBtn/>;
  } else {
    button =
    <div>
      <MuiButton
        data-testid="profbtn"
        className={classes.button}
        disableElevation
        variant="contained"
        aria-haspopup="true"
        onClick={handleLogin}>
        Login
      </MuiButton>
    </div>;
  }

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Avatar className={classes.avatar} src={makaraui}></Avatar>
          <Typography className={classes.typography}>
            <strong>Sistem Informasi Penilaian & Database Praktikum</strong>
            <br></br>
            Fakultas Ilmu Sosial dan Ilmu Politik Universitas Indonesia
          </Typography>
          {navigation}
          {button}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  isAdmin: PropTypes.bool,
  isDosen: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};
