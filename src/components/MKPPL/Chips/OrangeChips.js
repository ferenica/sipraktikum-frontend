/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function OrangeChips(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chip label={props.label}
        size="small"
        style={{
          backgroundColor: '#FFDEC5',
          color: '#FF8326',
          textTransform: 'uppercase'}}
      />
    </div>
  );
}
