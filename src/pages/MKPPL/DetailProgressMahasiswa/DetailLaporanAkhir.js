import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {StyledButton} from '../../../components/MKPPL/Button/Button';
import {Link} from 'react-router-dom';
import Box from './Box';

import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';


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
/** */
class DetailLaporanAkhir extends Component {
  /** */
  constructor(props) {
    super(props);
    this.state = {
      ubah: false,
    };
  }
  /** */
  render() {
    console.log(this.props.ubah);
    return (
      <div>
        {!this.props.status_submisi || this.props.ubah ? (
          <div>
            <h4>Nama Lembaga: {this.props.namaLembaga}</h4>
            <h4>Periode Praktikum: {this.props.periodePraktikum}</h4>
            <h4>Jenis Layanan: {this.props.jenisLayanan}</h4>
            <h4>Bidang Kerja: {this.props.bidangKerja}</h4>
          </div>
        ) : (
          <div>
            {this.props.namaLembaga ? (
              <Row>
                <Col sm="4">
                  <h4>Nama Lembaga</h4>
                </Col>
                <Col sm="8">
                  <h4>: {this.props.namaLembaga}</h4>
                </Col>
              </Row>
            ) : null}
            {this.props.bidangKerja ? (
              <Row>
                <Col sm="4">
                  <h4>Bidang Kerja</h4>
                </Col>
                <Col sm="8">
                  <h4>: {this.props.bidangKerja}</h4>
                </Col>
              </Row>
            ) : null}
            {this.props.periodePratikum ? (
              <Row>
                <Col sm="4">
                  <h4>Periode Pratikum</h4>
                </Col>
                <Col sm="8">
                  <h4>: {this.props.periodePratikum}</h4>
                </Col>
              </Row>
            ) : null}
            {this.props.jenisLayanan ? (
              <Row>
                <Col sm="4">
                  <h4>Jenis Layanan</h4>
                </Col>
                <Col sm="8">
                  <h4>: {this.props.jenisLayanan}</h4>
                </Col>
              </Row>
            ) : null}
          </div>
        )}
        <h4>Laporan Akhir:</h4>
        {this.props.ubahAkhir ? (
          <Box setFiles={this.props.setFileLaporan} />
        ) : this.props.filesLaporan.length > 0 ? (
          this.props.filesLaporan[0].url ? (
            this.props.filesLaporan.map((file, index) => (
              <div key={index}>
                <h4>{file.name}</h4>
                <StyledButton
                  primary
                  onClick={(e) =>
                    this.props.handleDownloadFile(e, file.url, file.name)
                  }
                >
                  Download
                </StyledButton>
              </div>
            ))
          ) : (
            this.props.filesLaporan.map((file, index) => (
              <a key={index} href={file} download>
                {file.name}
              </a>
            ))
          )
        ) : (
          <Box setFiles={this.props.setFileLaporan} />
        )}

        <h4>Profil Lembaga:</h4>
        {this.props.ubahLembaga ? (
          <Box setFiles={this.props.setFileLembaga} />
        ) : this.props.filesLembaga.length > 0 ? (
          this.props.filesLembaga[0].url ? (
            this.props.filesLembaga.map((file, index) => (
              <div key={index}>
                <h4>{file.name}</h4>
                <StyledButton
                  primary
                  onClick={(e) =>
                    this.props.handleDownloadFile(e, file.url, file.name)
                  }
                >
                  Download
                </StyledButton>
              </div>
            ))
          ) : (
            this.props.filesLembaga.map((file, index) => (
              <a key={index} href={file} download>
                {file.name}
              </a>
            ))
          )
        ) : (
          <Box setFiles={this.props.setFileLembaga} />
        )}
        <div style={{float: 'right', marginTop: '24px'}}>
          <Link to="/mahasiswa/penilaian/detail-pratikum">
            <StyledButton secondary>Batal</StyledButton>
          </Link>
          {this.props.skor_laporan_sekolah > 0 ||
          this.props.skor_laporan_lembaga > 0 ? null : this.props
              .status_submisi ? (
            !this.props.ubah ? (
              <StyledButton primary onClick={this.props.handleUbahAkhir}>
                Ubah
              </StyledButton>
            ) : (
              <StyledButton primary onClick={this.props.handleSubmitAkhir}>
                Simpan
              </StyledButton>
            )
          ) : (
            <StyledButton primary onClick={this.props.handleSubmitAkhir}>
              Simpan
            </StyledButton>
          )}
          {
            this.props.isLoading ?
              <div style={{textAlign: 'center', marginTop: '1rem'}}>
                <CircularProgress color="primary" />
              </div> : null
          }
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(DetailLaporanAkhir);
