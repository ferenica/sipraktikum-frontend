import React, {Component} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

/**
 *
 */
class KelolaDialog extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [{id: -1, nama: ''}],
      // open: false,
      selected: {id: -1, nama: ''},
      changed: false,
      inputVal: '',
    };
  }

  /**
   *
   */
  getData() {
    const type = this.props.type;

    if (type === 'tema') {
      this.setState({data: this.props.dataKelola.dataTema});
    } else if (type === 'institusi') {
      this.setState({data: this.props.dataKelola.dataInstitusi});
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

    fetch(base_url + this.state.selected.id + '/', {method: 'DELETE', headers: {
      'Content-Type': 'application/json',
    }} ).then(this.handleRedirect);
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
      fetch(base_url, {method: 'POST', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(data)} ).then(this.handleRedirect);
    } else {
      fetch(base_url + this.state.selected.id + '/', {method: 'PUT', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(data)}).then(this.handleRedirect);
    }
  }

  handleRedirect = (res) => {
    if (res.status === 201 || res.status === 204) {
      this.handleClose();
    } else {
      // console.log(res)
      this.handleClose();
    }
  }

  handleClose() {
    //this.setState({inputVal: '', selected: {id: 0, nama: ''}, changed: false});

    // this.setState({ open: false })
    //this.props.closeKelola();
  }

  handleOpen() {
    // console.log(this.state.inputVal, this.state.selected, this.state.changed)
    this.setState({inputVal: '', selected: {id: 0, nama: ''}, changed: false});
    this.getData();
    // this.setState({ open: true })
  }

  handleSimpan() {
    console.log('kepanggil');
    //this.postToBackend();
  }

  handleDelete() {
    this.deleteToBackend();
  }

  render() {
    return (
      <div>
        <Dialog id='MainDialog' fullWidth={true} maxWidth={'xs'} onEnter={this.handleOpen.bind(this)} onClose={this.handleClose.bind(this)}
          aria-labelledby="simple-dialog-title" open={this.props.open}>
          <DialogTitle id="simple-dialog-title">Kelola {this.props.type}</DialogTitle>
          <center>
            <FormControl style={{width: 200, margin: 20, backgroundColor: '#F5F6F8', borderColor: 'rgb(255, 156, 81)'}} variant="outlined">
              <Select id="selectOption"
                displayEmpty
                onChange={(event) =>
                  this.setState({selected: event.target.value, changed: true, inputVal: event.target.value.nama})}
                defaultValue={1}
              >
                <MenuItem value={1} disabled>Pilih {this.props.type}</MenuItem>
                {this.state.data.map((dt) => (
                  <MenuItem key={dt.id} value={dt}>{dt.nama}</MenuItem>
                ))}
                <MenuItem value={{nama: ''}}><AddIcon/>Tambah</MenuItem>
              </Select>
            </FormControl>
          </center>
          <div style={{display: this.state.changed ? ('block') : ('none')}}>
            <center>
              <Paper style={{width: 200, backgroundColor: '#F2F2F2'}}>
                <InputBase id="inputBase"
                  style={{fontSize: 14, width: 200}}
                  placeholder={'Masukkan ' + this.props.type + ' Baru'}
                  value={this.state.inputVal}
                  inputProps={{'aria-label': 'Masukkan ' + this.props.type + ' Baru', 'style': {textAlign: 'center'}}}
                  onChange={(event) => this.setState({
                    inputVal: event.target.value,
                  })}
                />
              </Paper>
              <IconButton style={{display: this.state.selected.nama === '' ? ('none') : ('block')}}
                onClick={this.handleDelete.bind(this)} id="deleteBtn">
                <DeleteIcon/>
              </IconButton>
            </center>
          </div>
          <div style={{textAlign: 'right', marginTop: 20, marginRight: 20, marginBottom: 20}}>
            <Button
              variant="contained"
              color='primary'
              id="simpanBtn"
              onClick={this.handleSimpan}>
              Simpan
            </Button>
            <Button
              variant="contained"
              color='primary'
              id="batalBtn"
              onClick={this.handleClose}>
              Batal
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default KelolaDialog;
