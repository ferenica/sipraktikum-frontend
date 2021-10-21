import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import makaraui from '../../assets/INOS/Makara_UI.png';
import MuiButton from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
 *
 */
export default function NavbarBfrLog() {
  const classes = useStyles();
  const [setAnchorEl] = React.useState(null);

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Avatar className={classes.avatar} src={makaraui}></Avatar>
          <Typography className={classes.typography}>
            <strong>Sistem Database Praktikum</strong><br></br>
            Fakultas Ilmu Sosial dan Ilmu Politik Universitas Indonesia
          </Typography>

          <MuiButton
            data-testid = "profbtn"
            className = {classes.button}
            disableElevation
            variant="contained"
            aria-haspopup="true"
            href = "http://ppl-berkah-backend.herokuapp.com/auth/login/sivitas/">
            <AccountCircleIcon className = {classes.icon} fontSize="small"/>
            Login

          </MuiButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
