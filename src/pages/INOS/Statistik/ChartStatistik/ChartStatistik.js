import {Chart} from 'react-google-charts';
import React from 'react';


const ChartStatistik = (props) => {
  const {data, subtitlee} = props;
  return (
    <Chart
      width={'98%'}
      height={'500px'}
      chartType="Bar"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        colors: ['#FF9C51', '#F15B15'],
        // Material design options
        chart: {
          subtitle: {subtitlee},
        },
        legend: {position: 'none'},
      }}
      // For tests
      rootProps={{'data-testid': '2'}}
    />
  );
};

export default ChartStatistik;
