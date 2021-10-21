import React, {Component} from 'react';
import RiwayatSupervisor from '../../components/MKPPL/Riwayat/RiwayatSupervisor';
import EmptyState from '../../components/MKPPL/State/EmptyState';
import ErrorState from '../../components/MKPPL/State/ErrorState';
import LoadingState from '../../components/MKPPL/State/LoadingState';

const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-lembaga/praktikum-mahasiswa/riwayat-laporan/';

// Class to get all riwayat from API
// and return the result as a component
export default class RiwayatSupervisorLembaga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      daftarRiwayat: [],
    };
  }

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
      const awaitResponse = await fetch(URL, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const daftarRiwayat = data.riwayat_laporan_siswa;
            this.setState({
              daftarRiwayat,
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

  render() {
    const {error, isLoaded, daftarRiwayat} = this.state;
    let data = [];
    if (daftarRiwayat) {
      const notNullData = [].concat(daftarRiwayat)
          .filter((a) => a.waktu_submisi !== null);
      const notScoredData = notNullData.filter((a) => a.skor_laporan_lembaga === -1)
          .sort((b, c) => b.waktu_submisi < c.waktu_submisi ? 1 : -1);
      const scoredData = notNullData.filter((a) => a.skor_laporan_lembaga !== -1)
          .sort((b, c) => b.waktu_submisi < c.waktu_submisi ? 1 : -1);
      data = [].concat(notScoredData, scoredData);
    }

    if (error) {
      return <ErrorState/>;
    } else if (!isLoaded) {
      return <LoadingState/>;
    } else if (!daftarRiwayat) {
      return <ErrorState/>;
    } else if (data.length === 0) {
      return <EmptyState/>;
    } else {
      return (
        <>
          {data.map((riwayat, index) =>
            <RiwayatSupervisor
              key={index}
              nama={riwayat.mahasiswa.user.full_name}
              nama_laporan={riwayat.nama_laporan}
              waktu_submisi={riwayat.waktu_submisi}
              skor={riwayat.skor_laporan_lembaga}
              url={`/spv-lembaga/penilaian/lihat/${riwayat.mahasiswa.user.username}/`}/>,
          )}
        </>
      );
    }
  }
}
