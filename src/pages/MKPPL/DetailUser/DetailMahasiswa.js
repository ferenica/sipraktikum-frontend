import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import ListDetailUser from './ListDetailUser';
import {StyledButton} from '../../../components/MKPPL/Button/Button';

const CenterText = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  /* identical to box height */
`;

const Wrapper = styled.div`
  width: 80%;
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
        to='/admin/daftar-pengguna'
        style={{padding: '24px'}}
      >
        <h6>&lt;  Kembali</h6>
      </Link>
    </>
  );
};

export default class DetailMahasiswa extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      full_name: '',
      lembaga: '',
      npm:'',
      jenis_praktikum:'',
      periode:'',
      supervisor_sekolah:'',
      supervisor_lembaga:'',
    };
  }

  namaSupervisorHandler = (item) => {
    if (item === null) {
      return '';
    } else {
      return item.user.full_name;
    }
  }

  namaLembagaHandler = (item) => {
    if (item === null) {
      return '';
    } else {
      return item.lembaga.nama;
    }
  }

  componentDidMount() {
    this.getDataMahasiswa();
  }
  
  getDataMahasiswa() {
    this.setState({
      username: this.props.data.mahasiswa.user.username,
      email: this.props.data.mahasiswa.user.email,
      full_name: this.props.data.mahasiswa.user.full_name,
      lembaga: this.namaLembagaHandler(this.props.data.mahasiswa.supervisor_lembaga),
      npm: this.props.data.mahasiswa.npm,
      periode: this.props.data.mahasiswa.periode.nama,
      jenis_praktikum: this.props.data.list_praktikum.jenis_praktikum,
      supervisor_sekolah: this.namaSupervisorHandler(this.props.data.mahasiswa.supervisor_sekolah),
      supervisor_lembaga: this.namaSupervisorHandler(this.props.data.mahasiswa.supervisor_lembaga),
    });
  }

  render() {
    return (
      <>
        <Back />
        <CenterText>{this.state.full_name}</CenterText>
        <Wrapper>
          <div style={{width: '100%'}}>
            <ListDetailUser 
              detail="NPM"
              value={this.state.npm}></ListDetailUser>
            <ListDetailUser 
              detail="Email"
              value={this.state.email}></ListDetailUser>
            <ListDetailUser 
              detail="Jenis Praktikum"
              value={this.state.jenis_praktikum}></ListDetailUser>
            <ListDetailUser 
              detail="Periode"
              value={this.state.periode}></ListDetailUser>
            <ListDetailUser 
              detail="Supervisor Sekolah"
              value={this.state.supervisor_sekolah}></ListDetailUser>
            <ListDetailUser 
              detail="Supervisor Lembaga"
              value={this.state.supervisor_lembaga}></ListDetailUser>
            <ListDetailUser 
              detail="Nama Lembaga"
              value={this.state.lembaga}></ListDetailUser>
          </div>
          <br></br>
          <center>
            <Link to={`/admin/kelola/mahasiswa/${this.state.username}/`}>
              <StyledButton secondary>Kelola</StyledButton>
            </Link>
          </center>
        </Wrapper>
      </>
    );
  }
}

DetailMahasiswa.propTypes = {
  data: PropTypes.object,
  role: PropTypes.string,
};
