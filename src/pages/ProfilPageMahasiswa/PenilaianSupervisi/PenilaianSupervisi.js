import React from 'react';
import CardPraktikum1 from './DetailPraktikumMahasiswa/CardPraktikum1';
import CardPraktikum2 from './DetailPraktikumMahasiswa/CardPraktikum2';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  custom: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: 'white',
    color: '#AAAAAA',
    textTransform: 'none',
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Nunito Sans'].join(
        ',',
    ),
    tab: {
      '&:hover': {
        backgroundColor: '#FFDEC5',
        color: 'white',
        opacity: 1,
      },
    },
    indicator: {
      backgroundColor: '#FF8326',
    },
    root: {
      flexGrow: 1,
    },
  },
});

/**
 * Tab Penilaian Supervisi di Mahasiswa
 * @return {Component}
 */
export default function PenilaianSupervisi() {
  const classes = useStyles();
  return (
    <div
      mx="auto"
      className={classes.root}
      data-test="component-penilaian-supervisi"
    >
      <Grid container spacing={3}>
        <Grid pl={3} item xs={12} sm={6}>
          <CardPraktikum1 />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardPraktikum2 />
        </Grid>
      </Grid>
    </div>
  );
}
