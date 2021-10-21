import React, {Component} from 'react';
import Navbar from '../../../components/Navbar/Navbar';
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
import Pagination from 'material-ui-flat-pagination';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

/** Component untuk page laporan akhir */
class LaporanAkhir extends Component {
  /** State of the component. */
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      offset: 0,
      page: 1,
      open: false,
      nama_laporan: '',
      jenis_praktikum: '',
      npm_mahasiswa: '',
      base64: '',
      mahasiswa: null,
      selectedRows: [],
    };
    this.handleChangeFile = this.handleChangeFile.bind(this);
  }

  getLaporanAkhirAPI = () => {
    fetch('http://ppl-berkah-backend.herokuapp.com/api/v1/laporan-akhir/')
        .then((tasksResponse) => {
          return tasksResponse.json();
        })
        .then((res) => {
          this.setState({
            rows: res,
            selectedRows: res,
          });
        });
    console.log(this.state.offset);
    console.log(this.state.page);
  };

  getMahasiswaAPI = () => {
    const url = new URL(
        'http://ppl-berkah-backend.herokuapp.com/api/v1/mahasiswa',
    );
    const params = {};
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key]),
    );
    fetch(url)
        .then((tasksResponse) => {
          return tasksResponse.json();
        })
        .then((res) => {
          this.setState({
            mahasiswaData: res,
          });
        });
  };

  deleteLaporanAkhir = (id) => {
    if (window.confirm('Anda yakin menghapus laporan ini?')) {
      axios
          .delete(
              'http://ppl-berkah-backend.herokuapp.com/api/v1/laporan-akhir/' + id + '/',
          )
          .then((data) => {
            this.getLaporanAkhirAPI();
          });
    }
  };

  /** Get data when component already mounted */
  componentDidMount() {
    this.getLaporanAkhirAPI();
    this.getMahasiswaAPI();
  }
  /** */
  handleClick(offset, page) {
    this.setState({offset});
    this.setState({page});
  }

  searchMahasiswa = (event) => {
    let updatedList = this.state.rows;
    updatedList = updatedList.filter(function(item) {
      return (
        item.mahasiswa.user.full_name
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({selectedRows: updatedList});
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
      nama_laporan: '',
      jenis_praktikum: '',
      npm_mahasiswa: '',
      laporan_id: '',
      action: 'Tambah',
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  /** */
  handleChangeFile(event) {
    console.log(event.target.files[0]);
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
    this.toBase64(event.target.files[0]).then((result) => {
      this.setState({
        base64: result,
      });
    });
  }

  editLaporan = (row) => {
    this.setState({
      open: true,
      nama_laporan: row.nama_laporan,
      jenis_praktikum: row.jenis_praktikum,
      npm_mahasiswa: row.mahasiswa.npm,
      laporan_id: row.id,
      action: 'Edit',
    });
  };

  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  /** */
  postToBackend() {
    const data = {
      nama_laporan: this.state.nama_laporan,
      npm_mahasiswa: this.state.npm_mahasiswa,
      jenis_praktikum: this.state.jenis_praktikum,
      file: this.state.base64,
    };

    console.log(data);
    axios
        .post(
            `http://ppl-berkah-backend.herokuapp.com/api/v1/laporan-akhir/`,
            data,
        )
        .then((window.location.href = '/kelola-laporan-praktikum'));
  }
  /** */
  postToBackendUpdate() {
    const data = {
      nama_laporan: this.state.nama_laporan,
      npm_mahasiswa: this.state.npm_mahasiswa,
      jenis_praktikum: this.state.jenis_praktikum,
      file: this.state.base64,
    };

    console.log(data);
    axios
        .put(
            'http://ppl-berkah-backend.herokuapp.com/api/v1/laporan-akhir/' +
          this.state.laporan_id +
          '/',
            data,
        )
        .then((window.location.href = '/kelola-laporan-praktikum'));
  }

  /** Render component.
   * @return {string} - rendered markup code
   */
  render() {
    let submitButton;
    if (this.state.action === 'Tambah') {
      submitButton = (
        <Button
          variant="contained"
          color='primary'
          label="Submit"
          onClick={this.postToBackend} />
      );
    } else {
      submitButton = (
        <Button
          label="Update"
          variant="contained"
          color='primary'
          onClick={this.postToBackendUpdate}
        />
      );
    }
    return (
      <div>
        <Navbar />
        <div
          style={{
            'height': '200px',
            'backgroundColor': '#FF9C51',
            'background-size': 'cover',
          }}
        ></div>

        <Grid className="root" container spacing={3}>
          <Grid item xs={12} sm={3} md={3}>
            <Paper className="filter-laporan-container">
              {/* <FilterLaporan /> */}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={9} md={9}>
            <Paper className="laporan-container">
              <Grid container spacing={3} style={{padding: '20px 40px'}}>
                <Grid item xs={12} sm={6} md={6}>
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
                <Grid item xs={12} sm={6} md={6} style={{textAlign: 'right'}}>
                  <div onClick={this.handleClickOpen}>
                    <Button
                      variant="contained"
                      color='primary'
                      label="Tambah Laporan" />
                  </div>
                  {/* <div> */}
                  <Dialog
                    open={this.state.open}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Form {this.state.action} Laporan Praktikum
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        name="nama"
                        label="Nama Laporan"
                        value={this.state.nama_laporan}
                        variant="outlined"
                        style={{width: '100%'}}
                        onChange={(event) =>
                          this.setState({
                            nama_laporan: event.target.value,
                          })
                        }
                      />
                      <br></br>
                      <br></br>
                      <Autocomplete
                        id="combo-box-demo"
                        options={this.state.mahasiswaData}
                        getOptionLabel={(option) => option.npm}
                        renderOption={(option) => (
                          <React.Fragment key={option}>
                            {option.npm} - {option.user.full_name}
                          </React.Fragment>
                        )}
                        inputValue={this.state.npm_mahasiswa}
                        onInputChange={(event, newInputValue) => {
                          this.setState({
                            npm_mahasiswa: newInputValue,
                          });
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
                      <br></br>
                      <TextField
                        name="praktikum"
                        label="Jenis Praktikum"
                        variant="outlined"
                        style={{width: '100%'}}
                        value={this.state.jenis_praktikum}
                        onChange={(event) =>
                          this.setState({
                            jenis_praktikum: event.target.value,
                          })
                        }
                        select
                      >
                        <MenuItem value="Praktikum 1">Praktikum 1</MenuItem>
                        <MenuItem value="Praktikum 2">Praktikum 2</MenuItem>
                      </TextField>
                      <br></br>
                      <br></br>
                      <input
                        type="file"
                        style={{width: '100%'}}
                        onChange={this.handleChangeFile}
                      />
                    </DialogContent>
                    <DialogActions>
                      <div onClick={this.handleClose}>
                        <Button
                          variant="contained"
                          color='primary'
                          label="Cancel" />
                      </div>
                      {submitButton}
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">No.</TableCell>
                      <TableCell align="center">Nama</TableCell>
                      <TableCell align="center">NPM</TableCell>
                      <TableCell align="center">Laporan</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.selectedRows
                        .slice(this.state.offset, this.state.page * 10)
                        .map((row, index) => (
                          <TableRow key={index}>
                            <TableCell align="center">{index}</TableCell>
                            <TableCell align="center">
                              {row.mahasiswa.user.full_name}
                            </TableCell>
                            <TableCell align="center">
                              {row.mahasiswa.npm}
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                type="submit"
                                style={{padding: 10}}
                                aria-label="search"
                                onClick={() => this.editLaporan(row)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                type="submit"
                                style={{padding: 10}}
                                aria-label="search"
                                onClick={() => this.deleteLaporanAkhir(row.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
                <Pagination
                  style={{textAlign: 'center'}}
                  limit={10}
                  offset={this.state.offset}
                  total={100}
                  page={1}
                  onClick={(e, offset, page) => this.handleClick(offset, page)}
                />
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default LaporanAkhir;
