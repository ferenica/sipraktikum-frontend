import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import ListDetailUser from './ListDetailUser';
import {StyledButton} from '../../../components/MKPPL/Button/Button';
import Chips from '../../../components/MKPPL/Chips/Chips';

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

const StatusSpan = styled.span`
  display: inline-block;
  margin-left: 8px;
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

export default class DetailSupervisorLembaga extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      full_name: '',
      lembaga: '',
      email: '',
      status:'',
      daftar_mahasiswa:[],
    };
  }

  componentDidMount() {
    this.getDataSupervisorLembaga();
  }
  
  getDataSupervisorLembaga() {
    this.setState({
      username: this.props.data.user.username,
      full_name: this.props.data.user.full_name,
      lembaga: this.props.data.user.lembaga,
      email: this.props.data.user.email,
      status: this.props.data.user.is_active,
      daftar_mahasiswa: this.props.data.mahasiswa,
    });
  }



  render() {
    const isActive = this.state.status;
    const daftarNamaMahasiswa = [];
    for (let i = 0; i < this.state.daftar_mahasiswa.length; i++) {
      daftarNamaMahasiswa.push(this.state.daftar_mahasiswa[i].user.full_name);
    }

    return (
      <>
        <Back />
        <CenterText>{this.state.full_name}</CenterText>
        <Wrapper>
          <div style={{width: '100%'}}>
            <ListDetailUser 
              detail="Status"
              value={
                <StatusSpan>
                  <Chips 
                    bool={isActive === true ? 'true' : 'false'} 
                    label={isActive === true ? 'aktif' : 'tidak aktif'} 
                  />
                </StatusSpan>}></ListDetailUser>
            <ListDetailUser 
              detail="Email"
              value={this.state.email}></ListDetailUser>
            <ListDetailUser 
              detail="Nama Lembaga"
              value={this.state.lembaga}></ListDetailUser>
            <ListDetailUser 
              detail="Mahasiswa Bimbingan"
              value=
              {daftarNamaMahasiswa.length ? <ul>{daftarNamaMahasiswa.map(d => <li key={d}>{d}</li>)}</ul> : 'Tidak Ada Mahasiswa'}>
              </ListDetailUser>            
          </div>
          <br></br>
          <center>
            <Link to={`/admin/kelola/supervisor-lembaga/${this.state.username}/`}>
              <StyledButton secondary>Kelola</StyledButton>
            </Link>
          </center>
        </Wrapper>
      </>
    );
  }
}

DetailSupervisorLembaga.propTypes = {
  data: PropTypes.object,
  role: PropTypes.string,
};
