import React, {Component} from 'react';
import RiwayatSupervisor
  from '../../components/MKPPL/Riwayat/RiwayatSupervisor';
import EmptyState from '../../components/MKPPL/State/EmptyState';
import ErrorState from '../../components/MKPPL/State/ErrorState';
import LoadingState from '../../components/MKPPL/State/LoadingState';

const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-sekolah/praktikum-mahasiswa/riwayat-laporan/';

/**
 * Get all riwayat from API and return the result as a component
 */
export default class RiwayatSupervisorSekolah extends Component {
  /**
   * @constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      daftarRiwayat: [],
      dataMingguan: [],
      dataAkhir: [],
      dataBorang: [],
    };
  }

  /**
   * Run after render
   */
  componentDidMount() {
    this.fetchDataFromServer();
  }

  /**
   * Fetch data from API
   */
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
            const daftarRiwayat = data;
            const dataMingguan = daftarRiwayat.riwayat_laporan_siswa;
            const dataAkhir = daftarRiwayat.riwayat_laporan_akhir;
            const dataBorang = daftarRiwayat.riwayat_laporan_borang;
            this.setState({
              daftarRiwayat,
              dataMingguan,
              dataAkhir,
              dataBorang,
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
   * @return {Component}
   */
  render() {
    const {
      error,
      isLoaded,
      dataMingguan,
      dataAkhir,
      dataBorang,
    } = this.state;

    // Combine all data laporan
    const arrayLaporan = [];
    dataMingguan.map((laporan) =>
      arrayLaporan.push({laporan, flag: 'penilaian'}));
    
    dataAkhir.map((laporan) =>
      arrayLaporan.push({laporan, flag: 'penilaian-laporan-akhir'}));
    
    dataBorang.map((laporan) =>
      arrayLaporan.push({laporan, flag: 'penilaian-laporan-borang'}));
    

    // Filter data by not null and score value, and sort it descending by date
    const notNullData = [].concat(arrayLaporan)
        .filter((a) => a.laporan.waktu_submisi !== null);
    const notScoredData = notNullData.filter((a) => a.laporan.skor_laporan_sekolah === -1)
        .sort((b, c) => b.laporan.waktu_submisi < c.laporan.waktu_submisi ? 1 : -1);
    const scoredData = notNullData.filter((a) => a.laporan.skor_laporan_sekolah !== -1)
        .sort((b, c) => b.laporan.waktu_submisi < c.laporan.waktu_submisi ? 1 : -1);
    const data = [].concat(notScoredData, scoredData);

    if (error) {
      return <ErrorState/>;
    } else if (!isLoaded) {
      return <LoadingState/>;
    } else if (data.length === 0) {
      return <EmptyState/>;
    } else {
      return (
        <>
          {data.map((riwayat, index) =>
            <RiwayatSupervisor
              key={index}
              nama={riwayat.laporan.mahasiswa.user.full_name}
              nama_laporan={riwayat.laporan.nama_laporan}
              waktu_submisi={riwayat.laporan.waktu_submisi}
              skor={riwayat.laporan.skor_laporan_sekolah}
              url={`/spv-sekolah/${riwayat.flag}/detail/${riwayat.laporan.mahasiswa.user.username}/${riwayat.laporan.id}`}
            />,
          )}
        </>
      );
    }
  }
}
