import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function RedChips(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chip label={props.label}
        size="small"
        style={{
          backgroundColor: '#ffdec5',
          color: '#ffaa6a',
          textTransform: 'uppercase'}}
      />
    </div>
  );
}
