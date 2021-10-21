import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import RiwayatPraktikum from './RiwayatPraktikum';
import ListDetail from './ListDetail';
import Button from '@material-ui/core/Button';

const HeaderContainer = styled.div`
position: sticky;
top: 0;
z-index: -1;
margin-bottom: -10vw;
`;

const OrangeLine = styled.div`
  border: 1px solid #FF8326;
  width: 35%;
  margin-left: auto;
  margin-right: auto;
`;

const GrayLine = styled.div`
  border-bottom: 1px solid #DEDEDE;
  width: 79%;
`;

const Riwayat = styled.div`
font-family: Nunito Sans;
font-style: normal;
font-weight: bold;
font-size: 18px;
`;

class PanggilDetail extends Component {
  state = {}

  componentDidMount() {
    this.getJumlahMahasiswa(this.props.id.id, this.props.periode);
  }

  async getJumlahMahasiswa(id, periode){
      const requestOptions = {
        method: 'GET',
      };
      const awaitResponse = await fetch('http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/praktikum?lembaga=' + id + '&periode=' + periode, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              const initialItems = data;
              const items = initialItems;
              this.setState({
                MetaProducts3 : items,
                init3: 1
              });
            });
      return await awaitResponse;
  }

  renderMahasiswa(){
    if (this.state.MetaProducts3.count > 0) {
      return (
        <RiwayatPraktikum
          periode={this.props.periode}
          count={this.state.MetaProducts3.count}
          laporan={this.state.MetaProducts3}
        >
        </RiwayatPraktikum>);
    }

  }

  render() {
    return (this.state.init3 ? 
      <div>{this.renderMahasiswa()}</div>
    :
    <h1>Waiting for periode....</h1>);
  }
}

/**
 * Page Detail Lembaga
 * @param {*} nama
 * @param {Integer} id
 */
class DetailLembaga extends Component {
  state = {
    data: {institusi: [], tema: {}},
    data_2018_2019_ganjil: {data: []},
    isLoggedIn: this.props.auth,
    admin: this.props.admin,
    options: {
      chart: {
        id: 'apexchart-example',
      },
      xaxis: {
        categories: [2000, 20001, 2002, 2003, 2004, 2005, 2006, 2007],
      },
    },
    series: [{
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    }],
    period: []
  }

