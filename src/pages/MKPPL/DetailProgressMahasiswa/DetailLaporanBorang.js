import React, {Component} from 'react';
import {StyledButton} from '../../../components/MKPPL/Button/Button';
import {Link} from 'react-router-dom';
import Box from './Box';

import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

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
class DetailLaporanBorang extends Component {
  /**
   * @return {Component}
  */
  render() {
    return (
      <div>
        {this.props.templateSekolah[0].url ?
          this.props.templateSekolah.map((file, index) => (
            <div key={index}>
              <h4>Template Borang Penilaian Supervisor Sekolah:</h4>
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
          )) :
          null}
        {this.props.templateLembaga[0].url ?
          this.props.templateLembaga.map((file, index) => (
            <div key={index}>
              <h4>Template Borang Penilaian Supervisor Lembaga:</h4>
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
          )) :
          null}
        {this.props.templateKuliah[0].url ?
          this.props.templateKuliah.map((file, index) => (
            <div key={index}>
              <h4>Template Borang Penilaian Perkuliahan:</h4>
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
          )) :
          null}
        <h4>Borang Penilaian Supervisor Sekolah:</h4>
        {this.props.ubahBorangSekolah ? (
          <Box setFiles={this.props.setBorangSekolah} />
        ) : this.props.borangSekolah.length > 0 ? (
          this.props.borangSekolah[0].url ? (
            this.props.borangSekolah.map((file, index) => (
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
            this.props.borangSekolah.map((file, index) => (
              <a key={index} href={file} download>
                {file.name}
              </a>
            ))
          )
        ) : (
          <Box setFiles={this.props.setBorangSekolah} />
        )}
        <h4>Borang Penilaian Supervisor Lembaga:</h4>
        {this.props.ubahBorangLembaga ? (
          <Box setFiles={this.props.setBorangLembaga} />
        ) : this.props.borangLembaga.length > 0 ? (
          this.props.borangLembaga[0].url ? (
            this.props.borangLembaga.map((file, index) => (
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
            this.props.borangLembaga.map((file, index) => (
              <a key={index} href={file} download>
                {file.name}
              </a>
            ))
          )
        ) : (
          <Box setFiles={this.props.setBorangLembaga} />
        )}
        <h4>Borang Penilaian Perkuliahan:</h4>

        {this.props.ubahBorangKuliah ? (
          <Box setFiles={this.props.setBorangKuliah} />
        ) : this.props.borangKuliah.length > 0 ? (
          this.props.borangKuliah[0].url ? (
            this.props.borangKuliah.map((file, index) => (
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
            this.props.borangKuliah.map((file, index) => (
              <a key={index} href={file} download>
                {file.name}
              </a>
            ))
          )
        ) : (
          <Box setFiles={this.props.setBorangKuliah} />
        )}
        <div style={{float: 'right', marginTop: '24px'}}>
          <Link to="/mahasiswa/penilaian/detail-pratikum">
            <StyledButton secondary>Batal</StyledButton>
          </Link>
          {this.props.skor_laporan_sekolah > 0 ||
          this.props.skor_laporan_lembaga > 0 ? null : this.props
              .status_submisi ? (
            !this.props.ubah ? (
              <StyledButton primary onClick={this.props.handleUbahBorang}>
                Ubah
              </StyledButton>
            ) : (
              <StyledButton primary onClick={this.props.handleSubmitBorang}>
                Simpan
              </StyledButton>
            )
          ) : (
            <StyledButton primary onClick={this.props.handleSubmitBorang}>
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
export default withStyles(styles)(DetailLaporanBorang);
