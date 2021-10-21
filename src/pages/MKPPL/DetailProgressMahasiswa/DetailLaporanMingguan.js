import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import {StyledButton} from './../../../components/MKPPL/Button/Button';
import {Link} from 'react-router-dom';

/**
 * Detail laporan mingguan di role Mahasiswa
 */
class DetailLaporanMingguan extends Component {
  /**
   * @return {Component}
   */
  render() {
    return (
      <div>
        {this.props.skor_laporan_sekolah > 0 ? (
          <Row>
            <Col sm="4">
              <h4>Penilaian sekolah</h4>
            </Col>
            <Col sm="8">
              <h4>: {this.props.skor_laporan_sekolah}</h4>
            </Col>
          </Row>
        ) : null}
        <Row>
          {this.props.status_submisi ? (
            this.props.ubah ? (
              <TextField
                name="linkGDrive"
                id="filled-full-width"
                label="Link Google Drive"
                style={{margin: 8}}
                placeholder="Masukkan link laporan disini"
                fullWidth
                defaultValue={this.props.link_submisi}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                onChange={this.props.handleChange}
              />
            ) : (
              <>
                <Col sm="4">
                  <h4>Link</h4>
                </Col>
                <Col sm="8">
                  <h4>
                    :{' '}
                    <a href={this.props.link_submisi}>
                      {this.props.link_submisi}
                    </a>
                  </h4>
                </Col>
              </>
            )
          ) : (
            <TextField
              name="linkGDrive"
              id="filled-full-width"
              label="Link Google Drive"
              style={{margin: 8}}
              placeholder="Masukkan link laporan disini"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={this.props.handleChange}
            />
          )}
        </Row>
        <div style={{float: 'right', marginTop: '24px'}}>
          <div>
            <Link to="/mahasiswa/penilaian/detail-pratikum">
              <StyledButton secondary>Batal</StyledButton>
            </Link>
            {this.props.skor_laporan_sekolah > 0 ||
            this.props.skor_laporan_lembaga > 0 ?
            null :
            this.props.status_submisi ? (
              !this.props.ubah ? (
                <StyledButton primary onClick={this.props.handleUbah}>
                  Ubah
                </StyledButton>
              ) : (
                <StyledButton primary onClick={this.props.handleSubmitMingguan}>
                  Simpan
                </StyledButton>
              )
            ) : (
              <StyledButton primary onClick={this.props.handleSubmitMingguan}>
                Simpan
              </StyledButton>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default DetailLaporanMingguan;