  async getPostAPI(id){
    const requestOptions = {
      method: 'GET',
    };
    const awaitResponse = await fetch('http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/' + id + '/', requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const initialItems = data;
            const items = initialItems;
            this.setState({
              MetaProducts : items,
              init: 1
            });
          });
    return await awaitResponse;
  }

  async getJumlahMahasiswa(id, periode){
    const requestOptions = {
      method: 'GET',
    };
    const awaitResponse = await fetch('http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/praktikum?lembaga=' + id + '&periode=' + periode, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const initialItems = data;
            const items = initialItems;
            this.setState({
              MetaProducts2 : items,
              init3: 1
            });
          });
    return await awaitResponse;
  }

  async getSemuaPeriode(){
    const requestOptions = {
      method: 'GET',
    };
    const awaitResponse = await fetch('http://ppl-berkah-backend.herokuapp.com/api/v1/periode', requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const initialItems = data.data;
            const items = initialItems;
            this.setState({
              period : items,
              init2: 1
            });
          });
    return await awaitResponse;
  }

  /**
   *
   */
  componentDidMount() {
    const {id} = this.props.match.params;
    this.getPostAPI(id);
  }

  renderJumlahMahasiswa(id, periode){
    if(this.state.init2 && (this.state.init3 === undefined)){
      this.getJumlahMahasiswa(id, periode);
    }else{
      return (
        <RiwayatPraktikum
          periode={periode}
          count={this.state.MetaProducts2.count}
          laporan={this.state.MetaProducts2}
        >
        </RiwayatPraktikum>
      );
    }
  }

  renderPeriode(){
    if(this.state.init && (this.state.init2 === undefined)){
      this.getSemuaPeriode();
    }
    return this.state.init2 ? <div>{this.renderLembaga()}</div> : <div><br></br><h1>Please wait for a while....</h1></div>
  }

  renderLembaga(){
    return (
    <div>
      <Navbar
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin}
          isDosen={this.props.isDosen}/>
        <HeaderContainer>
            <img
                style={{width: '100vw'}}
                src={require('../../assets/MKPPL/Orange_Header.png')}
                alt="header"
            />
        </HeaderContainer>
        <Container style={{
          zIndex: 10,
          paddingTop: '2%',
          minHeight: '100vh',
          backgroundColor: '#FFFFFF',
          marginTop: '3vh',
          borderRadius: 10,
          boxShadow:
            `6px 0px 8px 0 rgba(0, 0, 0, 0.05), 
            6px 0px 6px 0 rgba(0, 0, 0, 0.03),
            -6px 0px 8px 0 rgba(0, 0, 0, 0.05), 
            -6px 0px 6px 0 rgba(0, 0, 0, 0.03)`,
          width: '1000px',
        }} fixed>

          <div style={{marginLeft: '4%'}}>
            <h1
              className="judul"
              style={{color: '#FF8326', fontFamily: 'Nunito Sans'}}>
                Detail Lembaga
            </h1>
            <OrangeLine className='garis' />
            <br></br><br></br>
            <Breadcrumbs separator=">" aria-label="breadcrumb">
              <Link color="inherit" >
                Detail Lembaga
              </Link>
              <Link
                color="#FF8326"
                style={{
                  textDecoration: 'underline',
                  color: '#FF8326',
                  fontWeight: 'bold'}}>
                {this.state.MetaProducts.nama}
              </Link>
            </Breadcrumbs>
          </div>
          <div
            className="detail-lembaga"
            style={{marginLeft: '5%', marginTop: '5%', marginRight: '5%'}}>
            <Container item style={{textAlign: 'center'}}>
              <Grid container xs={12} justify="center">
                <h1 style={{fontFamily: 'Nunito Sans'}}>
                  {this.state.MetaProducts.nama}
                </h1>
                <br></br>
                <ListDetail
                  detail="Jenis Institusi"
                  value={this.state.MetaProducts.institusi.nama}></ListDetail>
                <ListDetail
                  detail="Jenis Pelayanan"
                  value={this.state.MetaProducts.jenis_pelayanan}></ListDetail>
                <ListDetail
                  detail="Beneficaries"
                  value={this.state.MetaProducts.beneficaries}></ListDetail>
                <ListDetail
                  detail="Tema Praktikum"
                  value={this.state.MetaProducts.tema.nama}></ListDetail>
                <ListDetail
                  detail="Jenis Praktikum"
                  value={this.state.MetaProducts.praktikum_ke}></ListDetail>
                <ListDetail
                  detail="Deskripsi"
                  value={this.state.MetaProducts.deskripsi_singkat}>
                  </ListDetail>

                {
                  this.props.isAdmin ? (
                    <Button secondary
                      style={{marginBottom: '1.5rem'}}
                      variant='outlined'
                      color='primary'
                      onClick={(props) => {
                        window.open('/kelola-lembaga/' + this.state.MetaProducts.id);
                      }}>
                      Edit
                    </Button>
                  ) : null
                }

              </Grid>
              <br></br>
              <Grid container spacing={2} style={{flexDirection: 'row'}}>
                <Riwayat>Riwayat Praktikum</Riwayat>
                <GrayLine></GrayLine>
              </Grid>
              <br></br><br></br>
              <div>
                {
                  this.state.init2 ?
                    this.state.period.map((periode) => {
                      if(this.state.init2 && (this.state.init3 === undefined)){
                        this.getJumlahMahasiswa(this.props.match.params.id, periode);
                      }else{
                        return (
                          <PanggilDetail
                            periode={periode}
                            id={this.props.match.params}>
                          </PanggilDetail>
                        );}
                      }
                    )
                   : <h1>Something goes wrong with the ajax</h1>
                }
              </div>
              </Container>
            <br></br>
          </div>
        </Container>
    </div>);
  }

  /**
   * @return {Component}
   */
  render() {
    return this.state.init ? <div>{this.renderPeriode()}</div> : <div><br></br><h1>Waiting...</h1></div>;
  }
}

export default DetailLembaga;

DetailLembaga.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isDosen: PropTypes.bool,
  data: PropTypes.object,
};
