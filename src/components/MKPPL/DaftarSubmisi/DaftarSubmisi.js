import React, {Component} from 'react';
import ProfileHeader from './../../ProfileHeader/ProfileHeader';
import {Link, useHistory} from 'react-router-dom';
import Loader from './../../../assets/MKPPL/Loader.gif';
import styled from 'styled-components';

const Back = () => {
  const history = useHistory();
  return (
    <>
      <Link onClick={() => history.goBack()}>&lt; Kembali</Link>
    </>
  );
};

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
export default class DaftarSubmisi extends Component {
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

    // async componentDidMount() {
    //   axios.get(this.props.api)
    //     .then(res => {
    //       const daftarLaporan = res.data;
    //       const userInfo = res.user;
    //       const praktikumInfo = res.praktikum;
    //       const mahasiswaInfo = res.mahasiswa;
    //       this.setState({
    //           daftarLaporan,
    //           userInfo,
    //           praktikumInfo,
    //           mahasiswaInfo,
    //           isLoaded: true
    //         });
    //       },
    //       (error) => {
    //         this.setState({
    //           isLoaded: true,
    //           error
    //         });
    //       }
    //     )
    // }
    /** */
    componentDidMount() {
      this.fetchDataFromServer();
    }
    /** */
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
            });
        return await awaitResponse;
      } catch (error) {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    }
    /** */
    render() {
      const {error, isLoaded, daftarLaporanMingguan, daftarLaporanAkhir, daftarBorang, userInfo, praktikumInfo, mahasiswaInfo} = this.state;

      if (error) {
        return <div>Mohon maaf terjadi kesalahan.<br/>(Error: {error.message})</div>;
      } else if (!isLoaded) {
        return (
          <>
            <LoaderGif src={Loader}/>
          </>
        );
      } else {
        return (
          <>
            <Back/>
            <br></br>
            <ProfileHeader laporan_mingguan={daftarLaporanMingguan} laporan_akhir={daftarLaporanAkhir} laporan_borang={daftarBorang} user={userInfo} mahasiswa={mahasiswaInfo} praktikum={praktikumInfo} path={window.location.pathname}/>
          </>
        );
      }
    }
}

