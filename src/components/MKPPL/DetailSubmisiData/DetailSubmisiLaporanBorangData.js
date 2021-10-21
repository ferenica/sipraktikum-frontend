import React, {Component} from 'react';
import styled from 'styled-components';
import Chips from './../Chips/Chips';
import Link from '@material-ui/core/Link';
import {Row, Col} from 'react-bootstrap';
import DocsIcon from './../../../assets/MKPPL/docs.png';
import {StyledButton} from './../../../components/MKPPL/Button/Button';

// Styled components for search bar
const DocsImage = styled.img`
  margin: 8px;
  width: 36px;
`;
const GrayLine = styled.div`
  border: 1px solid #dedede;
  width: 100%;
`;
const StatusSpan = styled.span`
  display: inline-block;
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
// Class to filter data that matches with search input
// And return list of data if it's valid
/** */
export default class DetailSubmisiLaporanBorangData extends Component {
  /**
   *
  */
  getFileName(fileUrl) {
    if (fileUrl === null) {
      const fileName = '';
      return fileName;
    }
    const splitUrl = fileUrl.split('/');
    const fileName = splitUrl[splitUrl.length - 1];
    return fileName;
  }
  /**
   * @return {Component}
  */
  render() {
    let txtSisaDeadline = '-';

    let lastChangedStr = this.props.content.waktu_submisi;
    if (lastChangedStr === undefined || lastChangedStr === null) {
      lastChangedStr = '-';
    } else {
      const lastChangedStrTime = 'T' + lastChangedStr.split(' ')[1] + ':00';
      const lastChangedStrDate = lastChangedStr
          .split(' ')[0]
          .split('-')
          .reverse()
          .join('-');
      const lastChanged = new Date(lastChangedStrDate + lastChangedStrTime);
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      lastChangedStr = lastChanged.toLocaleDateString('id-ID', options);
    }

    let deadlineStr = this.props.content.waktu_deadline;
    if (deadlineStr === undefined || deadlineStr === null) {
      deadlineStr = '-';
    } else {
      const deadlineStrTime = 'T' + deadlineStr.split(' ')[1] + ':00';
      const deadlineStrDate = deadlineStr
          .split(' ')[0]
          .split('-')
          .reverse()
          .join('-');
      const deadline = new Date(deadlineStrDate + deadlineStrTime);
      const now = new Date();

      let selisih = (now.getTime() - deadline.getTime()) / 1000;
      if (selisih > 0) {
        if (selisih >= 60 * 60 * 24) {
          selisih = Math.round(selisih / (60 * 60 * 24));
          txtSisaDeadline = 'Lewat ' + selisih + ' hari';
        } else if (selisih >= 60 * 60) {
          selisih = Math.round(selisih / (60 * 60));
          txtSisaDeadline = 'Lewat ' + selisih + ' jam';
        } else if (selisih >= 60) {
          selisih = Math.round(selisih / 60);
          txtSisaDeadline = 'Lewat ' + selisih + ' menit';
        } else {
          selisih = Math.round(selisih);
          txtSisaDeadline = 'Lewat ' + selisih + ' detik';
        }
      } else {
        selisih = selisih * -1;
        if (selisih >= 60 * 60 * 24) {
          selisih = Math.round(selisih / (60 * 60 * 24));
          txtSisaDeadline = selisih + ' hari';
        } else if (selisih >= 60 * 60) {
          selisih = Math.round(selisih / (60 * 60));
          txtSisaDeadline = selisih + ' jam';
        } else if (selisih >= 60) {
          selisih = Math.round(selisih / 60);
          txtSisaDeadline = selisih + ' menit';
        } else {
          selisih = Math.round(selisih);
          txtSisaDeadline = selisih + ' detik';
        }
      }
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      deadlineStr = deadline.toLocaleDateString('id-ID', options);
    }

    let nilaiSupvSekolah = this.props.content.skor_laporan_sekolah;
    let nilaiSupvLembaga = this.props.content.skor_laporan_lembaga;

    if (nilaiSupvSekolah === -1) {
      nilaiSupvSekolah = 'Belum dinilai';
    }
    if (nilaiSupvLembaga === -1) {
      nilaiSupvLembaga = 'Belum dinilai';
    }

    return (
      <>
        <h1>{this.props.mahasiswa.user.username}</h1>
        <Centered>
          <h4 style={{color: '#4F4F4F'}}>
            Status:{' '}
            <StatusSpan>
              <Chips label="Aktif" />
            </StatusSpan>
          </h4>
        </Centered>
        <Centered>
          <h4 style={{color: '#4F4F4F'}}>
            Jenis Praktikum: <b>{this.props.content.jenis_praktikum}</b>
          </h4>
        </Centered>
        <GrayLine />
        <br></br>
        <h3>
          <b>{this.props.content.nama_laporan}</b>
        </h3>
        <br></br>
        <Row>
          <Col sm="4">
            <p>Deadline</p>
            <p>Waktu tersisa</p>
            <p>Terakhir Diubah</p>
          </Col>
          <Col sm="8">
            <p>: {deadlineStr}</p>
            <p>: {txtSisaDeadline}</p>
            <p>: {lastChangedStr}</p>
          </Col>
        </Row>
        <br></br>
        { this.props.content.borang_supv_sekolah ?
          <>
            <Row>
              <Col sm="4">
                <p>Borang Penilaian Supervisor Sekolah:</p>
              </Col>
            </Row>
            <Row>
              <DocsImage src={DocsIcon} alt='docs' />
              <StatusSpan style={{marginTop: '16px'}}>
                <h4>{this.getFileName(this.props.content.borang_supv_sekolah)}</h4>
              </StatusSpan>
              <Col sm="2">
              </Col>
              <Col sm="10">
                <Link target='_blank' href={this.props.content.borang_supv_sekolah}>
                  <StyledButton secondary>Preview</StyledButton>
                </Link>
                <a href={this.props.content.borang_supv_sekolah} download>
                  <StyledButton
                    primary
                  >
                          Download
                  </StyledButton>
                </a>
              </Col>
            </Row>
          </> :
          <Row>
            <Col sm="4">
              <p>Borang Penilaian Supervisor Sekolah: belum tersedia</p>
            </Col>
          </Row>
        }
        <br></br>
        { this.props.content.borang_supv_lembaga ?
          <>
            <Row>
              <Col sm="4">
                <p>Borang Penilaian Supervisor Lembaga:</p>
              </Col>
            </Row>
            <Row>
              <DocsImage src={DocsIcon} alt='docs' />
              <StatusSpan style={{marginTop: '16px'}}>
                <h4>{this.getFileName(this.props.content.borang_supv_lembaga)}</h4>
              </StatusSpan>
              <Col sm="2">
              </Col>
              <Col sm="10">
                <Link target='_blank' href={this.props.content.borang_supv_lembaga}>
                  <StyledButton secondary>Preview</StyledButton>
                </Link>
                <a href={this.props.content.borang_supv_lembaga} download>
                  <StyledButton
                    primary
                  >
                          Download
                  </StyledButton>
                </a>
              </Col>
            </Row>
          </> :
      <Row>
        <Col sm="4">
          <p>Borang Penilaian Supervisor Lembaga: belum tersedia</p>
        </Col>
      </Row>
        }

        <br></br>
        { this.props.content.borang_supv_perkuliahan ?
          <>
            <Row>
              <Col sm="4">
                <p>Borang Penilaian Perkuliahan:</p>
              </Col>
            </Row>
            <Row>
              <DocsImage src={DocsIcon} alt='docs' />
              <StatusSpan style={{marginTop: '16px'}}>
                <h4>{this.getFileName(this.props.content.borang_supv_perkuliahan)}</h4>
              </StatusSpan>
              <Col sm="2">
              </Col>
              <Col sm="10">
                <Link target='_blank' href={this.props.content.borang_supv_perkuliahan}>
                  <StyledButton secondary>Preview</StyledButton>
                </Link>
                <a href={this.props.content.borang_supv_perkuliahan} download>
                  <StyledButton
                    primary
                  >
                          Download
                  </StyledButton>
                </a>
              </Col>
            </Row>
          </> :
          <Row>
            <Col sm="4">
              <p>Borang Penilaian Perkuliahan: belum tersedia</p>
            </Col>
          </Row>
        }

      </>
    );
  }
}
