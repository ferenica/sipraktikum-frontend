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

export default function Chips(props) {
  const classes = useStyles();
  if (props.bool === 'true') {
    return (
      <div className={classes.root}>
        <Chip
          label={props.label}
          size="small"
          style={{
            backgroundColor: '#B8EFCF',
            color: '#219653',
            textTransform: 'uppercase',
          }}
        />
      </div>
    );
  } else if (props.bool === 'false') {
    return (
      <div className={classes.root}>
        <Chip
          label={props.label}
          size="small"
          style={{
            backgroundColor: '#FFDEC5',
            color: '#FF8326',
            textTransform: 'uppercase',
          }}
        />
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Chip
          label={props.label}
          size="small"
          style={{
            backgroundColor: '#B8EFCF',
            color: '#219653',
            textTransform: 'uppercase',
          }}
        />
      </div>
    );
  }
}
