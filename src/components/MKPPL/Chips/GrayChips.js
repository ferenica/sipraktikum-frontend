import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function GrayChips(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chip label={props.label}
        size="small"
        style={{
          backgroundColor: '#f2f2f2',
          color: '#d2d2d2',
          textTransform: 'uppercase'}}
      />
    </div>
  );
}
