import PropTypes from 'prop-types';
import React, {Component} from 'react';
import './AksesKontrol.css';
import Box from './Box';
import {Row, Container} from 'reactstrap';
import {StyledButton} from '../../components/MKPPL/Button/Button';

export default class AksesKontrol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileMahasiswa: [],
      fileDosen: [],
      mahasiswaKosong: true,
      dosenKosong: true,
    };
    this.hapusMahasiswa = this.hapusMahasiswa.bind(this);
    this.hapusDosen = this.hapusDosen.bind(this);
  }

  fetchDataFromServerMahasiswa() {
    const formData = new FormData();
    console.log('masuk mahasiswa 1');
    try {
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      formData.append('file', this.state.fileMahasiswa[0]);
      console.log('masuk fetch mahasiswa');
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: bearer,
          Accept: 'application/json',
        },
        body: formData,

      };
      const response = fetch(
          'http://ppl-berkah-backend.herokuapp.com/api/v1/administrator/kelola-user/mahasiswa/upload/excel/',
          requestOptions,
      )
          .then((response) => response.json())
          .then((data) => {
            if (data.status_code === 201) {
              console.log('berhasil deh');
              this.setState({mahasiswaKosong: false});
            }
          });
    } catch (error) { }
  }

  fetchDataFromServerDosen() {
    const formData = new FormData();
    console.log('fetch 1 dosen');
    try {
      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      formData.append('file', this.state.fileDosen[0]);
      console.log('masuk fetch dosen');
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: bearer,
          Accept: 'application/json',
        },
        body: formData,

      };
      const response = fetch(
          'http://ppl-berkah-backend.herokuapp.com/api/v1/administrator/kelola-user/dosen/upload/excel/',
          requestOptions,
      )
          .then((response) => response.json())
          .then((data) => {
            if (data.status_code === 201) {
              console.log('berhasil deh');
              this.setState({dosenKosong: false});
            }
          });
    } catch (error) {
      console.log(error);
    }
  }

    setFileMahasiswa = (file) => {
      this.setState({fileMahasiswa: file});
      this.fetchDataFromServerMahasiswa();
      this.setState({mahasiswaKosong: false});
      console.log('berhasil mahasiswa');
      console.log(this.state.fileMahasiswa);
    };

    setFileDosen = (file) => {
      this.setState({fileDosen: file});
      this.fetchDataFromServerDosen();
      this.setState({dosenKosong: false});
      console.log('berhasil dosen');
      console.log(this.state.fileDosen);
    };

    boxMahasiswa = () => {
      if (this.state.mahasiswaKosong) {
        return (
          <Box setFiles={this.setFileMahasiswa} />
        );
      }
    }

    boxDosen = () => {
      if (this.state.dosenKosong) {
        return (
          <Box setFiles={this.setFileDosen} />
        );
      }
    }

    hapusMahasiswa() {
      this.setState({fileMahasiswa: []});
      this.setState({mahasiswaKosong: true});
    }

    hapusDosen() {
      this.setState({fileDosen: []});
      this.setState({dosenKosong: true});
    }

    render() {
      return (
        <>
          <div className='header'>
            <p className='title'>Input Data Mahasiswa Praktikum <b>(Format.xlsx)</b></p>
            {this.boxMahasiswa()}
            {this.state.fileMahasiswa.map((file, index) => (
              <Container>
                <Row>
                  <div key={index}>
                    <p>{file.name}</p>
                    <div className='text-right'>
                      <StyledButton primary onClick={this.hapusMahasiswa}> Hapus </StyledButton>
                    </div>
                  </div>
                </Row>
              </Container>
            ))}
          </div>
          <div className='header'>
            <p className='title'>Input Data Dosen (Koordinator Praktikum & Supervisor Sekolah) <b>(Format.xlsx)</b></p>
            {this.boxDosen()}
            {this.state.fileDosen.map((file, index) => (
              <Container>
                <Row>
                  <div key={index}>
                    <p>{file.name}</p>
                    <div className='text-right'>
                      <StyledButton primary onClick={this.hapusDosen}> Hapus </StyledButton>
                    </div>
                  </div>
                </Row>
              </Container>
            ))
            }
          </div>
        </>
      );
    }
}

AksesKontrol.propTypes = {
  api: PropTypes.string,
};
