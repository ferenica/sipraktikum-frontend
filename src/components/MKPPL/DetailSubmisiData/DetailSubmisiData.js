import React, {Component} from 'react';
import styled from 'styled-components';
import Chips from './../Chips/Chips';
import {Row, Col} from 'react-bootstrap';
import {Form, FormGroup, Label, Button} from 'reactstrap';
import {Redirect} from 'react-router-dom';

// Styled components for search bar
const StyledInput = styled.input`
  border: 0;
  flex: 1;
  background-color: #f2f2f2;
  width: 100%;
  margin-bottom: 12px;
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

/**
 * Class to filter data that matches with search input
 * and return list of data if it's valid
 * @param {event} e
 */
export default class DetailSubmisiData extends Component {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      nilai: '',
      formErrors: {nilai: ''},
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
  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let nilaiValid = this.state.nilaiValid;

    switch (fieldName) {
      case 'nilai':
        console.log(value);
        nilaiValid = value.match(/^[1-9][0-9]?$|^100$/i) != null;
        console.log(nilaiValid);
        fieldValidationErrors.nilai = nilaiValid ?
          '' :
          'Nilai harus dari 1 sampai 100';
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
      console.log(nilai);
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
        body: JSON.stringify({
          skor: nilai,
        }),
      };
      console.log(requestOptions);
      await fetch(
          'http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-sekolah/laporan-mingguan-mahasiswa/nilai/' +
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
      this.setState({isSuccess: false});
    }
  }

  /**
   * @return {Component}
   */
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
            <p>Link Google Drive</p>
            <p>Penilaian sekolah</p>
          </Col>
          <Col sm="8">
            <p>: {deadlineStr}</p>
            <p>: {txtSisaDeadline}</p>
            <p>: {lastChangedStr}</p>
            <p>: {this.props.content.link_submisi ? (
                <a href={this.props.content.link_submisi}>
                  &nbsp;{this.props.content.link_submisi}
                </a>
              ) : (
                <>Belum tersedia</>
              )}

            </p>
            <p>: {nilaiSupvSekolah}</p>
          </Col>
        </Row>
        {this.props.content.link_submisi ? (
          <Form className={'row'}>
            <FormGroup className={'col-12'}>
              <Label id="usernameId">Nilai:</Label>
              <StyledInput
                className={
                this.state.formErrors.nilai.length > 0 ? 'error' : null
                }
                type="text"
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
