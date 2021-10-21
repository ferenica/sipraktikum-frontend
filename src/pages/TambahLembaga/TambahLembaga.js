import React, {Component, createRef} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';
import FormHelperText from '@material-ui/core/FormHelperText';

const HeaderContainer = styled.div`
position: sticky;
top: 0;
z-index: -1;
margin-bottom: -10vw;
`;

/**
 * Page to add Lembaga data
 * @param {*} res
 */
class TambahLembaga extends Component {
  state = {
    temaData: [{id: 0, nama: ''}],
    institusiData: [{id: 0, nama: ''}],
    namaForm: {
      value: '',
      helperText: '',
      isValid: true,
    },
    deskripsiForm: {
      value: '',
      helperText: '',
      isValid: true,
    },
    jenisPelayananForm: {
      value: '',
      helperText: '',
      isValid: true,
    },
    temaForm: {
      value: '',
      helperText: '',
      isValid: true,
    },
    institusiForm: {
      value: '',
      helperText: '',
      isValid: true,
    },
    jenisPraktikumForm: {
      value: '',
      helperText: '',
      isValid: true,
    },
    beneficiariesForm: {
      value: '',
      helperText: '',
      isValid: true,
    },
    alamatForm: {
      value: '',
      helperText: '',
      isValid: true,
    },
  };

  namaInput = createRef();
  deskripsiInput = createRef();
  jenisPelayananInput = createRef();
  temaInput = createRef();
  institusiInput = createRef();
  jenisPraktikumInput = createRef();
  beneficiariesInput = createRef();
  alamatInput = createRef();

  handleSimpanButton = () => {
    try {
      this.validateField();
      this.postToBackend();
    } catch {}
  }

  validateField = () => {
    const state = {...this.state};
    delete state['temaData'];
    delete state['institusiData'];

    let isError = false;
    Object.entries(state).forEach(([key, value]) => {
      if (value.value === '' || value.value.length === 0) {
        this.setState({
          [key]: {
            value: value.value,
            helperText: 'Tidak boleh kosong',
            isValid: false,
          },
        });
        isError = true;
      } else {
        this.setState({
          [key]: {
            value: value.value,
            helperText: '',
            isValid: true,
          },
        });
      }
    });

    if (isError) throw new Error();
  }

  /**
   * POST the data to API/Backend
   */
  postToBackend = () => {
    const user = {
      tema: {nama: this.state.temaForm.value},
      institusi: {nama: this.state.institusiForm.value},
      nama: this.state.namaForm.value,
      jenis_pelayanan: this.state.jenisPelayananForm.value,
      deskripsi_singkat: this.state.deskripsiForm.value,
      beneficaries: this.state.beneficiariesForm.value,
      alamat: this.state.alamatForm.value,
      praktikum_ke: this.state.jenisPraktikumForm.value,
    };

    // axios.post(`http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/`,  user ).then(window.location.href="/")
    fetch(`http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/`, {method: 'POST', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(user)} ).then(this.handleRedirect);
  }

  handleRedirect = (res) => {
    if ( res.status === 201 ) {
      window.location.href = '/';
    } else {
      console.log(res);
    }
  }

  /**
   * Get tema selections
   */
  getTema() {
    axios.get('http://ppl-berkah-backend.herokuapp.com/api/v1/tema/')
        .then((res) => {
          this.setState({
            temaData: res.data});
        });
  }

  /**
   * Get institusi selections
   */
  getInstitusi() {
    axios.get('http://ppl-berkah-backend.herokuapp.com/api/v1/institusi/')
        .then((res) => {
          this.setState({
            institusiData: res.data});
        });
  }

  /**
   * Autorun after the component is called
   */
  componentDidMount() {
    this.getTema();
    this.getInstitusi();
  }

