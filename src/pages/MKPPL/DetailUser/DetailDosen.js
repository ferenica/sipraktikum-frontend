import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import ListDetailUser from './ListDetailUser';
import {StyledButton} from '../../../components/MKPPL/Button/Button';
import convertRoleToURL from './../DaftarUser/ConvertRoleToUrl';

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

export default class DetailDosen extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      full_name: '',
      peran:'',
      daftar_mahasiswa: [],
    };
  }

  componentDidMount() {
    this.getDataDosen();
  }
  
  getDataDosen() {
    this.setState({
      username: this.props.data.user.username,
      email: this.props.data.user.email,
      full_name: this.props.data.user.full_name,
      peran: this.props.data.user.role,
      daftar_mahasiswa: this.props.data.mahasiswa,
    });
  }

  render() {
    const changedRole = convertRoleToURL(this.state.peran);
    const daftarNamaMahasiswa = [];
    if (this.state.daftar_mahasiswa !== undefined) {
      for (let i = 0; i < this.state.daftar_mahasiswa.length; i++) {
        daftarNamaMahasiswa.push(this.state.daftar_mahasiswa[i].user.full_name);
      }
    }
      
    
    return (
      <>
        <Back />
        <CenterText>{this.state.full_name}</CenterText>
        <Wrapper>
          <div style={{width: '100%'}}>
            <ListDetailUser 
              detail="Email"
              value={this.state.email}></ListDetailUser>
            <ListDetailUser 
              detail="Peran"
              value={this.state.peran}></ListDetailUser>
            {(() => {
            if (this.state.peran !== 'Administrator') {
              return (
                <ListDetailUser 
                  detail="Mahasiswa Bimbingan"
                  value=
                  {daftarNamaMahasiswa.length ? <ul>{daftarNamaMahasiswa.map(d => <li key={d}>{d}</li>)}</ul> : 'Tidak Ada Mahasiswa'}>
              </ListDetailUser>
              );
            }})()}              
          </div>
          <br></br>
          <center>
            <Link to={`/admin/kelola/${changedRole}/${this.state.username}/`}>
              <StyledButton secondary>Kelola</StyledButton>
            </Link>
          </center>
        </Wrapper>
      </>
    );
  }
}

DetailDosen.propTypes = {
  data: PropTypes.object,
  role: PropTypes.string,
};
