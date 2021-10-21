import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import {withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CardLaporan from './CardLaporan';
import axios from 'axios';
import Chips from '../../../../components/MKPPL/Chips/Chips';
import styled from 'styled-components';
import Loader from '../../../../assets/MKPPL/Loader.gif';

const LoaderGif = styled.img`
  display: block;
  margin-top: 48px;
  margin-bottom: 16px;
  margin-left: auto;
  margin-right: auto;
  height: 16vh;
`;

const InlineSpan = styled.span`
  display: inline-block;
  margin-left: 8px;
`;

const GrayLine = styled.div`
  border: 1px solid #dedede;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  display: block;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Back = () => {
  return (
    <>
      <Link
        to='/mahasiswa/penilaian'
        style={{padding: '24px'}}
      >
        <h6>&lt;  Kembali</h6>
      </Link>
    </>
  );
};

const styles = (theme) => ({
  laporan: {},
});
class DetailPratikum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }
  componentDidMount() {
    console.log('detail');

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
          console.log(response.data.laporan_akhir);
          this.setState({
            laporan_akhir: response.data.laporan_akhir,
            data: response.data.laporan_mingguan,
            laporan_borang: response.data.laporan_borang,
            loading: true,
            namaSupervisorSekolah:
            response.data.profile.supervisor_sekolah.user.full_name,
            namaSupervisorLembaga:
            response.data.profile.supervisor_lembaga.user.full_name,
            namaLembaga: response.data.profile.supervisor_lembaga.lembaga.nama,
          });
        });
  }

  render() {
    if (!this.state.loading) {
      return (
        <div>
          <LoaderGif className="loading-detail-praktikum" src={Loader} />
        </div>
      );
    } else {
      const {classes} = this.props;

      return (
        <div className={classes.root}>
          <Back />
          <div style={{textAlign: 'center'}}>
            <h2>Praktikum 1</h2>
          </div>

          <Wrapper>
            <Row>
              <Col xs='4'>
                <h4>Status</h4>
              </Col>
              <Col xs='8'>
                <h4>
                  :
                  <InlineSpan>
                    <Chips label="Aktif" />
                  </InlineSpan>
                </h4>
              </Col>
            </Row>
            <Row>
              <Col xs='4'>
                <h4>Supervisor Sekolah</h4>
              </Col>
              <Col xs='8'>
                <h4>
                  : {'  '}
                  <b>{this.state.namaSupervisorSekolah}</b>
                </h4>
              </Col>
            </Row>
            <Row>
              <Col xs='4' style={{paddingRight: '0px'}}>
                <h4>Supervisor Lembaga</h4>
              </Col>
              <Col xs='8'>
                <h4>
                  : {'  '}
                  <b>{this.state.namaSupervisorLembaga}</b>
                </h4>
              </Col>
            </Row>
            <Row>
              <Col xs='4' style={{paddingRight: '0px'}}>
                <h4>Nama Lembaga</h4>
              </Col>
              <Col xs='8'>
                <h4>
                  : {'  '}
                  <b>{this.state.namaLembaga}</b>
                </h4>
              </Col>
            </Row>
          </Wrapper>

          <GrayLine />
          <h4>Laporan Praktikum:</h4>
          {this.state.data.map((laporan) => (laporan.status_publikasi === true) ?
            <Box justifyContent="center" pb={3} key={laporan.id}>
              <CardLaporan
                paddingBottom={1}
                nama_laporan={laporan.nama_laporan}
                deadline={laporan.waktu_deadline}
                waktu_submisi={laporan.waktu_submisi}
                status_submisi={laporan.status_submisi}
                urldetail={`/mahasiswa/penilaian/detail-laporan/mingguan/${laporan.id}`}
              />
            </Box> :
            '',
          )}
          <GrayLine />
          <h4>Laporan Akhir:</h4>
          {this.state.laporan_akhir.map((laporan) => (laporan.status_publikasi === true) ?
            <Box justifyContent="center" pb={3} key={laporan.id}>
              <CardLaporan
                paddingBottom={1}
                nama_laporan={laporan.nama_laporan}
                deadline={laporan.waktu_deadline}
                waktu_submisi={laporan.waktu_submisi}
                status_submisi={laporan.status_submisi}
                urldetail={`/mahasiswa/penilaian/detail-laporan/akhir/${laporan.id}`}
              />
            </Box> : <h4 style={{color: '#F24848'}}>Laporan belum tersedia</h4>,
          )}
          <GrayLine />
          <h4>Laporan Borang:</h4>
          {this.state.laporan_borang.map((laporan) => (laporan.status_publikasi === true) ?
            <Box justifyContent="center" pb={3} key={laporan.id}>
              <CardLaporan
                paddingBottom={1}
                nama_laporan={laporan.nama_laporan}
                deadline={laporan.waktu_deadline}
                waktu_submisi={laporan.waktu_submisi}
                status_submisi={laporan.status_submisi}
                urldetail={`/mahasiswa/penilaian/detail-laporan/borang/${laporan.id}`}
              />
            </Box> : <h4 style={{color: '#F24848'}}>Laporan belum tersedia</h4>,
          )}
        </div>
      );
    }
  }
}

export default withStyles(styles)(DetailPratikum);