  /**
   * Handle typing in text field
   * @param {*} event
   */
  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name + 'Form']: {
        value: value,
        helperText: this.state[name + 'Form'].helperText,
        isValid: this.state[name + 'Form'].isValid,
      },
    }, () => {
      if (name !== 'institusi' &&
      name !== 'tema' && name !== 'jenisPraktikum') {
        this[name + 'Input'].current.focus();
      }
    });
  }

  /**
   * Render the page
   * @return {Component} Component
   */
  render() {
    const StyledTextField = styled(TextField)({
      marginBottom: '15px',
      width: '100%',
    });

    const StyledFormControl = styled(FormControl)({
      width: '100%',
      marginBottom: '15px',
    });

    const OrangeTypography = styled(Typography)({
      color: '#FF8326',
      textAlign: 'center',
      fontWeight: 'bold',
    });

    const StyledDivider = styled(Divider)({
      backgroundColor: '#FF8326',
      height: '2px',
      width: '500px',
      margin: 'auto',
      marginBottom: '20px',
      marginTop: '20px',
    });

    const StyledContainer = styled(Container)({
      paddingTop: '2%',
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      marginTop: '3vh',
      marginBottom: '2.5rem',
      borderRadius: 10,
      boxShadow:
      `6px 0px 8px 0 rgba(0, 0, 0, 0.05),
      6px 0px 6px 0 rgba(0, 0, 0, 0.03),
      -6px 0px 8px 0 rgba(0, 0, 0, 0.05),
      -6px 0px 6px 0 rgba(0, 0, 0, 0.03)`,
      width: '800px',
    });

    const BatalButton = styled(Button)({
      marginRight: '1.5rem',
    });

    return (
      <div>
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin} />
        <HeaderContainer>
            <img
                style={{width: '100vw'}}
                src={require('../../assets/MKPPL/Orange_Header.png')}
                alt="header"
            />
        </HeaderContainer>
        <StyledContainer fixed>
          <Grid container spacing={3}
            style={{'paddingLeft': '100px', 'paddingRight': '100px'}}>
            <Grid item xs={12}>
              <OrangeTypography variant="h5">Tambah Lembaga</OrangeTypography>
              <StyledDivider />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                inputRef={this.namaInput}
                error={!this.state.namaForm.isValid}
                helperText={this.state.namaForm.helperText}
                name="nama"
                label="Nama Lembaga"
                variant="standard"
                onChange={this.handleInputChange}
                value={this.state.namaForm.value} />
              <StyledTextField
                inputRef={this.alamatInput}
                error={!this.state.alamatForm.isValid}
                helperText={this.state.alamatForm.helperText}
                name="alamat"
                label="Alamat"
                variant="standard"
                onChange={this.handleInputChange}
                value={this.state.alamatForm.value} />
              <StyledTextField
                inputRef={this.beneficiariesInput}
                error={!this.state.beneficiariesForm.isValid}
                helperText={this.state.beneficiariesForm.helperText}
                name="beneficiaries"
                label="Beneficiaries"
                variant="standard"
                onChange={this.handleInputChange}
                value={this.state.beneficiariesForm.value} />
              <StyledTextField
                inputRef={this.jenisPelayananInput}
                error={!this.state.jenisPelayananForm.isValid}
                helperText={this.state.jenisPelayananForm.helperText}
                name="jenisPelayanan"
                label="Jenis Pelayanan"
                variant="standard"
                onChange={this.handleInputChange}
                value={this.state.jenisPelayananForm.value}/>
              <StyledFormControl
                error={!this.state.institusiForm.isValid}
                variant="standard">
                <InputLabel shrink >Jenis Institusi</InputLabel>
                <Select

                  helperText={this.state.institusiForm.helperText}
                  onChange={this.handleInputChange}
                  value={this.state.institusiForm.value}
                  name='institusi'>
                  {
                    this.state.institusiData.map((institusi) => (
                      <MenuItem value={institusi.nama}>
                        {institusi.nama}
                      </MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText>
                  {this.state.institusiForm.helperText}
                </FormHelperText>
              </StyledFormControl>
              <StyledFormControl
                error={!this.state.temaForm.isValid}
                variant="standard">
                <InputLabel shrink >Tema</InputLabel>
                <Select
                  helperText={this.state.temaForm.helperText}
                  onChange={this.handleInputChange}
                  value={this.state.temaForm.value}
                  name="tema">
                  {
                    this.state.temaData.map((tema) => (
                      <MenuItem value={tema.nama}>
                        {tema.nama}
                      </MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText>
                  {this.state.temaForm.helperText}
                </FormHelperText>
              </StyledFormControl>
              <StyledFormControl
                error={!this.state.jenisPraktikumForm.isValid}
                variant="standard">
                <InputLabel shrink >Jenis Praktikum</InputLabel>
                <Select
                  name='jenisPraktikum'
                  onChange={this.handleInputChange}
                  value={this.state.jenisPraktikumForm.value}>
                  <MenuItem value='1'>Praktikum 1</MenuItem>
                  <MenuItem value='2'>Praktikum 2</MenuItem>
                </Select>
                <FormHelperText>
                  {this.state.jenisPraktikumForm.helperText}
                </FormHelperText>
              </StyledFormControl>
              <StyledTextField
                inputRef={this.deskripsiInput}
                error={!this.state.deskripsiForm.isValid}
                helperText={this.state.deskripsiForm.helperText}
                name="deskripsi"
                label="Deskripsi Lembaga"
                variant="standard"
                onChange={this.handleInputChange}
                value={this.state.deskripsiForm.value} />
            </Grid>
            <Grid item xs={12}>
              <div style={{textAlign: 'right', marginBottom: '30px'}}>
                <BatalButton
                  name='batal-button'
                  variant="outlined"
                  color='primary'
                  disableElevation
                  href='/'>
                    Batal
                </BatalButton>
                <Button
                  name='simpan-button'
                  variant="contained"
                  color='primary'
                  onClick={this.handleSimpanButton}
                  disableElevation>
                    Simpan
                </Button>
              </div>
            </Grid>
          </Grid>
        </StyledContainer>
      </div>
    );
  }
}

export default TambahLembaga;

TambahLembaga.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
