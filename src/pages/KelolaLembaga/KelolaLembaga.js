import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

// Styled components
const HeaderContainer = styled.div`
position: sticky;
top: 0;
z-index: -1;
margin-bottom: -10vw;
`;

const BatalButton = styled(Button)({
  marginRight: '1.5rem',
});

/**
 * Redirection of LembagaCard's edit button
 */
class KelolaLembaga extends Component {
  /**
   * @constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      temaData: [{id: 0, nama: ''}],
      institusiData: [{id: 0, nama: ''}],
      file: [],
      base64: '',
      nama: '',
      deskripsi_singkat: '',
      jenis_pelayanan: '',
      tema: {nama: ''},
      institusi: {nama: ''},
      praktikum_ke: 0,
      alamat: '',
      beneficaries: '',
      lembagaId: '',
      last_praktikum: '',
      isLoggedIn: this.props.auth,
      admin: this.props.admin,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   *
   */
  postToBackend() {
    const user = {
      nama: this.state.nama,
      deskripsi_singkat: this.state.deskripsi_singkat,
      jenis_pelayanan: this.state.jenis_pelayanan,
      tema: this.state.tema,
      institusi: this.state.institusi,
      gambar: this.state.base64,
      praktikum_ke: this.state.praktikum_ke,
      beneficaries: this.state.beneficaries,
      alamat: this.state.alamat,
      last_praktikum: this.state.last_praktikum
    };

    // axios.put('http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/' + this.state.lembagaId + '/', user).then(window.location.href="/").catch(console.log("error"))
    fetch('http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/' + this.state.lembagaId + '/', {method: 'PUT', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(user)}).then(this.handleRedirect);
  }

  /**
   *
   */
  deleteToBackend() {
    // axios.delete('http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/' + this.state.lembagaId + '/').then(window.location.href="/")
    fetch(`http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/` + this.state.lembagaId + '/', {method: 'DELETE', headers: {
      'Content-Type': 'application/json',
    }} ).then(this.handleRedirect);
  }

  handleRedirect = (res) => {
    if ( res.status === 204 || res.status === 200 || res.status === 201 ) {
      // redirect here
      window.location.href = '/';
    } else {
      console.log(res);
    }
  }

  /**
   *
   */
  getTema() {
    axios.get('http://ppl-berkah-backend.herokuapp.com/api/v1/tema/')
        .then((res) => {
          this.setState({
            temaData: res.data});
        });
  }

  /** */
  getInstitusi() {
    axios.get('http://ppl-berkah-backend.herokuapp.com/api/v1/institusi/')
        .then((res) => {
          this.setState({
            institusiData: res.data});
        });
  }

