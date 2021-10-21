import React, {Component} from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar/Navbar';
import FilterLaporan from './FilterLaporan/FilterLaporan';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Pagination from 'material-ui-flat-pagination';
import IconButton from '@material-ui/core/IconButton';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

const HeaderOrange = styled.div`
  position: sticky;
  top: 0;
  z-index: -1;
  margin-bottom: -13vw;
`;


/** Component untuk page laporan akhir */
class LaporanAkhir extends Component {
  /** Get data when component already mounted */
  componentDidMount() {
    // fetch('http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/')
    //     .then((tasksResponse) => {
    //       return tasksResponse.json();
    //     })
    //     .then((res) => {
    //       this.setState({
    //         rows: res,
    //         data: res,
    //         // selectedRows: res,
    //       });

    //     });
    //     console.log(this.state.offset)
    //     console.log(this.state.page)
    // this.setState({selectedRows : this.state.tempRows}) // masih memakai rows sementara
    this.getMahasiswa();
    this.getLembaga();
  }

  handleClick(offset, page) {
    this.setState({offset});
    this.setState({page});
  }

  getLembaga() {
    axios
        .get('http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/')
        .then((res) => {
          this.setState(
              {
                allLembaga: res.data,
              },
              () => this.setState({isLoaded: true}),
          );
        });
  }

  getMahasiswa() {
    axios
        .get('http://ppl-berkah-backend.herokuapp.com/api/v1/laporan-akhir-db/')
        .then((res) => {
          this.setState({
            mahasiswaData: res.data,
            selectedRows: res.data,
          }, () => this.setState({isLoaded: true}));
        });
  }

