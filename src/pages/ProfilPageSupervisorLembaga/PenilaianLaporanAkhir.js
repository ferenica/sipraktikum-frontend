import React, {Component} from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import Chips from '../../components/MKPPL/Chips/Chips';
import EmptyState from '../../components/MKPPL/State/EmptyState';
import ErrorState from '../../components/MKPPL/State/ErrorState';
import LoadingState from '../../components/MKPPL/State/LoadingState';
import {StyledButton, DisabledButton}
  from '../../components/MKPPL/Button/Button';

import DocsIcon from '../../assets/MKPPL/docs.png';

const baseURL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-lembaga/';
const getURL = 'list-mahasiswa/praktikum/laporan-akhir/';
const putURL = 'praktikum-mahasiswa/nilai/';

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

const GrayLine = styled.div`
  border: 1px solid #dedede;
  width: 100%;
  margin: 24px 0px;
`;

const StatusSpan = styled.span`
  display: inline-block;
`;

const DocsImage = styled.img`
  margin: 8px;
  width: 36px;
`;

const H6 = styled.h6`
  color: #4f4f4f;
`;

const StyledInput = styled.input`
  border: 0;
  flex: 1;
  background-color: #f2f2f2;
  width: 100%;
  margin-bottom: 12px;
`;

const Back = () => {
  return (
    <>
      <Link
        to='/spv-lembaga/penilaian'
        style={{padding: '20px'}}
      >
        <h6>&lt;  Kembali</h6>
      </Link>
    </>
  );
};

