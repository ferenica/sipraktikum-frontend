import React, {Component} from 'react';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';
import Navbar from '../../../components/Navbar/Navbar';
import FilterStatistik from './FilterStatistik/FilterStatistik';
import ChartStatisitik from './ChartStatistik/ChartStatistik';
import axios from 'axios';
import PropTypes from 'prop-types';

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: -1;
  margin-bottom: -10vw;
`;

const Panel = styled.div`
  position: sticky;
  padding: 24px;
  min-height: 300px;
  border-radius: 10px;
  box-shadow: 0 2px 20px 0 rgba(39, 40, 48, 0.08);
  background-color: #ffffff;
  margin-bottom: 24px;

  @media screen and (max-width: 600px) {
    padding: 16px;
  }
`;
const PanelFilter = styled.div`
  position: sticky;
  padding: 24px;
  min-height: 250px;
  border-radius: 10px;
  box-shadow: 0 2px 20px 0 rgba(39, 40, 48, 0.08);
  background-color: #ffffff;
  margin-bottom: 24px;

  @media screen and (max-width: 600px) {
    padding: 16px;
  }
`;

/**
 * Admin's Statistik Page
 * @param {*} value
 */
class StatistikPage extends Component {
  state = {
    hasError: false,
    data: [{mahasiswa:
      {supervisor_lembaga:
        {lembaga:
          {tema: {nama: ''},
            institusi: {nama: ''},
          },

        },
      },
    },
    ],
    isLoggedIn: true,
    isLoaded: false,
    error: null,
    institusi: [],
    tema: 'Jenis Institusi',
    selectedFilters: {},
    offset: 0,
    page: 1,
    limit: 8,
    tahun: [2020],
    data11: [
      ['Institusi', '2020', '2019'],
      ['NGO', 100, 300],
      ['GO', 117, 460],
      ['Kesehatan', 660, 112],
      ['Sosial', 103, 540],
      ['NGO', 100, 400],
      ['GO', 117, 460],
      ['Kesehatan', 66, 112],
      ['Sosial', 100, 540],
      ['NGO', 100, 400],
    ],
    data12: [
      ['Institusi', '2019', '2020'],
      ['NGO', 300, 100],
      ['GO', 460, 117],
      ['Kesehatan', 112, 660],
      ['Sosial', 540, 103],
      ['NGO', 400, 100],
      ['GO', 460, 117],
      ['Kesehatan', 112, 66],
      ['Sosial', 540, 100],
      ['NGO', 400, 100],
    ],

    dataR: [],
  }

  /**
   *
   * @param {*} offset
   * @param {*} page
   */
  handleClick(offset, page) {
    this.setState({offset});
    this.setState({page});
  }

  /**
   *
   */
  componentDidMount() {
    // this.getAPI();
    this.simpanInstitusi();
    this.filterData();
  }

  /**
   *
   */
  componentWillMount() {
    this.filterData();
  }

  /**
   *
   */
  getAPI() {
    axios.get('http://ppl-berkah-backend.herokuapp.com/api/v1/laporan-akhir-db/')
    // axios.get('http://ppl-berkah-backend.herokuapp.com/api/v1/tema/')

        .then((institusi) => {
          this.setState({
          // institusi: res.data,
            data: institusi.data,
          });
        });
  }

  /** State of the component. */
  laporanFiltering = () => {}

  // setting the filter states as given by FilterLaporan
  temaLaporan = (value) => {
    this.setState({tema: value}, () => {
      this.laporanFiltering();
      this.filterData();
    });
  }

  institusiLaporan = (value) => {
    this.setState({institusi: value}, () => {
      this.laporanFiltering();
      this.filterData();
    });
  }

  tahunLaporan = (value) => {
    this.setState({tahun: value}, () => {
      this.laporanFiltering();
      this.filterData();
    });
  }

  lembagaLaporan = (value) => {
    this.setState({lembaga: value}, () => {
      this.laporanFiltering();
    });
  }
  /**
   *
   */
  simpanInstitusi() {
    for (let i = 0; i < this.state.data.length; i++) {
      const nama_institusi = this.state.data[i].mahasiswa.supervisor_lembaga
          .lembaga.institusi.nama;
      // this.setState(this.state.institusinama_institusi)
      this.setState({institusi: nama_institusi}, () => {
        this.laporanFiltering();
      });
    }
  }
  /**
   *
   */
  filterData() {
    console.log(this.state.tahun.toString());
    if (this.state.tema === 'Jenis Institusi' ) {
      if (JSON.stringify(this.state.tahun) === (JSON.stringify([2020]))) {
        this.setState({
          dataR: [
            ['Institusi', '2020'],
            ['NGO', 2],
            ['Komunitas', 2],
            ['Pendidikan', 2],
            ['Perusahaan', 2],
          ],
        });
      } else if (JSON.stringify(this.state.tahun) ===
      (JSON.stringify([2019]))) {
        this.setState({
          dataR: [
            ['Institusi', '2019'],
            ['NGO', 2],
            ['Komunitas', 2],
            ['Pendidikan', 2],
            ['Perusahaan', 2],
          ],
        });
      } else if (JSON.stringify(this.state.tahun) ===
      (JSON.stringify([2019, 2020]))) {
        this.setState({
          dataR: [
            ['Institusi', '2019', '2020'],
            ['NGO', 2, 2],
            ['Komunitas', 2, 2],
            ['Pendidikan', 2, 2],
            ['Perusahaan', 2, 2],
          ],
        });
      } else if (JSON.stringify(this.state.tahun) ===
      (JSON.stringify([2020, 2019]))) {
        this.setState({
          dataR: [
            ['Institusi', '2020', '2019'],
            ['NGO', 2, 2],
            ['Komunitas', 2, 2],
            ['Pendidikan', 2, 2],
            ['Perusahaan', 2, 2],
          ],
        });
      }
    } else {
      if (JSON.stringify(this.state.tahun) === (JSON.stringify([2020]))) {
        this.setState({
          dataR: [
            ['Tema', '2020'],
            ['Linkungan', 0],
            ['HRD', 0],
            ['Anak/Remaja', 1],
            ['Lansia', 0],
            ['Disabilitas', 0],
            ['Gender/Perempuan', 0],
            ['Pemberdayaan Masyarakat', 5],
            ['Penanganan Kemiskinan', 0],
            ['Kesehatan', 0],
            ['Edukasi', 2],
          ],

        });
      } else if (JSON.stringify(this.state.tahun) ===
      (JSON.stringify([2019]))) {
        this.setState({
          dataR: [
            ['Tema', '2019'],
            ['Linkungan', 0],
            ['HRD', 0],
            ['Anak/Remaja', 1],
            ['Lansia', 0],
            ['Disabilitas', 0],
            ['Gender/Perempuan', 0],
            ['Pemberdayaan Masyarakat', 5],
            ['Penanganan Kemiskinan', 0],
            ['Kesehatan', 0],
            ['Edukasi', 2],
          ],
        });
      } else if (JSON.stringify(this.state.tahun) ===
      (JSON.stringify([2020, 2019]))) {
        this.setState({
          dataR: [
            ['Tema', '2020', '2019'],
            ['Linkungan', 0, 0],
            ['HRD', 0, 0],
            ['Anak/Remaja', 1, 1],
            ['Lansia', 0, 0],
            ['Disabilitas', 0, 0],
            ['Gender/Perempuan', 0, 0],
            ['Pemberdayaan Masyarakat', 5, 5],
            ['Penanganan Kemiskinan', 0, 0],
            ['Kesehatan', 0, 0],
            ['Edukasi', 2, 2],
          ],
        });
      } else if (JSON.stringify(this.state.tahun) ===
      (JSON.stringify([2019, 2020]))) {
        this.setState({
          dataR: [
            ['Tema', '2019', '2020'],
            ['Linkungan', 0, 0],
            ['HRD', 0, 0],
            ['Anak/Remaja', 1, 1],
            ['Lansia', 0, 0],
            ['Disabilitas', 0, 0],
            ['Gender/Perempuan', 0, 0],
            ['Pemberdayaan Masyarakat', 5, 5],
            ['Penanganan Kemiskinan', 0, 0],
            ['Kesehatan', 0, 0],
            ['Edukasi', 2, 2],
          ],

        });
      }
    }
  }
  /**
   *
   * @param {*} error
   * @param {*} info
   */
  componentDidCatch(error, info) {
    this.setState({hasError: true});
  }

  /**
   * @return {Component}
   */
  render() {
    console.log(this.state.data[0].mahasiswa.supervisor_lembaga
        .lembaga.institusi.nama);
    console.log(this.state.data);
    console.log(this.state.tahun);
    const allInstitusi = [];
    const allTema = [];
    this.state.data.map((row) => {
      allInstitusi.push(row.mahasiswa.supervisor_lembaga
          .lembaga.institusi.nama);
    });
    this.state.data.map((row) => {
      allTema.push(row.mahasiswa.supervisor_lembaga.lembaga.tema.nama);
    });
    console.log(allInstitusi, allTema);

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return (
      <div>
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin} />
        <HeaderContainer >
          <img
            style={{width: '100vw'}}
            src={require('../../../assets/MKPPL/Orange_Header.png')}
            alt="header"
          />
        </HeaderContainer>

        <Container>
          <Row>
            <Col md="4">
              <PanelFilter>
                <FilterStatistik id='FilterStatistik'
                  kategoriStatistik={this.temaLaporan}
                  tahunStatistik={this.tahunLaporan}
                  executeFilter={this.startFilterDataBtn}
                />
              </PanelFilter>
            </Col>
            <Col md="8">
              <Panel>
                <h3 style={{textAlign: 'center'}}>
                  <br></br><br></br>
                Statistik lembaga
                </h3>
                <ChartStatisitik
                  data={this.state.dataR}/>
              </Panel>
            </Col>
          </Row>
        </Container>

      </div>

    );
  }
}

export default StatistikPage;

StatistikPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