  searchMahasiswa = (event) => {
    let updatedList = this.state.filteredRows;
    updatedList = updatedList.filter(function(item) {
      return (
        item.mahasiswa.user.full_name
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({selectedRows: updatedList});
  };

  /** State of the component. */
  state = {
    isLoaded: false,
    tempRows: [
      {
        nama: 'Anggora',
        npm: 111111,
        tema: 'Lingkungan',
        institusi: '',
        tahun: 30,
        lembaga: '',
      },
      {nama: 'Kamil', npm: 171717},
      {nama: 'Kamil', npm: 171717},
      {nama: 'Kamil', npm: 171717},
      {nama: 'Kamil', npm: 171717},
      {nama: 'Kamil', npm: 171717},
      {nama: 'Kamil', npm: 171717},
      {nama: 'Kamil', npm: 171717},
      {nama: 'Kamil', npm: 171717},
      {nama: 'Kamil', npm: 171717},
      {nama: 'Kamil', npm: 171717},
      {nama: 'Kamil', npm: 171717},
      {id: 20, nama: 'Kamil', npm: 171717},
      {id: 20, nama: 'Kamil', npm: 171717},
    ],
    mahasiswaData: [
      {
        mahasiswa: {user: {full_name: ''}, npm: 0},
        laporan_akhir: [{id: 0, jenis_praktikum: ''}],
      },
    ],
    offset: 0,
    page: 1,
    tema: '',
    institusi: '',
    tahun: '',
    lembaga: '',
    selectedRows: [
      {
        mahasiswa: {user: {full_name: ''}, npm: 0},
        laporan_akhir: [{id: 0, jenis_praktikum: ''}],
      },
    ],
    filteredRows: [
      {
        mahasiswa: {user: {full_name: ''}, npm: 0},
        laporan_akhir: [{id: 0, jenis_praktikum: ''}],
      },
    ],
    label: '',
    fields: {
      jenis_praktikum: '',
      nama_laporan: '',
      npm_mahasiswa: '',
      periode_praktikum: '',
    },
    errors: {},
    open: false,
    isLoggedIn: this.props.auth,
    admin: this.props.admin,
    allLembaga: [{id: 0, nama: ''}],
  };

  // filtering laporan that matches the filter states
  laporanFiltering = () => {
    let filteringRows = this.state.mahasiswaData;
    if (this.state.tema !== '') {
      filteringRows = filteringRows.filter(
          (laporan) =>
            laporan.mahasiswa.supervisor_lembaga.lembaga.tema.id ===
          this.state.tema,
      );
    }
    if (this.state.institusi !== '') {
      filteringRows = filteringRows.filter(
          (laporan) =>
            laporan.mahasiswa.supervisor_lembaga.lembaga.institusi.id ===
          this.state.institusi,
      );
    }
    if (this.state.tahun !== '') {
      filteringRows = filteringRows.filter(
          (laporan) =>
            (laporan.laporan_akhir[0] &&
            laporan.laporan_akhir[0].waktu_submisi &&
            laporan.laporan_akhir[0].waktu_submisi.slice(6, 10) ===
            this.state.tahun.toString()) ||
          (laporan.laporan_akhir[1] &&
            laporan.laporan_akhir[1].waktu_submisi &&
            laporan.laporan_akhir[1].waktu_submisi.slice(6, 10) ===
            this.state.tahun.toString()),
      );
    }
    if (this.state.lembaga !== '') {
      filteringRows = filteringRows.filter(
          (laporan) =>
            laporan.mahasiswa.supervisor_lembaga.lembaga.id === this.state.lembaga,
      );
    }
    this.setState({filteredRows: filteringRows, selectedRows: filteringRows});
  };

  // setting the filter states as given by FilterLaporan
  temaLaporan = (value) => {
    this.setState({tema: value}, () => {
      this.laporanFiltering();
    });
  };
  institusiLaporan = (value) => {
    this.setState({institusi: value}, () => {
      this.laporanFiltering();
    });
  };
  tahunLaporan = (value) => {
    this.setState({tahun: value}, () => {
      this.laporanFiltering();
    });
  };
  lembagaLaporan = (value) => {
    this.setState({lembaga: value}, () => {
      this.laporanFiltering();
    });
  };

  /**
   * dibawah ini untuk kebutuhan kelola laporan praktikum
   */

  handleClickOpen(action) {
    let label = '';
    if (action === 'add') {
      label = 'Tambah';
      const fields = this.state.fields;
      fields['nama_laporan'] = '';
      fields['jenis_praktikum'] = '';
      fields['periode_praktikum'] = '';
      fields['npm_mahasiswa'] = '';
    } else if (action === 'edit') label = 'Edit';
    this.setState({
      open: true,
      label: label,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  editLaporan(laporan, npm_mahasiswa) {
    const fields = this.state.fields;
    fields['nama_laporan'] = laporan.nama_laporan;
    fields['jenis_praktikum'] = laporan.jenis_praktikum;
    fields['periode_praktikum'] = laporan.periode_praktikum;
    fields['npm_mahasiswa'] = npm_mahasiswa;
    this.handleClickOpen('edit');
    this.setState({
      fields,
      default_npm: npm_mahasiswa,
      default_file: laporan.laporan_akhir,
      idLaporanUpdate: laporan.id,
    });
  }

  handleChange(field, e) {
    const fields = this.state.fields;
    if (field === 'file') {
      // console.log(URL.createObjectURL(e.target.files[0]));
      this.toBase64(e.target.files[0]).then((result) => {
        this.setState({base64: result});
        fields[field] = this.state.base64;
      });
    }
    fields[field] = e.target.value;
    // if (this.handleValidation()) this.setState({fields});
  }

  handleValidation() {
    const fields = this.state.fields;
    const errors = {};
    let formIsValid = true;

    // nama laporan
    if (!fields['nama_laporan']) {
      formIsValid = false;
      errors['nama_laporan'] = 'nama laporan tidak boleh kosong';
    }

    // mahasiswa
    if (!fields['npm_mahasiswa']) {
      formIsValid = false;
      errors['npm_mahasiswa'] = 'mahasiswa tidak boleh kosong';
    }

    // jenis praktikum
    if (!fields['jenis_praktikum']) {
      formIsValid = false;
      errors['jenis_praktikum'] = 'jenis laporan tidak boleh kosong';
    }

    // lembaga
    if (!fields['lembaga_id']) {
      formIsValid = false;
      errors['lembaga_id'] = 'lembaga tidak boleh kosong';
    }

    // periode praktikum
    if (!fields['periode_praktikum']) {
      formIsValid = false;
      errors['periode_praktikum'] = 'periode praktikum tidak boleh kosong';
    }
    if (fields['periode_praktikum'] !== undefined) {
      if (!fields['periode_praktikum'].match(/^[0-9]+\/[0-9]+/)) {
        formIsValid = false;
        errors['periode_praktikum'] = 'tahun tidak valid';
      }
    }

    // file
    if (!fields['file']) {
      formIsValid = false;
      errors['file'] = 'file tidak boleh kosong';
    }

    // this.setState({errors});
    return formIsValid;
  }

  deleteLaporanAkhir = (id) => {
    if (window.confirm('Anda yakin menghapus laporan ini?')) {
      axios.delete(
          'http://ppl-berkah-backend.herokuapp.com/api/v1/laporan-akhir/' + id + '/',
      ).then((response) => {
        if (response.status === 204) {
          window.location.reload(true);
        }
      }).catch((error) => {
        alert('Error');
      });
    }
  };

  // checkInDB(fields) {

  // }

  postToBackend(action) {
    if (this.handleValidation()) {
      console.log(this.state.fields);
      if (action === 'Edit') {
        axios.put(
            'http://ppl-berkah-backend.herokuapp.com/api/v1/laporan-akhir/' +
            this.state.idLaporanUpdate +
            '/',
            this.state.fields,
        ).then((response) => {
          if (response.status === 200) {
            window.location.reload(true);
          }
        }).catch((error) => {
          alert('Error');
        });
        // .then((window.location.href = '/laporan-akhir'));
      }
      if (action === 'Tambah') {
        axios.post(
            `http://ppl-berkah-backend.herokuapp.com/api/v1/laporan-akhir/`,
            this.state.fields,
        ).then((response) => {
          if (response.status === 200) {
            window.location.reload(true);
          }
        }).catch((error) => {
          alert('Error');
        });
        // .then((window.location.href = '/laporan-akhir'));
      }
      this.setState({open: false});
    } else {
      alert('Form Error');
      // this.setState({open: false});
    }
  }

  getLaporan(linkLaporan) {
    // console.log(linkLaporan);
    if (linkLaporan) {
      window.open(`http://ppl-berkah-backend.herokuapp.com${linkLaporan}`);
    }
  }

  /** Render component.
   * @return {string} - rendered markup code
   */
  render() {
    const theme = createMuiTheme();
    const mahasiswaForAdd = [];
    const mahasiswaForEdit = [];
    let allMahasiswaPraktikum = [];
    this.state.mahasiswaData.map((row) => {
      if (row.laporan_akhir.length !== 2) {
        mahasiswaForAdd.push(row.mahasiswa);
      }
      mahasiswaForEdit.push(row.mahasiswa);
    });
    if (this.state.label === 'Tambah') allMahasiswaPraktikum = mahasiswaForAdd;
    if (this.state.label === 'Edit') allMahasiswaPraktikum = mahasiswaForEdit;
    let rememberNPM;
    let rememberFile;
    const noAction = <div></div>;
    let tableAction;
    tableAction = this.state.selectedRows
        .slice(this.state.offset, this.state.page * 10)
        .map((row, index) => {
          let download1;
          let download2;
          let edit1;
          let edit2;
          let delete1;
          let delete2;
          let length;
          if (row.laporan_akhir !== null) {
            length = row.laporan_akhir.length;
          }
          if (length === 2) {
            let laporan1; let laporan2;
            if (row.laporan_akhir[0].jenis_praktikum === 'Praktikum 1') {
              laporan1 = row.laporan_akhir[0];
              laporan2 = row.laporan_akhir[1];
            } else if (row.laporan_akhir[0].jenis_praktikum === 'Praktikum 2') {
              laporan2 = row.laporan_akhir[0];
              laporan1 = row.laporan_akhir[1];
            }

            // download button
            download1 = (
              <div>
                <IconButton
                  aria-label="search"
                  onClick={() =>
                    this.getLaporan(laporan1.laporan_akhir)
                  }
                >
                  <GetAppIcon />
                </IconButton>
              </div>
            );
            download2 = (
              <div>
                <IconButton
                  aria-label="search"
                  onClick={() =>
                    this.getLaporan(laporan2.laporan_akhir)
                  }
                >
                  <GetAppIcon />
                </IconButton>
              </div>
            );

            // delete button
            delete1 = (
              <div>
                <IconButton
                  aria-label="search"
                  onClick={() => this.deleteLaporanAkhir(laporan1.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            );
            delete2 = (
              <div>
                <IconButton
                  aria-label="search"
                  onClick={() => this.deleteLaporanAkhir(laporan2.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            );

            // edit button
            edit1 = (
              <div>
                <IconButton
                  aria-label="search"
                  onClick={() =>
                    this.editLaporan(laporan1, row.mahasiswa.npm)
                  }
                >
                  <EditIcon />
                </IconButton>
              </div>
            );

            edit2 = (
              <div>
                <IconButton
                  aria-label="search"
                  onClick={() =>
                    this.editLaporan(laporan2, row.mahasiswa.npm)
                  }
                >
                  <EditIcon />
                </IconButton>
              </div>
            );
          } else if (length === 1) {
            const checkPrak = row.laporan_akhir[0].jenis_praktikum;
            if (checkPrak === 'Praktikum 1') {
            // download button
              download2 = noAction;
              download1 = (
                <div>
                  <IconButton
                    aria-label="search"
                    onClick={() =>
                      this.getLaporan(row.laporan_akhir[0].laporan_akhir)
                    }
                  >
                    <GetAppIcon />
                  </IconButton>
                </div>
              );

              // delete button
              delete2 = noAction;
              delete1 = (
                <div>
                  <IconButton
                    aria-label="search"
                    onClick={() =>
                      this.deleteLaporanAkhir(row.laporan_akhir[0].id)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              );

              // edit button
              edit2 = noAction;
              edit1 = (
                <div>
                  <IconButton
                    aria-label="search"
                    onClick={() =>
                      this.editLaporan(row.laporan_akhir[0], row.mahasiswa.npm)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </div>
              );
            } else if (checkPrak === 'Praktikum 2') {
            // download button
              download2 = (
                <IconButton
                  aria-label="search"
                  onClick={() =>
                    this.getLaporan(row.laporan_akhir[0].laporan_akhir)
                  }
                >
                  <GetAppIcon />
                </IconButton>
              );
              download1 = noAction;

              // delete button
              delete2 = (
                <div>
                  <IconButton
                    aria-label="search"
                    onClick={() =>
                      this.deleteLaporanAkhir(row.laporan_akhir[0].id)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              );
              delete1 = noAction;

              // edit button
              edit2 = (
                <div>
                  <IconButton
                    aria-label="search"
                    onClick={() =>
                      this.editLaporan(row.laporan_akhir[0], row.mahasiswa.npm)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </div>
              );
              edit1 = noAction;
            } else {
              download1 = noAction;
              download2 = noAction;
              delete1 = noAction;
              delete2 = noAction;
              edit1 = noAction;
              edit2 = noAction;
            }
          }

          return (
            <TableRow key={index}>
              <TableCell align="center">{index}</TableCell>
              <TableCell align="center">{row.mahasiswa.user.full_name}</TableCell>
              <TableCell align="center">{row.mahasiswa.npm}</TableCell>
              <TableCell align="center">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  {download1}
                  {delete1}
                  {edit1}
                </div>
              </TableCell>
              <TableCell align="center">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  {download2}
                  {delete2}
                  {edit2}
                </div>
              </TableCell>
            </TableRow>
          );
        });

    if (this.state.label === 'Edit') {
      rememberNPM = (
        <div>
          <p>
            {'NPM Mahasiswa yang dirubah: '}
            {this.state.default_npm}
          </p>
        </div>
      );
      rememberFile = (
        <div>
          <p>
            Filenya yang dirubah:{' '}
            <a
              style={{color: 'blue'}}
              onClick={() => this.getLaporan(this.state.default_file)}
            >
              Download File
            </a>
          </p>
        </div>
      );
    }

    return (
      <div>
        <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin}/>
        <HeaderOrange >
          <img
            style={{width: '100vw'}}
            src={require('../../assets/MKPPL/Orange_Header.png')}
            alt="header"
          />
        </HeaderOrange>
        <Grid className="root" container spacing={3}>
          <Grid item xs={12} sm={3} md={3}>
            <Paper className="filter-laporan-container">
              <FilterLaporan
                id="FilterLaporan"
                temaLaporan={this.temaLaporan}
                institusiLaporan={this.institusiLaporan}
                tahunLaporan={this.tahunLaporan}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={9} md={9}>
            <Paper className="laporan-container">
              <Breadcrumbs style={{margin: '1.2vw 0 0 1.2vw'}} separator=">" aria-label="breadcrumb">
                <Link color="inherit" href="/" >
                  Home
                </Link>
                <Link color="inherit" href="/laporan-Akhir">
                  Laporan Akhir
                </Link>
              </Breadcrumbs>
              <Grid container spacing={3} style={{padding: '20px 40px'}}>
                <Grid item xs={6} sm={6} md={6}>
                  <Paper
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: 400,
                      backgroundColor: '#F2F2F2',
                    }}
                  >
                    <IconButton
                      type="submit"
                      style={{padding: 10}}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                    <InputBase
                      style={{marginLeft: 10, flex: 1}}
                      placeholder="Cari berdasarkan nama"
                      inputProps={{'aria-label': 'cari berdasarkan nama'}}
                      onChange={this.searchMahasiswa}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={6} md={6} style={{textAlign: 'right'}}>
                  <div onClick={() => this.handleClickOpen('add')}>
                    <Button
                      variant="contained"
                      color='primary'
                    >Tambah Laporan</Button>
                  </div>
                </Grid>
              </Grid>

              {this.state.isLoaded?
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">No.</TableCell>
                      <TableCell align="center">Nama</TableCell>
                      <TableCell align="center">NPM</TableCell>
                      <TableCell align="center">Laporan 1</TableCell>
                      <TableCell align="center">Laporan 2</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{tableAction}</TableBody>
                </Table>
              </TableContainer> :
              <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress style={{color: '#F15B15'}} />
              </div>
              }
            </Paper>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <Pagination
                limit={10}
                offset={this.state.offset}
                total={100}
                page={1}
                onClick={(e, offset, page) => this.handleClick(offset, page)}
              />
            </MuiThemeProvider>
          </Grid>
        </Grid>

        {/* Pop Up form laporan praktikum */}
        <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            Form {this.state.label} Laporan Praktikum
          </DialogTitle>
          <DialogContent>
            <TextField
              name="nama_laporan"
              label="Nama Laporan"
              value={console.log(this.state.fields['nama_laporan'])}
              variant="outlined"
              style={{width: '100%'}}
              onChange={this.handleChange.bind(this, 'nama_laporan')}
            />
            <p style={{color: 'red'}}>{this.state.errors['nama_laporan']}</p>
            {rememberNPM}
            <Autocomplete
              id="combo-box-demo"
              options={allMahasiswaPraktikum}
              getOptionLabel={(option) => option.npm}
              renderOption={(option) => (
                <React.Fragment key={option}>
                  {option.npm} - {option.user.full_name}
                </React.Fragment>
              )}
              // inputValue={this.state.default_npm}
              onInputChange={(event, newInputValue) => {
                const {fields} = this.state;
                fields['npm_mahasiswa'] = newInputValue;
                this.setState({
                  fields,
                });
                // this.handleValidation('npm_mahasiswa');
              }}
              style={{width: '100%'}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Cari Berdasarkan NPM"
                  variant="outlined"
                />
              )}
            />
            <p style={{color: 'red'}}>{this.state.errors['npm mahasiswa']}</p>
            <TextField
              name="jenis_praktikum"
              label="Jenis Praktikum"
              variant="outlined"
              style={{width: '100%'}}
              value={console.log(this.state.fields['jenis_praktikum'])}
              onChange={this.handleChange.bind(this, 'jenis_praktikum')}
              select
            >
              <MenuItem value="Praktikum 1">Praktikum 1</MenuItem>
              <MenuItem value="Praktikum 2">Praktikum 2</MenuItem>
            </TextField>
            <p style={{color: 'red'}}>{this.state.errors['jenis_laporan']}</p>
            <TextField
              label="Pilih Lembaga"
              variant="outlined"
              style={{width: '100%'}}
              // value={this.state.fields["lembaga_id"]}
              onChange={(event) => {
                const {fields} = this.state;
                fields['lembaga_id'] = event.target.value;
                this.setState({
                  fields,
                });
                // this.handleValidation('lembaga_id');
                console.log(fields['lembaga_id']);
              }}
              select
            >
              {this.state.allLembaga.map((lembaga) => (
                <MenuItem value={lembaga.id}>{lembaga.nama}</MenuItem>
              ))}
            </TextField>
            <p style={{color: 'red'}}>{this.state.errors['lembaga_id']}</p>
            <TextField
              name="periode_praktikum"
              label="Periode Praktikum Ex: 2019/2020"
              value={console.log(this.state.fields['periode_praktikum'])}
              variant="outlined"
              style={{width: '100%'}}
              onChange={this.handleChange.bind(this, 'periode_praktikum')}
            />
            <p style={{color: 'red'}}>
              {this.state.errors['periode_praktikum']}
            </p>
            {rememberFile}
            <input
              type="file"
              style={{width: '100%'}}
              onChange={this.handleChange.bind(this, 'file')}
            />
          </DialogContent>
          <DialogActions>
            <div onClick={this.handleClose}>
              <Button
                variant="contained"
                color='primary'
              >Cancel</Button>
            </div>
            <Button
              variant="contained"
              color='primary'
              onClick={() => {
                this.postToBackend(this.state.label)
                ;
              }}
            >{this.state.label}</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default LaporanAkhir;
