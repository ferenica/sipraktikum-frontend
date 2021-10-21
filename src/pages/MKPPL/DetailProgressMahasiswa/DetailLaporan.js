import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import {countTimeLeft, getDatetimeNow} from './utils';
import HeaderMahasiswa from './HeaderMahasiswa';
import DeadlineMahasiwa from './DeadlineMahasiswa';
import DetailLaporanMingguan from './DetailLaporanMingguan';
import DetailLaporanAkhir from './DetailLaporanAkhir';
import DetailLaporanBorang from './DetailLaporanBorang';

const styles = (theme) => ({
  outline: {border: '1px solid #FF8326', color: '#FF8326'},
  simpan: {backgroundColor: '#FFFFFF'},
  formControl: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    minWidth: 120,
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: '5px',
  },
});

/**
 * Detail laporan dari role Mahasiswa
 */
class DetailLaporan extends Component {
  /**
   * @constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
      id: parseInt(this.props.match.params.id),
      jenisLaporan: this.props.match.params.jenis,
      linkGDrive: '',
      ubah: false,
      laporan: {},
      filesLaporan: [],
      filesLembaga: [],
      borangKuliah: [],
      borangLembaga: [],
      borangSekolah: [],
      ubahBorangSekolah: false,
      ubahBorangLembaga: false,
      ubahBorangKuliah: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitMingguan = this.handleSubmitMingguan.bind(this);
    this.handleSubmitBorang = this.handleSubmitBorang.bind(this);
    this.handleSubmitAkhir = this.handleSubmitAkhir.bind(this);
    this.handleUbahAkhir = this.handleUbahAkhir.bind(this);
    this.handleUbah = this.handleUbah.bind(this);
    this.handleUbahBorang = this.handleUbahBorang.bind(this);

    this.handleLembagaChange = this.handleLembagaChange.bind(this);
  }

  /**
   * Run after mount
   */
  componentDidMount() {
    this.fetchDataFromServer();
  }

