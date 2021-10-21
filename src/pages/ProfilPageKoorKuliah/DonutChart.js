import React, {Component} from 'react';
import ReactApexChart from 'react-apexcharts';
import Grid from '@material-ui/core/Grid';
import {Row, Col} from 'react-bootstrap';
import {MdTrendingUp} from 'react-icons/md';


/**
 *
 */
class DonutChart extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      series2: [],
      options: {
        chart: {
          type: 'donut',
          width: '100%',
          height: '50%',
        },
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        fill: {
          type: 'gradient',
          colors: ['#FF9C51', '#F2F2F2'],
        },
        responsive: [{
          options: {
            chart: {
              width: 1000,
            },
            legend: {
              show: false,
            },
          },
        }],
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
      const awaitResponse = await fetch('http://ppl-berkah-backend.herokuapp.com/api/v1/koordinator-kuliah/persentase-pengumpulan-laporan', requestOptions)
          .then((response) => response.json())
          .then((data) => {
            // const arr = [];
            // Object.keys(data.data).forEach((key) => arr.push(data.data[key]));
            // const initialItems = arr;
            // const items = initialItems;
            // this.state.series = items;
            this.setState({
              MetaProducts: this.state,
              series: [data.data.this_week, 100-data.data.this_week],
              persen: data.data.this_week,
              diff: data.data.difference_percent,
              absolute: Math.abs(data.data.difference_percent),
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
  async getPostAPIPenilaian() {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      };
      const awaitResponse = await fetch('http://ppl-berkah-backend.herokuapp.com/api/v1/koordinator-kuliah/persentase-penilaian-laporan-supervisor-sekolah', requestOptions)
          .then((response) => response.json())
          .then((data) => {
            // const arr = [];
            // Object.keys(data.data).forEach((key) => arr.push(data.data[key]));
            // const initialItems = arr;
            // const items = initialItems;
            // this.state.series2 = items;
            this.setState({
              MetaProducts: this.state,
              series2: [data.data.this_week, 100-data.data.this_week],
              persenPenilaian: data.data.this_week,
              diffPenilaian: data.data.difference_percent,
              absolutePenilaian: Math.abs(data.data.difference_percent),
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
    this.getPostAPIPenilaian();
  }

  /**
   *
   */
  render() {
    return (
      <>
        <Grid container xs={6} style={{border: '1px solid #DEDEDE', borderRadius: '5px'}}>
          <Col style={{alignItems: 'center', display: 'flex', marginLeft: '-5px'}}>
            <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width='100%' height='85%' />
          </Col>
          <Col xs={8}>
            <Row style={{fontFamily: 'Nunito Sans', fontWeight: 'normal', fontSize: '16px', lineHeight: '22px', letterSpacing: '0.0025em'}}>
              {this.state.persen}% Mahasiswa mengumpulkan tepat waktu
            </Row>
            <Row>
              <Col xs={1}><MdTrendingUp color="#219653" size={15}></MdTrendingUp></Col>
              <Col xs={9} style={{fontFamily: 'Nunito Sans', fontWeight: 'normal', fontSize: '14px', color: '#AAAAAA', lineHeight: '22px'}}>
                {this.state.diff >= 0 ?
                <div>Meningkat {this.state.diff}% dari minggu sebelumnya</div> :
                <div>Menurun {this.state.absolute}% dari minggu sebelumnya</div>}
              </Col>
            </Row>
          </Col>
        </Grid>
        <Grid container xs={6} style={{border: '1px solid #DEDEDE', borderRadius: '5px'}}>
          <Col style={{alignItems: 'center', display: 'flex', marginLeft: '-5px'}}>
            <ReactApexChart options={this.state.options} series={this.state.series2} type="donut" width='100%' height='85%' />
          </Col>
          <Col xs={8}>
            <Row style={{fontFamily: 'Nunito Sans', fontWeight: 'normal', fontSize: '16px', lineHeight: '22px', letterSpacing: '0.0025em'}}>
              {this.state.persenPenilaian}% Laporan telah dinilai oleh Supervisor Sekolah
            </Row>
            <Row>
              <Col xs={1}><MdTrendingUp color="#219653" size={15}></MdTrendingUp></Col>
              <Col xs={9} style={{fontFamily: 'Nunito Sans', fontWeight: 'normal', fontSize: '14px', color: '#AAAAAA', lineHeight: '22px'}}>
                {this.state.diff >= 0 ?
                <div>Meningkat {this.state.diffPenilaian}% dari minggu sebelumnya</div> :
                <div>Menurun {this.state.absolutePenilaian}% dari minggu sebelumnya</div>}
              </Col>
            </Row>
          </Col>
        </Grid>
      </>
    );
  }
}

export default DonutChart;
