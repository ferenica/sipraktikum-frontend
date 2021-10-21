import React, {Component} from 'react';
import DetailSubmisiData from './../../../components/MKPPL/DetailSubmisiData/DetailSubmisiDataKoor';
import {Link, useHistory} from 'react-router-dom';
import Loader from './../../../assets/MKPPL/Loader.gif';
import styled from 'styled-components';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const LoaderGif = styled.img`
  display: block;
  margin-top: 48px;
  margin-bottom: 16px;
  margin-left: auto;
  margin-right: auto;
  height: 16vh;
`;

// Class to get all mahasiswa from API
// and return the result as a component
/**
 *
 */
export default class DetailSubmisiKoor extends Component {
    state = {
      error: null,
      isLoaded: false,
      daftarLaporan: null,
      userInfo: null,
      praktikumInfo: null,
      mahasiswaInfo: null,
    }
    /**
     *
     */
    componentDidMount() {
      this.fetchDataFromServer();
    }

    /**
     *
     */
    async fetchDataFromServer() {
      try {
        const bearer = 'Bearer ' + localStorage.getItem('login_token');
        const requestOptions = {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'Authorization': bearer},
        };
        const awaitResponse = await fetch(this.props.api, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              const daftarLaporan = data.data;
              const userInfo = data.user;
              const mahasiswaInfo = data.mahasiswa;
              this.setState({
                daftarLaporan,
                userInfo,
                mahasiswaInfo,
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

    /**
     *
     */
    render() {
      const Back = () => {
        const history = useHistory();
        return (
          <>
            <Link onClick={() => history.goBack()}>{this.state.mahasiswaInfo.user.full_name}</Link>
          </>
        );
      };
      console.log('ini sampe detail submisi Koor');
      const {error, isLoaded, daftarLaporan, userInfo, mahasiswaInfo} = this.state;

      if (error) {
        return <div>Mohon maaf terjadi kesalahan.<br />(Error: {error.message})</div>;
      } else if (!isLoaded) {
        return (
          <>
            <LoaderGif src={Loader} />
          </>
        );
      } else {
        return (
          <>
            <br></br>
            <Breadcrumbs separator=">" aria-label="breadcrumb">
              <div style={{color: '#AAAAAA'}}>Detail Mahasiswa</div>
              {/* <Back/> */}
              <Back style={{color: '#AAAAAA'}}/>
              <Link color="#FF8326" style={{textDecoration: 'underline', color: '#FF8326', fontWeight: 'bold'}}>
                {daftarLaporan.nama_laporan}
              </Link>
            </Breadcrumbs>
            <br></br>
            <DetailSubmisiData content={daftarLaporan} user={userInfo} mahasiswa={mahasiswaInfo} path={window.location.pathname} />
          </>
        );
      }
    }
}

