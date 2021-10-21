import React, {Component} from 'react';
import styled from 'styled-components';
import Chips from './../Chips/Chips';
import {Grid} from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import {FormErrors} from '../../../components/MKPPL/FormError/FormError';
import Profile from './../../ProfileHeader/ListProfileKoor';
import DetailLaporan from '../../DetailLaporan';


// Styled components for search bar

const DetailLap = styled.div`
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;
    color: #4F4F4F;
    display: flex;
    align-items: center;
    letter-spacing: 0.0025em;
    `;

const DetailValue = styled.div`
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 18px;
    color: #4F4F4F;
    display: flex;
    text-align: left;
    letter-spacing: 0.0025em;
`;

const GrayLine = styled.div`
  border: 1px solid #dedede;
  width: 430px;
  height: 0px;
`;
const Detail = styled.div`
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: 0.0025em;
`;
const StyledH3 = styled.div`
  font-family: Nunito Sans;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.0025em;
  color: #404852;
  text-transform: capitalize;
  margin-left: 140px;
`;
const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * Filter data that matches with search input
 * and return list of data if it's valid
 * @param {event} e
 */
export default class DetailSubmisiDataKoor extends Component {
  /**
   *
   */
  constructor() {
    super();
    this.state = {
      nilai: '',
      formErrors: {nilai: ''},
      formValid: false,
      isSuccess: false,
    };
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => {
      this.validateField(name, value);
    });
    console.log(name);
    console.log(value);
  };

  /**
   * @return {Component}
   */
  render() {
    console.log('sampe detail submisi data koor');
    console.log('masuk ke DSD');
    if (this.state.isSuccess === true) {
      window.location.reload(false);
    }

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
    if (deadlineStr != null) {
      const deadlineStrTime = 'T' + deadlineStr.split(' ')[1] + ':00';
      const deadlineStrDate = deadlineStr
          .split(' ')[0]
          .split('-')
          .reverse()
          .join('-');
      const deadline = new Date(deadlineStrDate + deadlineStrTime);
      const now = new Date();

      let selisih = (now.getTime() - deadline.getTime()) / 1000;
      var txtSisaDeadline = '';
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
    } else {
      deadlineStr = 'Deadline Tidak Ditentukan';
    }


    let nilaiSupvSekolah = this.props.content.skor_laporan_sekolah;
    let nilaiSupvLembaga = this.props.content.skor_laporan_lembaga;

    if (nilaiSupvSekolah === -1) {
      nilaiSupvSekolah = 'Belum dinilai';
    }
    if (nilaiSupvLembaga === -1) {
      nilaiSupvLembaga = 'Belum dinilai';
    }

    if (this.state.isSuccess === true) {
      return <Redirect to="/koordinator-kuliah" />;
    }
    return (
      <>
        <h1>{this.props.mahasiswa.user.full_name}</h1>
        <div style={{textAlign: 'center'}}>
          <Grid container xs={12} justify="center">
            <Grid xs={3}>
              <Detail>Status</Detail>
            </Grid>
            <Grid xs={1} style={{textAlign: 'center'}}>:</Grid>
            <Grid xs={3}>
              <Chips label='Aktif' />
            </Grid>
          </Grid>
          <Profile detail='Jenis Praktikum' value={this.props.content.jenis_praktikum}></Profile>
        </div>
        <br></br>
        <Centered>
          <GrayLine />
        </Centered>
        <br></br>
        <StyledH3>
          {this.props.content.nama_laporan}
        </StyledH3>
        <DetailLaporan detail='Deadline' value={deadlineStr}></DetailLaporan>
        <DetailLaporan detail='Waktu tersisa' value={txtSisaDeadline}></DetailLaporan>
        <DetailLaporan detail='Terakhir diubah' value={lastChangedStr}></DetailLaporan>
        <Grid xs={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Grid xs={2}>
            <DetailLap>Link Google Drive</DetailLap>
          </Grid>
          <Grid xs={1} style={{textAlign: 'center'}}>:</Grid>
          <Grid xs={4}>
            <DetailValue>
              <a href={this.props.content.link_submisi}>{this.props.content.link_submisi}</a>
            </DetailValue>
          </Grid>
        </Grid>
        <DetailLaporan detail='Penilaian lembaga' value={nilaiSupvLembaga}></DetailLaporan>
        <DetailLaporan detail='Penilaian sekolah' value={nilaiSupvSekolah}></DetailLaporan>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
      </>
    );
  }
}
