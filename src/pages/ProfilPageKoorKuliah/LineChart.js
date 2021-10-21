import React, {Component} from 'react';
import ReactApexChart from 'react-apexcharts';

/**
 *
 */
class LineChart extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      series: [{
        data: [1, 6, 10, 5, 6, 7],
      }],
      options: {
        chart: {
          height: 350,
          type: 'area',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          colors: ['#FF8326', '#FF9C51'],
        },
        fill: {
          colors: ['#FF8326', '#FF9C51'],
        },
        markers: {
          colors: '#FF8326',
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
          title: {
            text: 'Minggu ke',
            floating: false,
            offsetY: 13,
            style: {
              fontSize: '14px',
              fontWeight: 'normal',
              fontFamily: 'Nunito Sans',
              color: '#AAAAAA',
            },

          },
        },
        yaxis: {
          categories: [10, 20, 30, 40, 50, 60, 70, 80, 90],
          max: 90,
          floating: false,
          forceNiceScale: true,
          title: {
            text: 'Jumlah Mahasiswa',
            style: {
              fontSize: '14px',
              fontWeight: 'normal',
              fontFamily: 'Nunito Sans',
              color: '#AAAAAA',
            },
          },
        },
      },


    };
  }

  /**
   *
   */
  async getPostAPI() {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      };
      const awaitResponse = await fetch('http://ppl-berkah-backend.herokuapp.com/api/v1/koordinator-kuliah/riwayat-ketepatan-pengumpulan-laporan', requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const arr = [];
            Object.keys(data.data).forEach((key) => arr.push(data.data[key]));
            const initialItems = arr;
            const items = initialItems;
            this.state.series = [{name: 'series1', data: items}];
            this.setState({
              MetaProducts: this.state,
              init: 1,
            });
          });
      return await awaitResponse;
    } catch (error) {
      alert(error);
    }
  }

  /**
   *
   */
  componentDidMount() {
    this.getPostAPI();
  }

  /**
   *
   * @param {*} error
   * @param {*} info
   */
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({hasError: true});
  }

  /**
   *
   */
  renderChart() {
    return (
      <>
        <div id="chart">
          <ReactApexChart options={this.state.MetaProducts.options} series={this.state.MetaProducts.series} type="area" height={350} />
        </div>
      </>
    );
  }

  /**
   *
   */
  render() {
    return this.state.init ? <div>{this.renderChart()}</div> : <h1>Something went wrong.</h1>;
  }
}

export default LineChart;
