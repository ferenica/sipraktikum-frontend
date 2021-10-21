import './OnBoarding.css';
import React, {Component} from 'react';
import LembagaSearch from './LembagaSearch/LembagaSearch';
import Navbar from '../../components/Navbar/Navbar';
import PropTypes from 'prop-types';
import welcomeImage from '../../assets/welcomeSectionImage.png';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {styled} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

/**
 * The main page
 */
class OnBoarding extends Component {
  redirectKurikulum = () => {
    if (localStorage.getItem('login_token') != null && localStorage.getItem('role') != null) {
      if (localStorage.getItem('role') !== 'Administrator' || localStorage.getItem('role') !== 'Supervisor Lembaga') {
        window.location = '/tentang-praktikum';
      }
    } else {
      alert('Mohon login terlebih dahulu');
    }
  }

  /**
   * @return {*} page
   */
  render() {
    const StyledContainer = styled(Container)({
      textAlign: 'center',
      marginTop: '1.5rem',
    });

    const StyledDivider = styled(Divider)({
      backgroundColor: '#ff8326',
      width: '20%',
      height: '4px',
      margin: 'auto',
    });

    return (
      <div>
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin}
          isDosen={this.props.isDosen} />
        <div style={{textAlign: 'center', backgroundImage: 'url('+welcomeImage+')', backgroundSize: '100%', opacity: '0.90'}}>
          <StyledContainer>
            <h3 style={{color: 'white'}}>SELAMAT DATANG</h3>
          </StyledContainer>
          <Container>
            <StyledDivider />
          </Container>
          <StyledContainer>
            <h1 style={{color: 'white'}}>Mata Kuliah Praktikum<br></br>Kesejahteraan Sosial FISIP UI</h1>
          </StyledContainer>
          <StyledContainer>
            <h4 style={{color: 'white'}}>
            Praktikum adalah proses belajar yang harus dilakukan oleh mahasiswa Departemen Ilmu Kesejahteraan Sosial, untuk menerapkan ilmu kesejahteraan sosial (pengetahuan, nilai, etika dan keterampilan) dalam melakukan suatu intervensi (perubahan berencana) di dalam kehidupan nyata (lembaga/organisasi), di bawah bimbingan seorang supervisor.
            </h4>
          </StyledContainer>
          <StyledContainer>
            <Button
              style={{marginBottom: '1.5rem'}}
              variant='contained'
              color='primary'
              onClick={this.redirectKurikulum}>
              Kurikulum Praktikum
            </Button>
          </StyledContainer>
        </div>
        <div style={{textAlign: 'center'}}>
          <StyledContainer>
            <h2>Mitra Lembaga</h2>
          </StyledContainer>
          <StyledContainer>
            <h3>
              Daftar lembaga yang sudah bekerjasama dengan Departemen Ilmu Kesejahteraan Sosial<br>
              </br>untuk melaksanakan Mata Kuliah Praktikum 1 dan Praktikum 2 dalam waktu 5 tahun terakhir
            </h3>
          </StyledContainer>
        </div>
        <LembagaSearch isAdmin={this.props.isAdmin}/>
      </div>
    );
  }
}

export default OnBoarding;

OnBoarding.propType = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isDosen: PropTypes.bool,
};
