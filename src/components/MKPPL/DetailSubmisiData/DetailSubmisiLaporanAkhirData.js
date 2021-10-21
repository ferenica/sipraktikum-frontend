import React, {Component} from 'react';
import styled from 'styled-components';
import Chips from './../Chips/Chips';
import Link from '@material-ui/core/Link';
import {Row, Col} from 'react-bootstrap';
import {Form, FormGroup, Label, Button} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import DocsIcon from './../../../assets/MKPPL/docs.png';
import {StyledButton} from './../../../components/MKPPL/Button/Button';
import axios from 'axios';

// Styled components for search bar
const StyledInput = styled.input`
  border: 0;
  flex: 1;
  background-color: #f2f2f2;
  width: 100%;
  margin-bottom: 12px;
`;
const StyledTextArea = styled.textarea`
  border: 0;
  flex: 1;
  background-color: #f2f2f2;
  width: 100%;
  margin-bottom: 12px;
  height: 72px
`;
const DocsImage = styled.img`
  margin: 8px;
  width: 36px;
`;
const GrayLine = styled.div`
  border: 1px solid #dedede;
  width: 100%;
`;
const StatusSpan = styled.span`
  display: inline-block;
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
// Class to filter data that matches with search input
// And return list of data if it's valid
/** */
export default class DetailSubmisiLaporanAkhirData extends Component {
  /** */
  constructor() {
    super();
    this.state = {
      nilai: '',
      umpan_balik: '',
      formErrors: {nilai: '', umpan_balik: ''},
      formValid: false,
      isSuccess: false,
    };
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => {
      this.validateField(name, value);
    });
    console.log(name);
    console.log(value);
  };
  /** */
  handleDownloadFile(event, url, name) {
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
    });
  }
  /** */
  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let nilaiValid = this.state.nilaiValid;

    switch (fieldName) {
      case 'nilai':
        console.log(value);
        nilaiValid = value.match(/^[1-9][0-9]?$|^100$/i) !== null;
        console.log(nilaiValid);
        fieldValidationErrors.nilai = nilaiValid ?
          '' :
          ' masukkan range nilai 1-100';
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

  submitClick = () => {
    if (this.state.nilaiValid) {
      this.fetchDataFromServer();
    }
  };
  /** */
  async fetchDataFromServer() {
    try {
      const nilai = this.state.nilai;
      const umpan_balik = this.state.umpan_balik;
      console.log(nilai);
      console.log(umpan_balik);
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
        body: JSON.stringify({
          skor: nilai,
          feedback: umpan_balik,
        }),
      };
      console.log(requestOptions);
      await fetch(
          'http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-sekolah/laporan-akhir-mahasiswa/nilai/' +
          this.props.mahasiswa.user.username +
          '/' +
          this.props.content.id +
          '/',
          requestOptions,
      )
          .then((res) => {
            if (res.status === 200) {
              this.setState({isSuccess: true});

              return res.json();
            }
          })
          .then((resJson) => {
            console.log(resJson);
            this.setState({isSuccess: false});
          });
    } catch (error) {
      console.log(error);
      this.setState({isSuccess: false});
    }
  }
  /** */
  getFileName(fileUrl) {
    if (fileUrl === null) {
      const fileName = '';
      return fileName;
    }
    const splitUrl = fileUrl.split('/');
    const fileName = splitUrl[splitUrl.length - 1];
    return fileName;
  }
  /** */
  render() {
    if (this.state.isSuccess === true) {
      window.location.reload(false);
    }
    let txtSisaDeadline = '-';

    let lastChangedStr = this.props.content.waktu_submisi;
    if (lastChangedStr === undefined || lastChangedStr === null) {
      lastChangedStr = '-';
    } else {
      const lastChangedStrTime = 'T' + lastChangedStr.split(' ')[1] + ':00';
      const lastChangedStrDate = lastChangedStr
          .split(' ')[0]
          .split('-')
          .reverse()
          .join('-');
      const lastChanged = new Date(lastChangedStrDate + lastChangedStrTime);
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      lastChangedStr = lastChanged.toLocaleDateString('id-ID', options);
    }

    let deadlineStr = this.props.content.waktu_deadline;
    if (deadlineStr === undefined || deadlineStr === null) {
      deadlineStr = '-';
    } else {
      const deadlineStrTime = 'T' + deadlineStr.split(' ')[1] + ':00';
      const deadlineStrDate = deadlineStr
          .split(' ')[0]
          .split('-')
          .reverse()
          .join('-');
      const deadline = new Date(deadlineStrDate + deadlineStrTime);
      const now = new Date();

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
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      deadlineStr = deadline.toLocaleDateString('id-ID', options);
    }

    let nilaiSupvSekolah = this.props.content.skor_laporan_sekolah;
    let nilaiSupvLembaga = this.props.content.skor_laporan_lembaga;

    if (nilaiSupvSekolah === -1) {
      nilaiSupvSekolah = 'Belum dinilai';
    }
    if (nilaiSupvLembaga === -1) {
      nilaiSupvLembaga = 'Belum dinilai';
    }

    if (this.state.isSuccess === true) {
      return <Redirect to="/spv-sekolah" />;
    }

    let namaLembaga = '';
    let bidangKerja = '';
    let periodePraktikum = '';
    let jenisPelayanan = '';
    if (this.props.mahasiswa.supervisor_lembaga !== null || this.props.mahasiswa.supervisor_lembaga !== undefined) {
      try {
        namaLembaga = this.props.mahasiswa.supervisor_lembaga.lembaga.nama;
      } catch (error) {
        namaLembaga = '';
      }
      try {
        periodePraktikum = this.props.mahasiswa.periode.nama;
      } catch (error) {
        periodePraktikum = '';
      }
      try {
        jenisPelayanan = this.props.mahasiswa.supervisor_lembaga.lembaga.jenis_pelayanan;
      } catch (error) {
        jenisPelayanan = '';
      }
    }
    return (
      <>
        <h1>{this.props.mahasiswa.user.username}</h1>
        <Centered>
          <h4 style={{color: '#4F4F4F'}}>
            Status:{' '}
            <StatusSpan>
              <Chips label="Aktif" />
            </StatusSpan>
          </h4>
        </Centered>
        <Centered>
          <h4 style={{color: '#4F4F4F'}}>
          Jenis Praktikum: <b>{this.props.content.jenis_praktikum}</b>
          </h4>
        </Centered>
        <GrayLine />
        <br></br>
        <h3>
          <b>{this.props.content.nama_laporan}</b>
        </h3>
        <br></br>
        <Row>
          <Col sm="4">
            <p>Deadline</p>
            <p>Waktu tersisa</p>
            <p>Terakhir Diubah</p>
          </Col>
          <Col sm="8">
            <p>: {deadlineStr}</p>
            <p>: {txtSisaDeadline}</p>
            <p>: {lastChangedStr}</p>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="4">
            <p>Nama Lembaga</p>
            <p>Bidang Kerja</p>
            <p>Periode Praktikum</p>
            <p>Jenis Pelayanan</p>
          </Col>
          <Col sm="8">
            <p>: {namaLembaga}</p>
            <p>: {bidangKerja}</p>
            <p>: {periodePraktikum}</p>
            <p>: {jenisPelayanan}</p>
          </Col>
        </Row>

        <br></br>
        {this.props.content.laporan_akhir ?
          <>
            <Row>
              <Col sm="4">
                <p>Laporan Akhir:</p>
              </Col>
            </Row>
            <Row>
              <DocsImage src={DocsIcon} alt='docs'/>
              <StatusSpan style={{marginTop: '16px'}}>
                <h4>{this.getFileName(this.props.content.laporan_akhir)}</h4>
              </StatusSpan>
              <Col sm="2">
              </Col>
              <Col sm="10">
                <Link target='_blank' href={this.props.content.laporan_akhir}>
                  <StyledButton secondary>Preview</StyledButton>
                </Link>
                <a href={this.props.content.laporan_akhir} download>
                  <StyledButton
                    primary
                  >
                      Download
                  </StyledButton>
                </a>
              </Col>
            </Row>
          </> : <Row>
            <Col sm="4">
              <p>Laporan Akhir: belum tersedia</p>
            </Col>
          </Row>}

        <br></br>
        {this.props.content.profil_lembaga ?
          <>
            <Row>
              <Col sm="4">
                <p>Profil Lembaga:</p>
              </Col>
            </Row>
            <Row>
              <DocsImage src={DocsIcon} alt='docs'/>
              <StatusSpan style={{marginTop: '16px'}}>
                <h4>{this.getFileName(this.props.content.profil_lembaga)}</h4>
              </StatusSpan>
              <Col sm="2">
              </Col>
              <Col sm="10">
                <Link target='_blank' href={this.props.content.profil_lembaga}>
                  <StyledButton secondary>Preview</StyledButton>
                </Link>
                <Link target='_blank' href={this.props.content.profil_lembaga}>
                  <StyledButton
                    primary
                  >
                        Download
                  </StyledButton>
                </Link>
              </Col>
            </Row>
          </> : <Row>
            <Col sm="4">
              <p>Profil Lembaga: belum tersedia</p>
            </Col>
          </Row>}

        <br></br>
        <Row>
          <Col sm="4">
            <p>Nilai Supervisor Sekolah</p>
            <p>Nilai Supervisor Lembaga</p>
          </Col>
          <Col sm="8">
            <p>: {nilaiSupvSekolah}</p>
            <p>: {nilaiSupvLembaga}</p>
          </Col>
        </Row>
        {this.props.content.laporan_akhir && this.props.content.profil_lembaga ? (
          <Form className={'row'}>
            <FormGroup className={'col-12'}>
              <Label id="usernameId">Nilai:</Label>
              <StyledInput
                className={
                this.state.formErrors.nilai.length > 0 ? 'error' : null
                }
                type="number"
                name="nilai"
                placeholder="1-100"
                hint="masukkan skor dari 1-100"
                onChange={this.handleInputChange}
              />
              {this.state.formErrors.nilai.length > 0 && (
                <span className="errorMessage">
                  {this.state.formErrors.nilai}
                </span>
              )}
              <br></br>
              <Label id="usernameId">Umpan balik:</Label>
              <StyledTextArea
                name="umpan_balik"
                placeholder=""
                hint=""
                onChange={this.handleInputChange}
              >
                {this.props.content.umpan_balik}
              </StyledTextArea>
            </FormGroup>
            <FormGroup className={'col-8'}></FormGroup>
            <Button
              className={'col-3'}
              onClick={this.submitClick}
              color="primary"
            >
            Simpan
            </Button>
          </Form>
        ) : (
          null
        )}
      </>
    );
  }
}
