import React from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {styled} from '@material-ui/core/styles';

/**
 * Tentang praktikum page
 */
class TentangPraktikum extends React.Component {
  /**
   * Render page
   * @return {Component}
   */
  render() {
    if ((localStorage.getItem('login_token') === null) ||
    (localStorage.getItem('role') === 'Supervisor Lembaga')) {
      return <Redirect to="/login"/>;
    }

    const StyledContainer = styled(Container)({
      paddingTop: '2%',
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      marginTop: '3vh',
      marginBottom: '2.5rem',
      borderRadius: 10,
      boxShadow:
      `6px 0px 8px 0 rgba(0, 0, 0, 0.05),
      6px 0px 6px 0 rgba(0, 0, 0, 0.03),
      -6px 0px 8px 0 rgba(0, 0, 0, 0.05),
      -6px 0px 6px 0 rgba(0, 0, 0, 0.03)`,
      width: '1000px',
    });

    return (

      <div>
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin}
          isDosen={this.props.isDosen}/>
        <StyledContainer
          style={{backgroundColor: '#FFFFFF', marginTop: '2%'}}
          fixed>
          <div style={{marginRight: '17%', marginLeft: '17%'}}>
            <Typography
              component="div"
              variant="h5"
              display="block"
              gutterBottom>
              BAB I
            </Typography>
            <Typography
              component="div"
              variant="h3"
              display="block"
              gutterBottom>
              <center>PENDAHULUAN</center>
            </Typography>
            <Typography
              component="div"
              variant="h4"
              display="block"
              gutterBottom>
                A. Latar Belakang
            </Typography>
            <Typography
              component="div"
              variant="body1"
              display="block"
              gutterBottom>
              Program Studi Sarjana Departemen Ilmu Kesejahteraan Sosial FISIP-UI
              bertujuan untuk menghasilkan sarjana yang mempunyai kemampuan dasar untuk
              melakukan intervensi sosial melalui pengembangan program yang bersifat
              preventif, kuratif, rehabilitatif, dan developmental, serta mampu melakukan tugastugas manajerial dalam rangka pengelolaan organisasi pelayanan.
              Secara khusus Program Studi Sarjana Departemen Ilmu Kesejahteraan
              Sosial FISIP UI akan menghasilkan lulusan yang mampu:
            </Typography>
            <ol>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  menganalisis masalah dan isu sosial dengan menggunakan teori
                  kesejahteraan sosial.
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  mengaplikasikan nilai-nilai humanitarian serta prinsip-prinsip dan etika
                  pekerjaan sosial dalam melakukan intervensi sosial.
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  melakukan intervensi sosial yaitu:
                  <ol>
                    <li>
                      <Typography
                        component="div"
                        variant="body1"
                        display="block"
                        gutterBottom>
                        mampu mengaplikasikan metode intervensi sosial di tingkat mikro,
                        yaitu menangani kasus pada tingkat individu, keluarga, dan
                        kelompok dengan mengembangkan berbagai program seperti
                        program prevensi, kuratif, dan rehabilitasi.
                      </Typography>
                    </li>
                    <li>
                      <Typography
                        component="div"
                        variant="body1"
                        display="block"
                        gutterBottom>
                        mampu mengaplikasikan metode intervensi sosial di tingkat mezzo
                        (organisasi dan komunitas lokal) dengan mengembangkan berbagai
                        program seperti program mitigasi, promosi, prevensi, asistensi,
                        rehabilitasi, dan developmental.
                      </Typography>
                    </li>
                    <li>
                      <Typography
                        component="div"
                        variant="body1"
                        display="block"
                        gutterBottom>
                        mampu mengaplikasikan metode intervensi sosial di tingkat makro,
                        yaitu melakukan perencanaan program mitigasi, promosi (preventi,
                        asistensi, rehabilitasi dan developmental di tingkat kabupaten/kota
                        dan provinsi.
                      </Typography>
                    </li>
                  </ol>
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  melaksanakan tugas-tugas manajerial dalam organisasi pelayanan.
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  menganalisis kebijakan pembangunan di tingkat lokal, provinsi, dan
                  nasional.
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
              menganalisis data dan informasi dalam penelitian sosial yang berimplikasi terapan.
                </Typography>
              </li>
            </ol>
            <Typography
              component="div"
              variant="h4"
              display="block"
              gutterBottom>
              <br></br>B. Pengertian dan Sifat Praktikum<br></br>
            </Typography>
            <Typography
              component="div"
              variant="h5"
              display="block"
              gutterBottom>
              B.1. Pengertian Praktikum<br></br>
            </Typography>
            <Typography
              component="div"
              variant="body1"
              display="block"
              gutterBottom>
              Praktikum adalah proses belajar yang harus dilakukan oleh mahasiswa program studi sarjana Departemen Ilmu Kesejahteraan Sosial,
              untuk menerapkan ilmu kesejahteraan sosial (pengetahuan, nilai, etika dan keterampilan) dalam melakukan suatu intervensi (perubahan
              berencana) di dalam kehidupan nyata (lembaga/organisasi), di bawah bimbingan seorang supervisor.
            </Typography>
            <Typography
              component="div"
              variant="body1"
              display="block"
              gutterBottom>
              Secara umum, Praktikum diharapkan mendukung mahasiswa Ilmu Kesejahteraan Sosial mencapai profil Sarjana Ilmu Kesejahteraan Sosial UI yaitu:
              1) analisis kebijakan sosial, 2) konselor psikososial, 3) pengelola, 4) organisasi pelayanan kemanusiaan, 5) pekerja sosial komunitas, dan
              6) peneliti.
            </Typography>
            {/* <Typography component="div" variant="h5" display="block" gutterBottom>B.2. Jenis Praktikum<br></br></Typography>
          <Typography component="div" variant="body1" display="block" gutterBottom>
          Terdapat 2 jenis Praktikum yang wajib diikuti oleh mahasiswa, yaitu:
          </Typography>
          <ol>
            <li><Typography component="div" variant="body1" display="block" gutterBottom>
              Praktikum 1, berbobot
              </Typography></li>
            <li><Typography component="div" variant="body1" display="block" gutterBottom>
              Mahasiswa mampu menerapkan prinsip relasi yang baik dengan pihak lembaga.
              </Typography></li>
          </ol> */}
            <Typography
              component="div"
              variant="h4"
              display="block"
              gutterBottom>
              <br></br>C. Tujuan Praktikum
            </Typography>
            <Typography
              component="div"
              variant="h5"
              display="block"
              gutterBottom>
              C.1. Tujuan Umum
            </Typography>
            <Typography
              component="div"
              variant="body1"
              display="block"
              gutterBottom>
              Mahasiswa mampu menerapkan teori-teori, metodologi, nilai-nilai dan
              etika pekerjaan sosial yang telah dipelajari dalam kehidupan nyata, terutama untuk
              menerapkan keterampilan perencanaan dan pelaksanaan intervensi (perubahan
              berencana) terhadap individu, keluarga, kelompok, organisasi dan komunitas.
              Perubahan berencana tersebut dapat berupa program yang bersifat preventif,
              rehabilitatif, kuratif dan developmental pada tingkat mikro (individu, keluarga,
              kelompok), mezzo (komunitas dan organisasi) dan makro (kebijakan di tingkat
              daerah dan nasional).
            </Typography>
            <Typography
              component="div"
              variant="h5"
              display="block"
              gutterBottom>
              C.2. Tujuan Khusus
            </Typography>
            <Typography
              component="div"
              variant="body1"
              display="block"
              gutterBottom>
              Tujuan khusus yang ingin dicapai dalam Praktikum I adalah:
            </Typography>
            <ol>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  Mahasiswa mampu menggunakan keterampilan sosial dasar seperti menjalin
                  relasi, empati, asertif, negosiasi, mendengar aktif, observasi, wawancara,
                  asesmen dan lain-lain.
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  Mahasiswa mampu menerapkan prinsip relasi yang baik dengan pihak lembaga.
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  Mahasiswa mampu menjelaskan profil lembaga.
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  Mahasiswa mampu menerapkan prinsip relasi yang baik dengan individu/keluarga/kelompok/
                  komunitas/organisasi yang menjadi sasaran dalam perubahan berencana.
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  Mahasiswa mampu mengidentifikasi kebutuhan/masalah yang dihadapi oleh
                  individu/keluarga/kelompok/komunitas/organisasi yang menjadi sasaran dalam
                  perubahan berencana.
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  Mahasiswa mampu menerapkan keterampilan dalam menetapkan prioritas kebutuhan/masalah yang dihadapi oleh
                  individu/keluarga/kelompok/komunitas/organisasi yang menjadi sasaran dalam intervensi (perubahan berencana).
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  Mahasiswa mampu menerapkan keterampilan dalam perencanaan intervensi (perubahan berencana) yang melibatkan
                  individu/keluarga/kelompok/komunitas/organisasi.
                </Typography>
              </li>
            </ol>
            <Typography
              component="div"
              variant="body1"
              display="block"
              gutterBottom>
              Berdasarkan tujuan tersebut, maka hasil (output) yang diharapkan dari kegiatan
              Praktikum I adalah:
            </Typography>

            <ol>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  Pembinaan relasi (baik dengan lembaga maupun individu/keluarga/kelompok/komunitas sasaran).
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  Pemahaman lembaga.
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  Identifikasi kebutuhan/masalah.
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  Analisis dan prioritas kebutuhan/masalah.
                </Typography>
              </li>
              <li>
                <Typography
                  component="div"
                  variant="body1"
                  display="block"
                  gutterBottom>
                  Perencanaan intervensi dalam perubahan berencana.
                </Typography>
              </li>
            </ol>
          </div>
        </StyledContainer>
      </div>
    );
  }
}

export default TentangPraktikum;

TentangPraktikum.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isDosen: PropTypes.bool,
};
