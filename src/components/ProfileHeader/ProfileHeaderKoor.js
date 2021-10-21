import React, {Component} from 'react';
import styled from 'styled-components';
import ListSubmisi from '../ListSubmisi/ListSubmisiKoor';
import ListSubmisiAkhir from '../ListSubmisi/ListSubmisiAkhirKoor';
import ListSubmisiBorang from '../ListSubmisi/ListSubmisiBorangKoor';
import Chips from '../MKPPL/Chips/Chips';
import {Grid} from '@material-ui/core';
import Profile from './ListProfileKoor';

// Styled components for search bar

const GrayLine = styled.div`
    border: 1px solid #DEDEDE;
    width: 100%;
`;

const Detail = styled.div`
font-family: Nunito Sans;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 30px;
/* identical to box height */

display: flex;
align-items: center;
letter-spacing: 0.0025em;
`;

// Class to filter data that matches with search input
// And return list of data if it's valid
/**
 *
 */
export default class ProfileHeaderKoor extends Component {
    state = {
      items_lap_mingguan: [],
      items_lap_akhir: [],
      items_lap_borang: [],
      path: '',
    }

    // Set initial state
    componentDidMount = () => {
      this.setState({
        items_lap_mingguan: this.props.laporan_mingguan.map((laporan_mingguan) => laporan_mingguan),
        items_lap_akhir: this.props.laporan_akhir.map((laporan_akhir) => laporan_akhir),
        items_lap_borang: this.props.laporan_borang.map((laporan_borang) => laporan_borang),
        path: window.location.pathname,
      });
      console.log(this.state.items_lap_mingguan);
      console.log('ini di profile header koor');
    }
    /**
     *
     */
    render() {
      let jenisPraktikum = '';
      let supervisorSekolah = '';
      let supervisorLembaga = '';
      let lembaga = '';
      try {
        jenisPraktikum = this.props.praktikum.jenis_praktikum;
        supervisorSekolah = this.props.mahasiswa.supervisor_sekolah.user.full_name;
        supervisorLembaga = this.props.mahasiswa.supervisor_lembaga.user.full_name;
        lembaga = this.props.mahasiswa.supervisor_lembaga.lembaga.nama;
      } catch (error) {
        console.log();
      }
      return (
        <>
          <h1>
            {this.props.mahasiswa.user.full_name}
          </h1>
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
            <Profile detail='Jenis Praktikum' value={jenisPraktikum}></Profile>
            <Profile detail='Supervisor Sekolah' value={supervisorSekolah}></Profile>
            <Profile detail='Supervisor Lembaga' value={supervisorLembaga}></Profile>
            <Profile detail='Nama Lembaga' value={lembaga}></Profile>
          </div>
          <br></br>
          <GrayLine />
          <br></br>
          <h4>
                    Laporan Praktikum:
          </h4>
          {/* <GrayLine /> */}
          <ul style={{padding: 0, listStyleType: 'none', marginBottom: 0}}>
            {
              // If search input is valid, return data
              this.state.items_lap_mingguan.map(
                  (item) =>
                    <li key={item.nama_laporan}>
                      <ListSubmisi laporan={item} username={this.props.username} mahasiswa={this.props.mahasiswa} />
                    </li>,
              )
            }
            <br></br>
          </ul>
          {/* <br></br> */}
          {/* <h4>
                    Laporan Akhir Praktikum:
          </h4>
          <GrayLine /> */}
          <ul style={{padding: 0, listStyleType: 'none', marginBottom: 0}}>
            {
              // If search input is valid, return data
              this.state.items_lap_akhir.map(
                  (item) =>
                    <li key={item.nama_laporan}>
                      <ListSubmisiAkhir laporan={item} username={this.props.username} mahasiswa={this.props.mahasiswa} />
                    </li>,
              )
            }
          </ul>
          <br></br>
          <h4>
                    Evaluasi Akhir Praktikum:
          </h4>
          <ul style={{padding: 0, listStyleType: 'none', marginBottom: 0}}>
            {
              // If search input is valid, return data
              this.state.items_lap_borang.map(
                  (item) =>
                    <li key={item.nama_laporan}>
                      <ListSubmisiBorang laporan={item} username={this.props.username} mahasiswa={this.props.mahasiswa} />
                    </li>,
              )
            }
          </ul>
        </>
      );
    }
}
