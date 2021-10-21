import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import FormKelola from './FormKelola';
import showResults from './showResults';
import rootReducer from './reducers';

import Chips from './../../../components/MKPPL/Chips/Chips';
import OptionLembaga from './../../../components/MKPPL/Option/OptionLembaga';
import EmptyState from './../../../components/MKPPL/State/EmptyState';
import ErrorState from './../../../components/MKPPL/State/ErrorState';
import LoadingState from './../../../components/MKPPL/State/LoadingState';

const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/mahasiswa/praktikum/laporan-update/';

const store = createStore(
    rootReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const InlineSpan = styled.span`
  display: inline-block;
  margin-left: 8px;
`;

const CenterText = styled.h3`
  color: #404852;
  text-align: center;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  display: block;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Back = () => {
  return (
    <>
      <Link
        to='/spv-sekolah/penilaian'
        style={{padding: '24px'}}
      >
        <h6>&lt;  Kembali</h6>
      </Link>
    </>
  );
};

// Class to get data from API based on username
class GetDataLaporan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      dataKelola: [],
      dataLaporanMingguan: [],
      dataLaporanAkhir: [],
      dataLaporanBorang: [],
      objSupervisorLembaga: null,
      idLembaga: '',
    };
  }

  componentDidMount() {
    this.fetchDataFromServer();
  }

  async fetchDataFromServer() {
    try {
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
      };
      const awaitResponse = await fetch(
          URL + this.props.username + '/', requestOptions,
      )
          .then((response) => response.json())
          .then((data) => {
            const dataKelola = data.profile;
            const dataLaporanMingguan = data.laporan_mingguan;
            const dataLaporanAkhir = data.laporan_akhir;
            const dataLaporanBorang = data.laporan_borang;
            const objSupervisorLembaga = dataKelola.supervisor_lembaga;
            const idLembaga = objSupervisorLembaga.lembaga.id;

            this.setState({
              dataKelola,
              dataLaporanMingguan,
              dataLaporanAkhir,
              dataLaporanBorang,
              objSupervisorLembaga,
              idLembaga,
              isLoaded: true,
            });
          });
      return await awaitResponse;
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  }

  getIdLembaga(selectedLembaga) {
    this.setState({idLembaga: selectedLembaga});
  }

  render() {
    const {
      error,
      isLoaded,
      dataKelola,
      dataLaporanMingguan,
      dataLaporanAkhir,
      dataLaporanBorang,
      objSupervisorLembaga,
      idLembaga,
    } = this.state;

    const sortedLaporanMingguan = dataLaporanMingguan.sort((a, b) => a.nama_laporan - b.nama_laporan);
    console.log(dataLaporanMingguan);
    if (error) {
      return <ErrorState/>;
    } else if (!isLoaded) {
      return <LoadingState/>;
    } else if (dataKelola.length === 0) {
      return <EmptyState/>;
    } else {
      return (
        <>
          <Back />
          <CenterText>Informasi Mahasiswa</CenterText>
          <div style={{textAlign: 'center'}}>
            <h2>{dataKelola.user.full_name}</h2>
          </div>

          <Wrapper>
            <Row>
              <Col xs='4'>
                <h4>Status</h4>
              </Col>
              <Col xs='8'>
                <h4>
                  :
                  <InlineSpan>
                    <Chips label="Aktif" />
                  </InlineSpan>
                </h4>
              </Col>
            </Row>
            <Row>
              <Col xs='4'>
                <h4>Periode</h4>
              </Col>
              <Col xs='8'>
                <h4>
                  : {'  '}
                  <b>{dataKelola.periode.nama}</b>
                </h4>
              </Col>
            </Row>
            <Row>
              <Col xs='4' style={{paddingRight: '0px'}}>
                <h4>Supervisor Sekolah</h4>
              </Col>
              <Col xs='8'>
                <h4>
                  : {'  '}
                  <b>{dataKelola.supervisor_sekolah.user.full_name}</b>
                </h4>
              </Col>
            </Row>

            {objSupervisorLembaga !== null ? (
              <OptionLembaga
                value={objSupervisorLembaga.lembaga.id}
                returnValue={this.getIdLembaga.bind(this)}
              />
            ) : (
              <OptionLembaga
                value=""
                returnValue={this.getIdLembaga.bind(this)}
              />
            )}
          </Wrapper>

          {/* <FormKelola2
            username={dataKelola.user.username}
            dataLaporanMingguan={sortedLaporanMingguan}
            dataLaporanAkhir={dataLaporanAkhir}
            dataLaporanBorang={dataLaporanBorang}
            objSupervisorLembaga={objSupervisorLembaga}
          /> */}
          <Provider store={store}>
            <FormKelola
              username={dataKelola.user.username}
              dataLaporanMingguan={sortedLaporanMingguan}
              dataLaporanAkhir={dataLaporanAkhir}
              dataLaporanBorang={dataLaporanBorang}
              idLembaga={idLembaga}
              objSupervisorLembaga={objSupervisorLembaga}
              onSubmit={showResults}
            />
          </Provider>
        </>
      );
    }
  }
}

// Function for return a page for dynamic routing for 'Kelola'
export default function KelolaMahasiswa({match, location}) {
  const {
    params: {username},
  } = match;

  return (
    <>
      <GetDataLaporan username={username} />
    </>
  );
}
