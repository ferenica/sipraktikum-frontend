import React, {Component} from 'react';
import DetailSubmisiLaporanBorangData from './../../../components/MKPPL/DetailSubmisiData/DetailSubmisiLaporanBorangData';
import DetailSubmisiLaporanBorangDataKoor from './../../../components/MKPPL/DetailSubmisiData/DetailSubmisiLaporanBorangDataKoor';
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
/** */
export default class DetailSubmisiLaporanBorang extends Component {
    state = {
      error: null,
      isLoaded: false,
      daftarLaporan: null,
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
    /** */
    render() {
      const {error, isLoaded, daftarLaporan, userInfo, mahasiswaInfo} = this.state;

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
            {this.props.action === 'koordinator-kuliah' ?
              <DetailSubmisiLaporanBorangDataKoor content={daftarLaporan} user={userInfo} mahasiswa={mahasiswaInfo} path={window.location.pathname}/>
              : <DetailSubmisiLaporanBorangData content={daftarLaporan} user={userInfo} mahasiswa={mahasiswaInfo} path={window.location.pathname}/>
            }
          </>
        );
      }
    }
}

