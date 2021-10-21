import React, {Component} from 'react';
import ProfileHeader from '../../ProfileHeader/ProfileHeaderKoor';
import {Link} from 'react-router-dom';
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
export default class DaftarSubmisiKoor extends Component {
    state = {
      error: null,
      isLoaded: false,
      daftarLaporanMingguan: [],
      daftarLaporanAkhir: [],
      daftarBorang: [],
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
              console.log(data);
              console.log(data.laporan_mingguan);
              const daftarLaporanMingguan = data.laporan_mingguan;
              const daftarLaporanAkhir = data.laporan_akhir;
              const daftarBorang = data.laporan_borang;
              const userInfo = data.user;
              const praktikumInfo = data.praktikum;
              const mahasiswaInfo = data.mahasiswa;
              this.setState({
                daftarLaporanMingguan,
                daftarLaporanAkhir,
                daftarBorang,
                userInfo,
                praktikumInfo,
                mahasiswaInfo,
                isLoaded: true,
              });
              console.log(this.state.isLoaded);
            });
        return await awaitResponse;
      } catch (error) {
        this.setState({
          isLoaded: true,
          error,
        });
      }
      console.log(this.state.daftarLaporanMingguan);
    }

    /**
     *
     */
    render() {
      const {error, isLoaded, daftarLaporanMingguan, daftarLaporanAkhir, daftarBorang, userInfo, praktikumInfo, mahasiswaInfo} = this.state;
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
              <Link color="#FF8326" style={{textDecoration: 'underline', color: '#FF8326', fontWeight: 'bold'}}>
                {this.state.mahasiswaInfo.user.full_name}
              </Link>
            </Breadcrumbs>
            <br></br>
            <ProfileHeader laporan_mingguan={daftarLaporanMingguan} laporan_akhir={daftarLaporanAkhir} laporan_borang={daftarBorang} user={userInfo} mahasiswa={mahasiswaInfo} praktikum={praktikumInfo} path={window.location.pathname} />
          </>
        );
      }
    }
}

