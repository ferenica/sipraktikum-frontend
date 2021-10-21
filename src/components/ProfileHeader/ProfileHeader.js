import React, {Component} from 'react';
import styled from 'styled-components';
import ListSubmisi from './../ListSubmisi/ListSubmisi';
import ListSubmisiAkhirBorang from './../ListSubmisi/ListSubmisiAkhirBorang';
import Chips from '../MKPPL/Chips/Chips';

// Styled components for search bar
const GrayLine = styled.div`
    border: 1px solid #DEDEDE;
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
export default class ProfileHeader extends Component {
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
  }
  /** */
  render() {
    let jenisPraktikum = '';

    try {
      jenisPraktikum = this.props.praktikum.jenis_praktikum;
    } catch (error) {
      console.log();
    }
    return (
      <>
        <h1>
          {this.props.mahasiswa.user.username}
        </h1>
        <Centered>
          <h4 style={{color: '#4F4F4F'}}>
                Status: {' '}
            <StatusSpan>
              <Chips label='Aktif' />
            </StatusSpan>
          </h4>
        </Centered>
        <Centered>
          <h4 style={{color: '#4F4F4F'}}>
              Jenis Praktikum: <b>{ jenisPraktikum }</b>
          </h4>
        </Centered>
        <GrayLine/>
        <br></br>
        <h4>
            Perkembangan Praktikum:
        </h4>
        <GrayLine/>
        <ul style={{padding: 0, listStyleType: 'none', marginBottom: 0}}>
          {
            // If search input is valid, return data
            this.state.items_lap_mingguan.map(
                (item) =>
                  <li key={item.nama_laporan}>
                    <ListSubmisi laporan={item} username={this.props.username} mahasiswa={this.props.mahasiswa}/>
                  </li>,
            )
          }
        </ul>
        <br></br>
        <h4>
            Laporan Akhir Praktikum:
        </h4>
        <GrayLine/>
        <ul style={{padding: 0, listStyleType: 'none', marginBottom: 0}}>
          {
            // If search input is valid, return data
            this.state.items_lap_akhir.map(
                (item) =>
                  <li key={item.nama_laporan}>
                    <ListSubmisiAkhirBorang laporan={item} username={this.props.username} mahasiswa={this.props.mahasiswa} action={'Akhir'}/>
                  </li>,
            )
          }
        </ul>
        <br></br>
        <h4>
            Evaluasi Akhir Praktikum:
        </h4>
        <GrayLine/>
        <ul style={{padding: 0, listStyleType: 'none', marginBottom: 0}}>
          {
            // If search input is valid, return data
            this.state.items_lap_borang.map(
                (item) =>
                  <li key={item.nama_laporan}>
                    <ListSubmisiAkhirBorang laporan={item} username={this.props.username} mahasiswa={this.props.mahasiswa} action={'Borang'}/>
                  </li>,
            )
          }
        </ul>
      </>
    );
  }
}
