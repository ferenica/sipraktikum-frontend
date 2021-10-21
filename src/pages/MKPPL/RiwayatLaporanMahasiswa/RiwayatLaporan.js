import React, {Component} from 'react';
import axios from 'axios';
import RiwayatLaporanCard from './RiwayatLaporanCard';
import {countTimeLeft} from './../DetailProgressMahasiswa/utils.js';

import EmptyState from './../../../components/MKPPL/State/EmptyState';
import LoadingState from './../../../components/MKPPL/State/LoadingState';

/**
 * Riwayat Laporan yang dipakai di Riwayat Supervisi
 */
export default class RiwayatLaporan extends Component {
  /**
   * @constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      riwayat: [],
      loading: false,
    };
  }

  /**
   * Run after first render
   */
  componentDidMount() {
    axios
        .get(
            'http://ppl-berkah-backend.herokuapp.com/api/v1/mahasiswa/praktikum/riwayat-laporan/',
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('login_token')}`,
              },
            },
        )
        .then((response) => {
          console.log(response.data);
          console.log(response.data.riwayat_laporan_siswa);
          let riwayatLaporan = [];
          this.setState(
              {
                riwayatMahasiswaLaporanAkhir:
              response.data.riwayat_laporan_siswa.laporan_akhir,
                riwayatMahasiswaLaporanBorang:
              response.data.riwayat_laporan_siswa.laporan_borang,
                riwayatMahasiswaLaporanMinggu:
              response.data.riwayat_laporan_siswa.laporan_mingguan,
                riwayatLembagaLaporanAkhir:
              response.data.riwayat_supv_lembaga.laporan_akhir,
                riwayatLembagaLaporanBorang:
              response.data.riwayat_supv_lembaga.laporan_borang,
                riwayatLembagaLaporanMinggu:
              response.data.riwayat_supv_lembaga.laporan_mingguan,
                riwayatSekolahLaporanAkhir:
              response.data.riwayat_supv_sekolah.laporan_akhir,
                riwayatSekolahLaporanBorang:
              response.data.riwayat_supv_sekolah.laporan_borang,
                riwayatSekolahLaporanMinggu:
              response.data.riwayat_supv_sekolah.laporan_mingguan,
                namaMahasiswa: response.data.profile.user.full_name,
                namaSupvLembaga:
              response.data.profile.supervisor_lembaga.user.full_name,
                namaSupvSekolah:
              response.data.profile.supervisor_sekolah.user.full_name,
              },
              () => {
                this.state.riwayatMahasiswaLaporanAkhir.map((laporan) => {
                  laporan.jenis = 'Akhir';
                  if (
                    laporan.waktu_submisi ||
                laporan.waktu_nilai_supv_lembaga ||
                laporan.waktu_nilai_supv_sekolah
                  ) {
                    // console.log(joined);
                    riwayatLaporan = riwayatLaporan.concat(laporan);
                    // console.log(joined);
                    // this.setState({riwayat: joined});
                    // console.log(this.state.riwayat);
                  }
                });
                this.state.riwayatMahasiswaLaporanBorang.map((laporan) => {
                  laporan.jenis = 'Borang';
                  if (
                    laporan.waktu_submisi ||
                laporan.waktu_nilai_supv_lembaga ||
                laporan.waktu_nilai_supv_sekolah
                  ) {
                    riwayatLaporan = riwayatLaporan.concat(laporan);
                    // this.setState({riwayat: joined});
                    // console.log(this.state.riwayat);
                  }
                });
                this.state.riwayatMahasiswaLaporanMinggu.map((laporan) => {
                  laporan.jenis = 'Minggu';
                  if (
                    laporan.waktu_submisi ||
                laporan.waktu_nilai_supv_lembaga ||
                laporan.waktu_nilai_supv_sekolah
                  ) {
                    riwayatLaporan = riwayatLaporan.concat(laporan);
                    // this.setState({riwayat: joined});
                  }
                });
                this.state.riwayatLembagaLaporanMinggu.map((laporan) => {
                  laporan.jenis = 'Minggu';
                  if (
                    laporan.waktu_submisi ||
                laporan.waktu_nilai_supv_lembaga ||
                laporan.waktu_nilai_supv_sekolah
                  ) {
                    riwayatLaporan = riwayatLaporan.concat(laporan);
                    // this.setState({riwayat: joined});
                  }
                });
                this.state.riwayatLembagaLaporanAkhir.map((laporan) => {
                  laporan.jenis = 'Akhir';
                  if (
                    laporan.waktu_submisi ||
                laporan.waktu_nilai_supv_lembaga ||
                laporan.waktu_nilai_supv_sekolah
                  ) {
                    riwayatLaporan = riwayatLaporan.concat(laporan);
                    // this.setState({riwayat: joined});
                  }
                });
                this.state.riwayatLembagaLaporanBorang.map((laporan) => {
                  laporan.jenis = 'Borang';
                  if (
                    laporan.waktu_submisi ||
                laporan.waktu_nilai_supv_lembaga ||
                laporan.waktu_nilai_supv_sekolah
                  ) {
                    riwayatLaporan = riwayatLaporan.concat(laporan);
                    // this.setState({riwayat: joined});
                  }
                });
                this.state.riwayatSekolahLaporanAkhir.map((laporan) => {
                  laporan.jenis = 'Akhir';
                  if (
                    laporan.waktu_submisi ||
                laporan.waktu_nilai_supv_lembaga ||
                laporan.waktu_nilai_supv_sekolah
                  ) {
                    riwayatLaporan = riwayatLaporan.concat(laporan);
                    // this.setState({riwayat: joined});
                  }
                });
                this.state.riwayatSekolahLaporanBorang.map((laporan) => {
                  laporan.jenis = 'Borang';
                  if (
                    laporan.waktu_submisi ||
                laporan.waktu_nilai_supv_lembaga ||
                laporan.waktu_nilai_supv_sekolah
                  ) {
                    riwayatLaporan = riwayatLaporan.concat(laporan);
                    // this.setState({riwayat: joined});
                  }
                });
                this.state.riwayatSekolahLaporanMinggu.map((laporan) => {
                  laporan.jenis = 'Minggu';
                  if (
                    laporan.waktu_submisi ||
                laporan.waktu_nilai_supv_lembaga ||
                laporan.waktu_nilai_supv_sekolah
                  ) {
                    riwayatLaporan = riwayatLaporan.concat(laporan);
                    // this.setState({riwayat: joined});
                  }
                });
                console.log(riwayatLaporan);
                this.state.riwayat.sort(function(a, b) {
                  const aa =
                a.waktu_submisi ||
                a.waktu_nilai_supv_lembaga ||
                a.waktu_nilai_supv_sekolah;
                  const bb =
                b.waktu_submisi ||
                b.waktu_nilai_supv_lembaga ||
                b.waktu_nilai_supv_sekolah;
                  const x = countTimeLeft(aa, aa);
                  const xx = x.deadline;
                  const y = countTimeLeft(bb, bb);
                  const yy = y.deadline;
                  return -1 * (xx - yy);
                });
                this.setState({loading: true});
              },
          );
          this.setState({riwayat: riwayatLaporan});
        });
  }

  /**
   * @return {Component}
   */
  render() {
    if (!this.state.loading) {
      return <LoadingState/>;
    } else if (this.state.riwayat.length === 0 || !this.state.riwayat) {
      return <EmptyState/>;
    } else {
      return (
        <div>
          {this.state.riwayat.map((laporan) => {
            if (laporan.waktu_submisi) {
              if (laporan.jenis === 'Akhir') {
                return (
                  <RiwayatLaporanCard
                    nama={this.state.namaMahasiswa}
                    waktu_submisi={laporan.waktu_submisi}
                    nama_laporan={laporan.nama_laporan}
                    user="Mahasiswa"
                    url={`/mahasiswa/penilaian/detail-laporan/akhir/${laporan.id}`}
                  />
                );
              } else if (laporan.jenis === 'Borang') {
                return (
                  <RiwayatLaporanCard
                    nama={this.state.namaMahasiswa}
                    waktu_submisi={laporan.waktu_submisi}
                    nama_laporan={laporan.nama_laporan}
                    user="Mahasiswa"
                    url={`/mahasiswa/penilaian/detail-laporan/borang/${laporan.id}`}
                  />
                );
              } else if (laporan.jenis === 'Minggu') {
                return (
                  <RiwayatLaporanCard
                    nama={this.state.namaMahasiswa}
                    waktu_submisi={laporan.waktu_submisi}
                    nama_laporan={laporan.nama_laporan}
                    user="Mahasiswa"
                    url={`/mahasiswa/penilaian/detail-laporan/mingguan/${laporan.id}`}
                  />
                );
              }
            } else if (laporan.waktu_nilai_supv_lembaga) {
              if (laporan.jenis === 'Akhir') {
                return (
                  <RiwayatLaporanCard
                    nama={this.state.namaSupvLembaga}
                    waktu_submisi={laporan.waktu_nilai_supv_lembaga}
                    nama_laporan={laporan.nama_laporan}
                    user="Lembaga"
                    url={`/mahasiswa/penilaian/detail-laporan/akhir/${laporan.id}`}
                  />
                );
              } else if (laporan.jenis === 'Borang') {
                return (
                  <RiwayatLaporanCard
                    nama={this.state.namaSupvLembaga}
                    waktu_submisi={laporan.waktu_nilai_supv_lembaga}
                    nama_laporan={laporan.nama_laporan}
                    user="Lembaga"
                    url={`/mahasiswa/penilaian/detail-laporan/borang/${laporan.id}`}
                  />
                );
              } else if (laporan.jenis === 'Minggu') {
                return (
                  <RiwayatLaporanCard
                    nama={this.state.namaSupvLembaga}
                    waktu_submisi={laporan.waktu_nilai_supv_lembaga}
                    nama_laporan={laporan.nama_laporan}
                    user="Lembaga"
                    url={`/mahasiswa/penilaian/detail-laporan/mingguan/${laporan.id}`}
                  />
                );
              }
            } else if (laporan.waktu_nilai_supv_sekolah) {
              if (laporan.jenis === 'Akhir') {
                return (
                  <RiwayatLaporanCard
                    nama={this.state.namaSupvSekolah}
                    waktu_submisi={laporan.waktu_nilai_supv_sekolah}
                    nama_laporan={laporan.nama_laporan}
                    user="Sekolah"
                    url={`/mahasiswa/penilaian/detail-laporan/akhir/${laporan.id}`}
                  />
                );
              } else if (laporan.jenis === 'Borang') {
                return (
                  <RiwayatLaporanCard
                    nama={this.state.namaSupvSekolah}
                    waktu_submisi={laporan.waktu_nilai_supv_sekolah}
                    nama_laporan={laporan.nama_laporan}
                    user="Sekolah"
                    url={`/mahasiswa/penilaian/detail-laporan/borang/${laporan.id}`}
                  />
                );
              } else if (laporan.jenis === 'Minggu') {
                return (
                  <RiwayatLaporanCard
                    nama={this.state.namaSupvSekolah}
                    waktu_submisi={laporan.waktu_nilai_supv_sekolah}
                    nama_laporan={laporan.nama_laporan}
                    user="Sekolah"
                    url={`/mahasiswa/penilaian/detail-laporan/mingguan/${laporan.id}`}
                  />
                );
              }
            }
          })}
        </div>
      );
    }
  }
}