  /**
   *
   */
  getLembaga(id) {
    axios.get('http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/' + id + '/')
        .then((res) => {
          axios({
            url: res.data.gambar,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
            const blob = new Blob([response.data]);
            this.toBase64(blob).then((result) => {
              this.setState({
                base64: result,
              });
            });
          });
          this.setState({
            lembagaId: res.data.id,
            nama: res.data.nama,
            jenis_pelayanan: res.data.jenis_pelayanan,
            deskripsi_singkat: res.data.deskripsi_singkat,
            tema: res.data.tema,
            alamat: res.data.alamat,
            beneficaries: res.data.beneficaries,
            file: res.data.gambar,
            praktikum_ke: res.data.praktikum_ke,
            institusi: res.data.institusi,
            last_praktikum: res.data.last_praktikum,
          });
        });
  }
  /** */
  componentDidMount() {
    const {id} = this.props.match.params;
    this.getLembaga(id);
    this.getTema();
    this.getInstitusi();
  }
  /**
   *
   */
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
    this.toBase64(event.target.files[0]).then((result) => {
      this.setState({
        base64: result,
      });
    });
  }

  /**
   * @return {Component}
   */
  render() {
    const StyledDivider = styled(Divider)({
      backgroundColor: '#FF8326',
      height: '2px',
      width: '500px',
      margin: 'auto',
      marginBottom: '20px',
      marginTop: '20px',
    });

    const OrangeTypography = styled(Typography)({
      color: '#FF8326',
      textAlign: 'center',
      fontWeight: 'bold',
    });

    const DeleteButton = styled(Button)({
      marginRight: '1.5rem',
    });

    return (
      <div>
        <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin}/>
        <HeaderContainer>
          <img
            style={{width: '100vw'}}
            src={require('../../assets/MKPPL/Orange_Header.png')}
            alt="header"
          />
        </HeaderContainer>
        <Container style={{
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
          width: '800px',
        }} fixed>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <OrangeTypography variant="h5">Kelola Lembaga</OrangeTypography>
              <StyledDivider />
            </Grid>
            <div style={{marginLeft: '4%'}}>
              <Breadcrumbs separator=">" aria-label="breadcrumb">
                <Link color="inherit" href="/" >
                    Home
                </Link>
                <Link color="inherit" >
                    Kelola Lembaga
                </Link>
              </Breadcrumbs>
            </div>
            
            <br></br>
            <br></br>
            <Grid item xs={12}>
              <Grid>
                <center><TextField name="nama" value={this.state.nama} label="Nama Lembaga" variant="standard"
                  style = {{width: 500}}
                  onChange={(event) => this.setState({
                    nama: event.target.value,
                  })}
                /></center>
              </Grid><br></br>
              <Grid>
                <center><TextField name="alamat" value={this.state.alamat} label="Alamat" variant="standard"
                  style = {{width: 500}}
                  onChange={(event) => this.setState({
                    alamat: event.target.value,
                  })}
                /></center>
              </Grid><br></br>
              <Grid>
                <center><TextField name="beneficaries" value={this.state.beneficaries} label="Beneficaries" variant="standard"
                  style = {{width: 500, height: 50}}
                  onChange={(event) => this.setState({
                    beneficaries: event.target.value,
                  })}
                /></center>
              </Grid><br></br>
              <Grid>
                <center><TextField name="jenis_pelayanan" value={this.state.jenis_pelayanan} label="Jenis Pelayanan" variant="standard"
                  style = {{width: 500}} onChange={(event) => this.setState({
                    jenis_pelayanan: event.target.value,
                  })}/></center>
              </Grid><br></br>
              <Grid>
                <center><TextField name="institusi" value={this.state.institusi.nama} label="Pilih Institusi" variant="standard"
                  style = {{width: 500}} onChange={(event) => this.setState({
                    institusi: {nama: event.target.value},
                  })} select>
                  {this.state.institusiData.map((institusi) => (
                    <MenuItem value={institusi.nama}>{institusi.nama}</MenuItem>
                  ))}
                </TextField></center>
              </Grid><br></br>
              <Grid>
                <center><TextField name="tema" value={this.state.tema.nama} name="tema" label="Pilih Tema" variant="standard"
                  style = {{width: 500}} onChange={(event) => this.setState({
                    tema: {nama: event.target.value},
                  })} select>
                  {this.state.temaData.map((tema) => (
                    <MenuItem value={tema.nama}>{tema.nama}</MenuItem>
                  ))}
                </TextField></center>
              </Grid><br></br>
              <Grid>
                <center><TextField name="praktikum_ke" value={this.state.praktikum_ke} name="praktikum" label="Praktikum" variant="standard"
                  style = {{width: 500}} onChange={(event) => this.setState({
                    praktikum_ke: event.target.value,
                  })} select>
                  <MenuItem value='1'>Praktikum 1</MenuItem>
                  <MenuItem value='2'>Praktikum 2</MenuItem>
                </TextField></center>
              </Grid><br></br>
              <Grid>
                <center><TextField name="deskripsi_singkat" value={this.state.deskripsi_singkat} label="Deskripsi Singkat" variant="standard" 
                    multiline rows={10} style = {{width: 500}} onChange={(event) => this.setState({
                    deskripsi_singkat: event.target.value,
                  })}/></center>
              </Grid>
            </Grid>
          </Grid>
          <br></br>
          <br></br>
          <Grid item xs={12}>
            <div style={{textAlign: 'center', marginBottom: '30px'}}>
              <center><BatalButton
                  name='batal-button'
                  color='primary'
                  disableElevation
                  href='/'>
                    Batal
                </BatalButton>
              <DeleteButton
                name='hapus-button'
                variant="outlined"
                color='primary'
                onClick={this.deleteToBackend.bind(this)}
                disableElevation>
                  Hapus
              </DeleteButton>
              <Button
                name='simpan-button'
                variant="contained"
                color='primary'
                onClick={this.postToBackend.bind(this)}
                disableElevation>
                  Simpan
              </Button></center>
            </div>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default KelolaLembaga;

KelolaLembaga.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
