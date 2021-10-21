import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
// import getDataSupervisorLembaga from './../../GetData/GetDataSupervisorLembaga';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    height: 40,
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: '5px',
    border: '0px',
  },
}));

function RenderUsernameLembaga({
  idlembaga, input, label, meta: {touched, error}, children, ...custom}) {
  const classes = useStyles();
  // const data = getDataSupervisorLembaga(idlembaga)
  return (
    <>
      <h6>{label}</h6>
      <input
        className={classes.root}
        placeholder=""
        // errorText={touched && error}
        {...input}
        {...custom}
        margin="normal"
      />
      {touched && error && <p style={{color: '#F24848'}}>{error}</p>}
    </>
  );
}

export default RenderUsernameLembaga;