  /**
   * Get data from the API
   */
  fetchDataFromServer = () => {
    axios
        .get(
            'http://ppl-berkah-backend.herokuapp.com/api/v1/mahasiswa/praktikum/laporan-detail/',
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('login_token')}`,
              },
            },
        )
        .then((response) => {
          console.log(response.data);

          this.setState({
            data: response.data.laporan_mingguan,
            laporan_akhir: response.data.laporan_akhir,
            templateBorang: response.data.template_borang,
            namaSupervisorSekolah:
              response.data.profile.supervisor_sekolah.user.full_name,
            namaSupervisorLembaga:
              response.data.profile.supervisor_lembaga.user.full_name,
            namaLembaga: response.data.profile.supervisor_lembaga.lembaga.nama,
            idLembaga: response.data.profile.supervisor_lembaga.id,
            jenisLayanan:
              response.data.profile.supervisor_lembaga.lembaga.jenis_pelayanan,
            periodePraktikum: response.data.profile.periode.nama,
          });

          if (response.data.laporan_mingguan &&
            this.state.jenisLaporan === 'mingguan') {
            response.data.laporan_mingguan.map((laporan) => {
              if (laporan.id === this.state.id) {
                this.setState({
                  laporan: laporan,
                }, () => {
                  this.setState({
                    linkGDrive: this.state.laporan.link_submisi,
                  });
                });
              }
            });
          }
          if (response.data.laporan_akhir &&
            this.state.jenisLaporan === 'akhir') {
            response.data.laporan_akhir.map((laporan) => {
              if (laporan.id === this.state.id) {
                this.setState({
                  laporan: laporan,
                });
                if (laporan.laporan_akhir) {
                  const url = new URL(laporan.laporan_akhir);
                  const str = url.pathname;
                  const res = str.substring(str.lastIndexOf('/') + 1);
                  const data = {name: res, url: url};
                  this.setState({
                    filesLaporan: [data],
                  });
                }
                if (laporan.profil_lembaga) {
                  const url = new URL(laporan.profil_lembaga);
                  const str = url.pathname;
                  const res = str.substring(str.lastIndexOf('/') + 1);
                  const data = {name: res, url: url};
                  this.setState({
                    filesLembaga: [data],
                  });
                }
              }
            });
          }
          if (response.data.laporan_borang &&
            this.state.jenisLaporan === 'borang') {
            response.data.laporan_borang.map((laporan) => {
              if (laporan.id === this.state.id) {
                this.setState({laporan: laporan});

                if (laporan.borang_supv_lembaga) {
                  const url = new URL(laporan.borang_supv_lembaga);
                  const str = url.pathname;
                  const res = str.substring(str.lastIndexOf('/') + 1);
                  const data = {name: res, url: url};
                  this.setState({
                    borangLembaga: [data],
                  });
                }
                if (laporan.borang_supv_perkuliahan) {
                  const url = new URL(laporan.borang_supv_perkuliahan);
                  const str = url.pathname;
                  const res = str.substring(str.lastIndexOf('/') + 1);
                  const data = {name: res, url: url};
                  this.setState({
                    borangKuliah: [data],
                  });
                }
                if (laporan.borang_supv_sekolah) {
                  const url = new URL(laporan.borang_supv_sekolah);
                  const str = url.pathname;
                  const res = str.substring(str.lastIndexOf('/') + 1);
                  const data = {name: res, url: url};
                  this.setState({
                    borangSekolah: [data],
                  });
                }
              }
              if (this.state.templateBorang.t_borang_supv_lembaga) {
                const url = new URL(
                    this.state.templateBorang.t_borang_supv_lembaga,
                );
                const str = url.pathname;
                const res = str.substring(str.lastIndexOf('/') + 1);
                const data = {name: res, url: url};

                this.setState({
                  templateLembaga: [data],
                });
              }
              if (this.state.templateBorang.t_borang_supv_perkuliahan) {
                const url = new URL(
                    this.state.templateBorang.t_borang_supv_perkuliahan,
                );
                const str = url.pathname;
                const res = str.substring(str.lastIndexOf('/') + 1);
                const data = {name: res, url: url};

                this.setState({
                  templateKuliah: [data],
                });
              }
              if (this.state.templateBorang.t_borang_supv_sekolah) {
                const url = new URL(
                    this.state.templateBorang.t_borang_supv_sekolah,
                );
                const str = url.pathname;
                const res = str.substring(str.lastIndexOf('/') + 1);
                const data = {name: res, url: url};

                this.setState({
                  templateSekolah: [data],
                });
              }
            });
          }
        });
  }

  /**
   *
   */
  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  /**
   * Handle Ubah button
   */
  handleUbah() {
    this.setState({ubah: true});
  }

  /**
   *
  */
  handleUbahAkhir() {
    this.setState({ubahAkhir: true, ubahLembaga: true, ubah: true});
  }

  setFileLaporan = (file) => {
    this.setState({filesLaporan: file, ubahAkhir: false});
  };

  setFileLembaga = (file) => {
    this.setState({filesLembaga: file, ubahLembaga: false});
  };

  setBorangSekolah = (file) => {
    this.setState({borangSekolah: file, ubahBorangSekolah: false});
  };

  setBorangLembaga = (file) => {
    this.setState({borangLembaga: file, ubahBorangLembaga: false});
  };

  setBorangKuliah = (file) => {
    this.setState({borangKuliah: file, ubahBorangKuliah: false});
  };

  /**
   * Laporan akhir's submit button handler
  */
  handleSubmitAkhir = (event) => {
    this.sendDataAkhirToServer();
  }

  /**
   *
  */
  sendDataAkhirToServer = () => {
    this.setState({isLoading: true});

    const formData = new FormData();
    try {
      const datetime = getDatetimeNow();
      const bearer = 'Bearer ' + localStorage.getItem('login_token');

      formData.append('nama_laporan', this.state.laporan.nama_laporan);
      formData.append('nama_lembaga', this.state.namaLembaga);
      formData.append('bidang_kerja', this.state.bidangKerja);
      formData.append('jenis_pelayanan', this.state.jenisLayanan);
      formData.append('periode_praktikum', this.state.periodePraktikum);
      formData.append('waktu_submisi', datetime);
      formData.append('jenis_praktikum', this.state.laporan.jenis_praktikum);
      formData.append('status_submisi', true);
      formData.append('file_laporan_akhir', this.state.filesLaporan[0]);
      formData.append('file_profil_lembaga', this.state.filesLembaga[0]);

      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: bearer,
          Accept: 'application/json',
        },
        body: formData,
      };

      fetch(
          'http://ppl-berkah-backend.herokuapp.com/api/v1/mahasiswa/praktikum/laporan-akhir/submit/',
          requestOptions,
      ).then(() => {
        this.fetchDataFromServer();
        this.setState({
          ubah: false,
          isLoading: false,
          ubahAkhir: false,
          ubahLembaga: false,
        });
      });
    } catch (error) {}
  }

  /**
   * Laporan borang submit button handler
   * @param {*} event
  */
  handleSubmitBorang = (event) => {
    this.sendDataBorangToServer();
  }


  sendDataBorangToServer = () => {
    this.setState({isLoading: true});

    const formData = new FormData();
    try {
      const datetime = getDatetimeNow();

      const bearer = 'Bearer ' + localStorage.getItem('login_token');

      formData.append('nama_laporan', this.state.laporan.nama_laporan);
      formData.append('jenis_praktikum', this.state.laporan.jenis_praktikum);
      formData.append('waktu_submisi', datetime);
      formData.append('status_submisi', true);
      formData.append('file_borang_supv_lembaga', this.state.borangLembaga[0]);
      formData.append('file_borang_supv_sekolah', this.state.borangSekolah[0]);
      formData.append(
          'file_borang_penilaian_kuliah',
          this.state.borangKuliah[0],
      );

      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: bearer,
          Accept: 'application/json',
        },
        body: formData,
      };

      fetch(
          'http://ppl-berkah-backend.herokuapp.com/api/v1/mahasiswa/praktikum/laporan-borang/submit/',
          requestOptions,
      ).then(() => {
        this.fetchDataFromServer();
        this.setState({
          ubahBorangSekolah: false,
          ubahBorangLembaga: false,
          ubahBorangKuliah: false,
          ubah: false,
          isLoading: false,
        });
      });
    } catch (error) {}
  }

  /**
   * Handle download button
  */
  handleDownloadFile(event, url, name) {
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
    });
  }

  /**
   * Laporan mingguan submit button handler
   * @param {*} event
  */
 handleSubmitMingguan = (event) => {
   this.sendDataMingguanToServer();
 }

  /**
   * Post data to API
   */
  sendDataMingguanToServer = () => {
    try {
      const datetime = getDatetimeNow();

      const bearer = 'Bearer ' + localStorage.getItem('login_token');
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': bearer},
        body: JSON.stringify({
          id: this.state.laporan.id,
          jenis_praktikum: this.state.laporan.jenis_praktikum,
          nama_laporan: this.state.laporan.nama_laporan,
          waktu_deadline: this.state.laporan.waktu_deadline,
          waktu_submisi: datetime,
          status_publikasi: this.state.laporan.status_publikasi,
          status_submisi: true,
          skor_laporan_sekolah: this.state.laporan.skor_laporan_sekolah,
          skor_laporan_lembaga: this.state.laporan.skor_laporan_lembaga,
          link_submisi: this.state.linkGDrive,
        }),
      };
      fetch(
          'http://ppl-berkah-backend.herokuapp.com/api/v1/mahasiswa/praktikum/laporan-detail/submit-link/',
          requestOptions,
      ).then(() => {
        this.fetchDataFromServer();
        this.setState({ubah: false});
      });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   *
  */
  handleLembagaChange(event) {
    this.setState({lembaga: event.target.value});
  }

  /**
   *
  */
  handleUbahBorang(event) {
    this.setState({
      ubahBorangSekolah: true,
      ubahBorangLembaga: true,
      ubahBorangKuliah: true,
      ubah: true,
    });
  }

  /**
   * @return {Component}
   */
  render() {
    const {classes} = this.props;

    if (this.state.laporan) {
      console.log(this.state);

      const {terlambat, txtSisaDeadline} = countTimeLeft(
          this.state.laporan.waktu_deadline,
          this.state.laporan.waktu_submisi,
      );

      return (
        <div className={classes.root}>
          <HeaderMahasiswa
            nama_laporan={this.state.laporan.nama_laporan}
            namaSupervisorSekolah={this.state.namaSupervisorSekolah}
            namaSupervisorLembaga={this.state.namaSupervisorLembaga}
            namaLembaga={this.state.namaLembaga}
          />
          <DeadlineMahasiwa
            waktu_deadline={this.state.laporan.waktu_deadline}
            terlambat={terlambat}
            txtSisaDeadline={txtSisaDeadline}
            status_submisi={this.state.laporan.status_submisi}
            waktu_submisi={this.state.laporan.waktu_submisi}
          />

          {this.state.jenisLaporan === 'mingguan' ? (
            <DetailLaporanMingguan
              skor_laporan_lembaga={this.state.laporan.skor_laporan_lembaga}
              skor_laporan_sekolah={this.state.laporan.skor_laporan_sekolah}
              status_submisi={this.state.laporan.status_submisi}
              ubah={this.state.ubah}
              link_submisi={this.state.laporan.link_submisi}
              handleChange={this.handleChange}
              handleSubmitMingguan={this.handleSubmitMingguan}
              handleUbah={this.handleUbah}
            />
          ) : null}

          {this.state.jenisLaporan === 'akhir' ? (
            <DetailLaporanAkhir
              idLembaga={this.state.idLembaga}
              namaLembaga={this.state.namaLembaga}
              status_submisi={this.state.laporan.status_submisi}
              handleLembagaChange={this.handleLembagaChange}
              handleChange={this.handleChange}
              filesLaporan={this.state.filesLaporan}
              filesLembaga={this.state.filesLembaga}
              handleDownloadFile={this.handleDownloadFile}
              setFileLaporan={this.setFileLaporan}
              setFileLembaga={this.setFileLembaga}
              bidangKerja={this.state.bidangKerja}
              jenisLayanan={this.state.jenisLayanan}
              borangSekolah={this.state.borangSekolah}
              handleUbahAkhir={this.handleUbahAkhir}
              ubahAkhir={this.state.ubahAkhir}
              ubahLembaga={this.state.ubahLembaga}
              ubah={this.state.ubah}
              handleSubmitAkhir={this.handleSubmitAkhir}
              periodePraktikum={this.state.periodePraktikum}
              skor_laporan_lembaga={this.state.laporan.skor_laporan_lembaga}
              skor_laporan_sekolah={this.state.laporan.skor_laporan_sekolah}
              isLoading={this.state.isLoading}
            />
          ) : null}

          {this.state.jenisLaporan === 'borang' &&
          this.state.templateLembaga &&
          this.state.templateSekolah &&
          this.state.templateKuliah ? (
            <DetailLaporanBorang
              status_submisi={this.state.laporan.status_submisi}
              borangSekolah={this.state.borangSekolah}
              setBorangSekolah={this.setBorangSekolah}
              borangLembaga={this.state.borangLembaga}
              setBorangLembaga={this.setBorangLembaga}
              borangKuliah={this.state.borangKuliah}
              setBorangKuliah={this.setBorangKuliah}
              handleSubmitBorang={this.handleSubmitBorang}
              handleUbahBorang={this.handleUbahBorang}
              handleDownloadFile={this.handleDownloadFile}
              ubah={this.state.ubah}
              ubahBorangSekolah={this.state.ubahBorangSekolah}
              ubahBorangLembaga={this.state.ubahBorangLembaga}
              ubahBorangKuliah={this.state.ubahBorangKuliah}
              skor_laporan_lembaga={this.state.laporan.skor_laporan_lembaga}
              skor_laporan_sekolah={this.state.laporan.skor_laporan_sekolah}
              templateLembaga={this.state.templateLembaga}
              templateSekolah={this.state.templateSekolah}
              templateKuliah={this.state.templateKuliah}
              isLoading={this.state.isLoading}
            />
          ) : null}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default withStyles(styles)(DetailLaporan);
