import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const CustomButton = withStyles({
  root: {
    'boxShadow': 'none',
    'textTransform': 'none',
    // fontStyle: "Nunito Sans",
    'fontSize': 14,
    'padding': '8.5px 18px',
    'border': '1px solid',
    'lineHeight': 1,
    'color': '#FF8326',
    'backgroundColor': 'white',
    'borderColor': '#FF8326',
    'transition': '0.1s',
    '&:hover': {
      backgroundColor: '#FF8326',
      color: 'white',
      boxShadow: 'none',
    },
  },
})(Button);
/**
 *
 */
class ButtonKelolaKategori extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [{id: -1, nama: ''}],
      selected: {id: -1, nama: ''},
      inputVal: '',
      openKategori: false,
      openInstitusi: false,
      openTema: false,
      changed: false,
      openTambahInstitusi: false,
      openHapusInstitusi: false,
      openTambahTema: false,
      openHapusTema: false,
    };
  }
  /**
   *
   */
  getData() {
    console.log(this.props.type);
    console.log('uw');
    const type = this.props.type;

    if (type === 'tema') {
      axios.get('http://ppl-berkah-backend.herokuapp.com/api/v1/tema/')
          .then((res) => {
            this.setState({
              data: res.data});
          });
    } else if (type === 'institusi') {
      axios.get('http://ppl-berkah-backend.herokuapp.com/api/v1/institusi/')
          .then((res) => {
            this.setState({
              data: res.data});
          });
    }
  }
  /**
   *
   */
  componentDidMount() {
    this.getData();
  }

  /**
   *
   */
  deleteToBackend() {
    const type = this.props.type;

    let base_url = '';

    if (type === 'tema') {
      base_url = 'http://ppl-berkah-backend.herokuapp.com/api/v1/tema/';
    } else if (type === 'institusi') {
      base_url = 'http://ppl-berkah-backend.herokuapp.com/api/v1/institusi/';
    }

    axios.delete(base_url + this.state.selected.id + '/')
        .then(window.location.href='/');
  }

  /**
   *
   */
  postToBackend() {
    const data = {
      nama: this.state.inputVal,
    };

    const type = this.props.type;

    let base_url = '';

    if (type === 'tema') {
      base_url = 'http://ppl-berkah-backend.herokuapp.com/api/v1/tema/';
    } else if (type === 'institusi') {
      base_url = 'http://ppl-berkah-backend.herokuapp.com/api/v1/institusi/';
    }

    if (this.state.selected.nama === '') {
      axios.post(base_url, data)
          .then(window.location.href='/');
    } else {
      axios.put(base_url + this.state.selected.id + '/', data)
          .then(window.location.href='/');
    }
  }

  /**
   *
   */
  handleOpenKategori() {
    console.log('tes');

    console.log(this.props.type);
    console.log('dah');

    this.setState({openKategori: true});
  }
  /**
   *
   */
  handleCloseKatagori() {
    this.setState({openKategori: false});
  }
  /**
   *
   */
  handleOpenInstitusi() {
    this.setState({openInstitusi: true});
  }
  /**
   *
   */
  handleCloseInstitusi() {
    this.setState({openInstitusi: false});
  }
  /**
   *
   */
  handleOpenTambahInstitusi() {
    this.setState({openTambahInstitusi: true});
  }
  /**
   *
   */
  handleCloseTambahInstitusi() {
    this.setState({openTambahInstitusi: false});
    this.postToBackend();
  }
  /**
   *
   */
  handleOpenHapusInstitusi() {
    this.setState({openHapusInstitusi: true});
  }
  /**
   *
   */
  handleCloseHapusInstitusi() {
    this.setState({openHapusInstitusi: false});
  }
  /** */
  handleOpenTema() {
    this.setState({openTema: true});
  }
  /** */
  handleCloseTema() {
    this.setState({openTema: false});
  }
  /** */
  handleOpenTambahTema() {
    this.setState({openTambahTema: true});
  }
  /** */
  handleCloseTambahTema() {
    this.setState({openTambahTema: false});
  }
  /** */
  handleOpenHapusTema() {
    this.setState({openHapusTema: true});
  }
  /** */
  handleCloseHapusTema() {
    this.setState({openHapusTema: false});
  }
  /**
   *
   */
  handleDelete() {
    this.deleteToBackend();
  }

  /**
   *
   */
  render() {
    return (
      <div>
        <CustomButton onClick={this.handleOpenKategori.bind(this)}>
            Kelola Kategori
        </CustomButton>
        <Dialog open={this.state.openKategori} onClose={this.handleCloseKatagori.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Kelola Kategori</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Silakan pilih kategori yang ingin dikelola.
            </DialogContentText>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <CustomButton onClick={this.handleOpenInstitusi.bind(this)}>
                    Kelola Institusi
                </CustomButton>
              </Grid>
              <Grid item xs={6}>
                <CustomButton onClick={this.handleOpenTema.bind(this)}>
                    Kelola Tema
                </CustomButton>
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={this.handleCloseKatagori.bind(this)} color="primary">
                Batal
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <Dialog open={this.state.openInstitusi} onClose={this.handleCloseInstitusi.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Kelola Institusi</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <CustomButton onClick={this.handleOpenTambahInstitusi.bind(this)}>
                    Tambah Baru
                </CustomButton>
              </Grid>
              <Grid item xs={6}>
                <CustomButton onClick={this.handleOpenHapusInstitusi.bind}>
                    Hapus
                </CustomButton>
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={this.handleCloseInstitusi.bind(this)} color="primary">
                Batal
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <Dialog open={this.state.openTambahInstitusi} onClose={this.handleCloseTambahInstitusi.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Tambah Institusi</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Silakan isi dengan institusi baru yang ingin ditambahkan.
            </DialogContentText>
            <TextField
              autoFocus
              value={this.state.inputVal}
              onChange={(event) => this.setState({inputVal: event.target.value})}
              margin="dense"
              id="newIns"
              label="Institusi"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseTambahInstitusi.bind(this)} color="primary">
                Batal
            </Button>
            <Button onClick={this.handleCloseTambahInstitusi.bind(this)} color="primary">
                Simpan
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.openHapusInstitusi} onClose={this.handleCloseHapusInstitusi.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Hapus Institusi</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Tandai institusi yang ingin dihapus.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="newIns"
              label="Institusi"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseHapusInstitusi.bind(this)} color="primary">
                Batal
            </Button>
            <Button onClick={this.handleCloseHapusInstitusi.bind(this)} color="primary">
                Simpan
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.openTema} onClose={this.handleCloseTema.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Kelola Tema</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <CustomButton onClick={this.handleOpenTambahTema.bind(this)}>
                    Tambah Baru
                </CustomButton>
              </Grid>
              <Grid item xs={6}>
                <CustomButton onClick={this.handleOpenHapusTema.bind(this)}>
                    Hapus
                </CustomButton>
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={this.handleCloseTema.bind(this)} color="primary">
                Batal
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <Dialog open={this.state.openTambahTema} onClose={this.handleCloseTambahTema.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Tambah Tema</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Silakan isi dengan tema baru yang ingin ditambahkan.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="newTheme"
              label="Tema"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseTambahTema.bind(this)} color="primary">
                Batal
            </Button>
            <Button onClick={this.handleCloseTambahTema.bind(this)} color="primary">
                Simpan
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.openHapusTema} onClose={this.handleCloseHapusTema.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Hapus Tema</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Tandai tema yang ingin dihapus.
            </DialogContentText>
            <MenuItem value={1} disabled>Pilih {this.props.type}</MenuItem>
            {this.state.data.map((dt) => (
              <MenuItem value={dt}>{dt.nama}</MenuItem>
            ))}
            <MenuItem value={{nama: ''}}>Tambah</MenuItem>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseHapusTema.bind(this)} color="primary">
                Batal
            </Button>
            <Button onClick={this.handleCloseHapusTema.bind(this)} color="primary">
                Simpan
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ButtonKelolaKategori;
