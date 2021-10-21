import styled from 'styled-components';
import React, {Component} from 'react';

import Dropzone from 'react-dropzone';
import Icon from '../../assets/MKPPL/upload.png';
import {StyledButton, DisabledButton} from '../../components/MKPPL/Button/Button';
import Tooltip from '@material-ui/core/Tooltip';

// Base URl end point to save changed data to backend
const postURL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-sekolah/praktikum-mahasiswa/upload-template-borang/';
const getURL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-sekolah/praktikum-mahasiswa/get-template-borang/';

// Tooltip message
const tooltipMessage = 'Semua template borang akan dihapus';
const submitMessage = 'Data berhasil diupload dan disimpan';

// Options for date time local format
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

// Styled components
const Header = styled.div`
  text-align: center;
  margin: 24px;
`;

const InputArea = styled.div`
  padding: 16px;
  border-style: dashed;
  border-width: 1px;
  border-color: #F15B15;
  background-color:#F2F2F2;
  border-radius: 5px;
  margin-bottom: 20px;
`;

/**
 * Post current change of template borang using POST method
 * @param {dict} data The dictionary for changed data.
 * @return {response} The status is 201 when succeded.
 * Location will reload adjusted with the changed data
 */
async function onSubmit(data) {
  try {
    const bearer = 'Bearer ' + localStorage.getItem('login_token');
    const requestOptions = {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Authorization': bearer},
      body: data,
    };

    const response = await fetch(postURL, requestOptions);
    if (response.status === 201) {
      alert(submitMessage);
      window.location.reload(false);
    }
  } catch (error) {
    alert('Data tidak berhasil diubah\n\n' + error);
  }
}

/**
 * Class that accept input files of
 * template borang penilaian supervisor sekolah,
 * supervisor lembaga, & perkuliahan
 * @param {string} data The data consists of inputted file
 * @param {string} event The event when input change
 */
export default class KelolaBorang extends Component {
  state = {
    borangSpvSekolah: null,
    borangSpvLembaga: null,
    borangPerkuliahan: null,
  };

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
      const awaitResponse = await fetch(getURL, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const borangSpvSekolah = data.data.t_borang_supv_sekolah;
            const borangSpvLembaga = data.data.t_borang_supv_lembaga;
            const borangPerkuliahan = data.data.t_borang_supv_perkuliahan;

            this.setState({
              borangSpvSekolah,
              borangSpvLembaga,
              borangPerkuliahan,
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

  onFileChange = (event) => {
    const value = event.target.files[0];
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  onFileReset = () => {
    this.setState({
      borangSpvSekolah: null,
      borangSpvLembaga: null,
      borangPerkuliahan: null,
    });
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append('template_borang_supv_sekolah', this.state.borangSpvSekolah);
    formData.append('template_borang_supv_lembaga', this.state.borangSpvLembaga);
    formData.append('template_borang_supv_perkuliahan', this.state.borangPerkuliahan);

    onSubmit(formData);
  };

  getFileName(fileUrl) {
    if (fileUrl == null) {
      const fileName = '';
      return fileName;
    }
    const splitUrl = fileUrl.split('/');
    const fileName = splitUrl[splitUrl.length - 1];
    return fileName;
  }

  fileData = (data) => {
    if (typeof data === 'string') {
      return (
        <div style={{marginBottom: '20px'}}>
          <a href={data} target="_blank">
            {this.getFileName(data)}
          </a>
        </div>
      );
    } else {
      const now = new Date();
      return (
        <div style={{marginBottom: '20px'}}>
          <h6>Nama File: <b>{data.name}</b></h6>
          <h6>Waktu Upload:{' '}
            <b>{now.toLocaleDateString('id-ID', options)}</b>
          </h6>
        </div>
      );
    }
  };

  render() {
    const {
      borangSpvSekolah,
      borangSpvLembaga,
      borangPerkuliahan,
    } = this.state;

    return (
      <div>
        <Header>
          <h2>Template Borang Penilaian Untuk Mahasiswa</h2>
          <h5>Berikut adalah master template borang penilaian yang
            akan digunakan semua mahasiswa supervisi setelah submisi
          <b> Borang Penilaian Praktikum</b> dirilis oleh
            Supervisor Sekolah</h5>
        </Header>

        <div>
          <h3>Template Borang Penilaian Supervisor Sekolah</h3>
          {!borangSpvSekolah ?
            <Dropzone>
              {({getRootProps, getInputProps}) => (
                <InputArea {...getRootProps()}>
                  <input {...getInputProps()}
                    name='borangSpvSekolah'
                    onChange={this.onFileChange}
                  />
                  <div className='text-center'>
                    <img src={Icon} alt=""/>
                    <h2>Drag file template borang</h2>
                    <h6>atau</h6>
                    <StyledButton secondary>
                      Upload File
                    </StyledButton>
                  </div>
                </InputArea>
              )}
            </Dropzone> : this.fileData(borangSpvSekolah)
          }

          <h3>Template Borang Penilaian Supervisor Lembaga</h3>
          {!borangSpvLembaga ?
            <Dropzone>
              {({getRootProps, getInputProps}) => (
                <InputArea {...getRootProps()}>
                  <input {...getInputProps()}
                    name='borangSpvLembaga'
                    onChange={this.onFileChange}
                  />
                  <div className='text-center'>
                    <img src={Icon} alt=""/>
                    <h2>Drag file template borang</h2>
                    <h6>atau</h6>
                    <StyledButton secondary>
                      Upload File
                    </StyledButton>
                  </div>
                </InputArea>
              )}
            </Dropzone> : this.fileData(borangSpvLembaga)
          }

          <h3>Template Borang Penilaian Perkuliahan</h3>
          {!borangPerkuliahan ?
            <Dropzone>
              {({getRootProps, getInputProps}) => (
                <InputArea {...getRootProps()}>
                  <input {...getInputProps()}
                    name='borangPerkuliahan'
                    onChange={this.onFileChange}
                  />
                  <div className='text-center'>
                    <img src={Icon} alt=""/>
                    <h2>Drag file template borang</h2>
                    <h6>atau</h6>
                    <StyledButton secondary>
                      Upload File
                    </StyledButton>
                  </div>
                </InputArea>
              )}
            </Dropzone> : this.fileData(borangPerkuliahan)
          }

          <div style={{position: 'relative', width: '100%', height: '60px', marginTop: '24px'}}>
            <div style={{position: 'absolute', right: '0'}}>
              <Tooltip title={tooltipMessage} arrow>
                <StyledButton secondary
                  onClick={this.onFileReset}>
                  Hapus
                </StyledButton>
              </Tooltip>
              {borangSpvSekolah && borangSpvLembaga && borangPerkuliahan ?
                <StyledButton primary onClick={this.onFileUpload}>
                  Simpan
                </StyledButton> :
                <DisabledButton>
                  Simpan
                </DisabledButton>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
