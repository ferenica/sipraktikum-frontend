import React from 'react';
import LineChart from './LineChart';
import DonutChart from './DonutChart';
import Grid from '@material-ui/core/Grid';

/**
 * return for function dashboard
 * @return  {div} div to return
 */
export default function DashboardKoor() {
  return (
    <div>
      <br></br>
      <Grid xs={12} style={{display: 'flex', flexDirection: 'row'}}>
        <DonutChart></DonutChart>
      </Grid>
      <br></br>
      <h3 style={{textAlign: 'center'}}>
        <br></br>
      Grafik Ketepatan Waktu Pengumpulan Laporan
      </h3>
      {/* Disabled due to performance reason */}
      {/* <LineChart></LineChart> */}
    </div>
  );
}
