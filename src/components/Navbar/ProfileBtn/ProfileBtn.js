import React from 'react';

import MuiButton from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {makeStyles} from '@material-ui/core/styles';

import logoutUser from '../../../pages/MKPPL/LogoutUser/LogoutUser';

const customStyle = makeStyles({
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
});

const ProfileBtn = () => {
  const classes = customStyle();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const username = localStorage.getItem('username');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccount = () => {
    window.location.replace(accountURL());
  };

  const handleLogout = () => {
    const role = localStorage.getItem('role');
    if (role === 'Supervisor Lembaga') {
      logoutUser();
    } else {
      localStorage.removeItem('login_token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      window.location.replace('http://ppl-berkah-backend.herokuapp.com/auth/logout');
      window.location.replace('http://ppl-berkah.herokuapp.com');
    }
  };
  /** */
  function accountURL() {
    const role = localStorage.getItem('role');
    console.log(role);
    if (role === 'Mahasiswa') {
      return '/mahasiswa';
    } else if (role === 'Supervisor Sekolah') {
      return '/spv-sekolah';
    } else if (role === 'Koordinator Praktikum') {
      return '/koordinator-kuliah';
    } else if (role === 'Administrator') {
      return '/admin';
    } else if (role === 'Supervisor Lembaga') {
      return '/spv-lembaga';
    } else {
      return '/not-found';
    }
  }
  return (
    <div>
      <MuiButton
        data-testid="profbtn"
        className={classes.button}
        disableElevation
        variant="contained"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircleIcon className={classes.icon} fontSize="small" />
        {username}
        <ExpandMoreIcon className={classes.icon} fontSize="small" />
      </MuiButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        // positioning the dropdown
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleAccount}>
          <ListItemIcon>
            <PersonOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Lihat profil" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileBtn;