// Class to get data from API based on username
class GetLaporanAkhir extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nilai: '',
      formErrors: {nilai: ''},
      nilaiValid: false,
      isSuccess: false,
      error: null,
      isLoaded: false,
      dataLaporan: [],
      dataMahasiswa: [],
      dataPraktikum: [],
      idLaporan: '',
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
          baseURL + getURL + this.props.username + '/',
          requestOptions,
      )
          .then((response) => response.json())
          .then((data) => {
            const dataLaporan = data.data;
            const dataMahasiswa = data.mahasiswa;
            const dataPraktikum = data.praktikum;

            this.setState({
              dataLaporan,
              dataMahasiswa,
              dataPraktikum,
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

  submitClick = () => {
    if (this.state.nilaiValid) {
      this.submitData();
    }
  };

  async submitData() {
    try {
      const nilai = parseInt(this.state.nilai, 10);
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
        body: JSON.stringify({
          skor: nilai,
        }),
      };
      await fetch(
          baseURL + putURL +
          this.props.username +
          '/' +
          this.state.idLaporan +
          '/',
          requestOptions,
      )
          .then((res) => {
            if (res.status === 200) {
              this.setState({isSuccess: true});
              alert('Data berhasil disimpan');
              return res.json();
            }
          })
          .then((resJson) => {
            this.setState({isSuccess: false});
          });
    } catch (error) {
      this.setState({isSuccess: false});
    }
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let nilaiValid = this.state.nilaiValid;

    switch (fieldName) {
      case 'nilai':
        nilaiValid = value.match(/^[1-9][0-9]?$|^100$/i) != null;
        fieldValidationErrors.nilai = nilaiValid ?
          '' :
          'Masukkan range nilai 1-100';
        break;
      default:
        break;
    }
    this.setState(
        {
          formErrors: fieldValidationErrors,
          nilaiValid: nilaiValid,
        },
        this.validateForm,
    );
  }

  setId(id) {
    if (this.state.idLaporan === '') {
      this.setState({idLaporan: id});
    }
  }

  setNilai(nilai) {
    if (nilai !== -1) {
      this.setState({nilai: nilai});
    }
  }
  convertToDate(input) {
    let date;
    if (input) {
      const inputTime = 'T' + input.split(' ')[1] + ':00';
      const inputDate = input
          .split(' ')[0]
          .split('-')
          .reverse()
          .join('-');
      date = new Date(inputDate + inputTime);
    } else {
      date = '';
    }
    return date;
  }

  convertToLocalDate(inputDate) {
    let dateString;
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    if (inputDate) {
      const date = this.convertToDate(inputDate);
      dateString = date.toLocaleDateString('id-ID', options);
    } else {
      dateString = '-';
    }
    return dateString;
  }

  countTimeLeft(deadlineStr) {
    let txtSisaDeadline = '-';
    if (deadlineStr) {
      const now = new Date();
      const deadline = this.convertToDate(deadlineStr);
      let selisih = (now.getTime() - deadline.getTime()) / 1000;
      if (selisih > 0) {
        if (selisih >= 60 * 60 * 24) {
          selisih = Math.round(selisih / (60 * 60 * 24));
          txtSisaDeadline = 'Lewat ' + selisih + ' hari';
        } else if (selisih >= 60 * 60) {
          selisih = Math.round(selisih / (60 * 60));
          txtSisaDeadline = 'Lewat ' + selisih + ' jam';
        } else if (selisih >= 60) {
          selisih = Math.round(selisih / 60);
          txtSisaDeadline = 'Lewat ' + selisih + ' menit';
        } else {
          selisih = Math.round(selisih);
          txtSisaDeadline = 'Lewat ' + selisih + ' detik';
        }
      } else {
        selisih = selisih * -1;
        if (selisih >= 60 * 60 * 24) {
          selisih = Math.round(selisih / (60 * 60 * 24));
          txtSisaDeadline = selisih + ' hari';
        } else if (selisih >= 60 * 60) {
          selisih = Math.round(selisih / (60 * 60));
          txtSisaDeadline = selisih + ' jam';
        } else if (selisih >= 60) {
          selisih = Math.round(selisih / 60);
          txtSisaDeadline = selisih + ' menit';
        } else {
          selisih = Math.round(selisih);
          txtSisaDeadline = selisih + ' detik';
        }
      }
    }

    return txtSisaDeadline;
  }

  getFileName(fileUrl) {
    if (fileUrl === null) {
      const fileName = '';
      return fileName;
    }
    const splitUrl = fileUrl.split('/');
    const fileName = splitUrl[splitUrl.length - 1];
    return fileName;
  }

  render() {
    const {
      error,
      isLoaded,
      dataLaporan,
      dataMahasiswa,
      dataPraktikum,
    } = this.state;

    // Filter by Praktikum
    const filterData = [].concat(dataLaporan)
        .filter((a) => a.jenis_praktikum === dataPraktikum.jenis_praktikum);
    const dataLaporanAkhir = filterData[0];

    if (this.state.isSuccess === true) {
      window.location.reload(false);
    }
    if (error) {
      return <ErrorState/>;
    } else if (!isLoaded) {
      return <LoadingState/>;
    } else if (!dataLaporanAkhir) {
      return <EmptyState/>;
    } else {
      return (
        <>
          <Back/>
          <Wrapper>
            <h2 style={{
              textAlign: 'center',
              marginBottom: '12px',
            }}>
              {dataMahasiswa.user.full_name}
            </h2>
            <Wrapper>
              <Row>
                <Col xs='5'>
                  <h4>Status</h4>
                </Col>
                <Col xs='7'>
                  <h4>
                    : {'  '}
                    <StatusSpan>
                      <Chips label="Aktif" />
                    </StatusSpan>
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col xs='5'>
                  <h4>Jenis Praktikum</h4>
                </Col>
                <Col xs='7'>
                  <h4>
                    : {'  '}
                    <b>{dataPraktikum.jenis_praktikum}</b>
                  </h4>
                </Col>
              </Row>
            </Wrapper>
            <GrayLine/>
            <h4><b>Laporan Akhir</b></h4>
            <div style={{marginBottom: '28px'}}>
              <Row>
                <Col xs="4">
                  <H6>Deadline</H6>
                  <H6>Waktu tersisa</H6>
                  <H6>Terakhir diubah</H6>
                </Col>
                <Col xs="8">
                  <H6>: <b>{this.convertToLocalDate(dataLaporanAkhir.waktu_deadline)}</b></H6>
                  <H6>: <b>{this.countTimeLeft(dataLaporanAkhir.waktu_deadline)}</b></H6>
                  <H6>: <b>{this.convertToLocalDate(dataLaporanAkhir.waktu_submisi)}</b></H6>
                </Col>
              </Row>
            </div>

            <div style={{marginBottom: '28px'}}>
              <Row>
                <Col xs="4">
                  <H6>Nama Lembaga</H6>
                  <H6>Periode Praktikum</H6>
                  <H6>Jenis Pelayanan</H6>
                </Col>
                <Col xs="8">
                  <H6>: <b>{dataMahasiswa.supervisor_lembaga.lembaga.nama}</b></H6>
                  <H6>: <b>{dataLaporanAkhir.periode_praktikum}</b></H6>
                  <H6>: <b>{dataMahasiswa.supervisor_lembaga.lembaga.jenis_pelayanan}</b></H6>
                </Col>
              </Row>
            </div>

            <div style={{marginBottom: '28px'}}>
              <H6>Laporan Akhir:</H6>
              {dataLaporanAkhir.laporan_akhir ?
                <>
                  <DocsImage src={DocsIcon} alt='docs'/>
                  <StatusSpan style={{marginTop: '16px'}}>
                    <h4>{this.getFileName(dataLaporanAkhir.laporan_akhir)}</h4>
                  </StatusSpan>
                  <Row>
                    <Col sm="1">
                    </Col>
                    <Col sm="11">
                      <a href={dataLaporanAkhir.laporan_akhir} rel='preview' target="_blank">
                        <StyledButton secondary>Preview</StyledButton>
                      </a>
                      <a href={dataLaporanAkhir.laporan_akhir} rel='download' download>
                        <StyledButton primary>Download</StyledButton>
                      </a>
                    </Col>
                  </Row>
                </> :
              <h6>Belum tersedia</h6>}
            </div>

            <div style={{marginBottom: '28px'}}>
              <H6>Profil Lembaga:</H6>
              {dataLaporanAkhir.profil_lembaga ?
                <>
                  <DocsImage src={DocsIcon} alt='docs'/>
                  <StatusSpan style={{marginTop: '16px'}}>
                    <h4>{this.getFileName(dataLaporanAkhir.profil_lembaga)}</h4>
                  </StatusSpan>
                  <Row>
                    <Col sm="1">
                    </Col>
                    <Col sm="11">
                      <a href={dataLaporanAkhir.profil_lembaga} rel='preview' target="_blank">
                        <StyledButton secondary>Preview</StyledButton>
                      </a>
                      <a href={dataLaporanAkhir.profil_lembaga} rel='download' download>
                        <StyledButton primary>Download</StyledButton>
                      </a>
                    </Col>
                  </Row>
                </> :
              <h6>Belum tersedia</h6>}
            </div>

            <div>
              <label htmlFor="nilai">Nilai:</label>
              <StyledInput
                className={
                  this.state.formErrors.nilai.length > 0 ? 'error' : null
                }
                type="number"
                name="nilai"
                placeholder={dataLaporanAkhir.skor_laporan_lembaga !== -1 ? dataLaporanAkhir.skor_laporan_lembaga : '1-100'}
                hint="masukkan skor dari 1-100"
                onChange={this.handleInputChange}
              />
              {this.state.formErrors.nilai.length > 0 && (
                <span className="errorMessage">
                  {this.state.formErrors.nilai}
                </span>
              )}

              <p>{this.setId(dataLaporanAkhir.id)}</p>
              {/* <p>{this.setNilai(dataLaporanAkhir.skor_laporan_lembaga)}</p> */}
              <div style={{position: 'relative', width: '100%', height: '48px', marginTop: '24px'}}>
                <div style={{position: 'absolute', right: '0'}}>
                  <Link to='/spv-lembaga/penilaian'>
                    <StyledButton secondary>
                      Batal
                    </StyledButton>
                  </Link>
                  {this.state.nilaiValid && dataLaporanAkhir.laporan_akhir &&
                    dataLaporanAkhir.profil_lembaga ?
                    <StyledButton primary onClick={this.submitClick}>
                      Simpan
                    </StyledButton> :
                    <DisabledButton>Simpan</DisabledButton>
                  }
                </div>
              </div>
            </div>

          </Wrapper>
        </>
      );
    }
  }
}

// Function for return a page for dynamic routing for 'Kelola'
export default function PenilaianLaporanAkhir({match, location}) {
  const {
    params: {username},
  } = match;

  return (
    <>
      <GetLaporanAkhir username={username} />
    </>
  );
}
