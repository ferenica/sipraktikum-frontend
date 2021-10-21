import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import KelolaDialog from '../KelolaDialog/KelolaDialog.js';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = (theme) => ({
  root: {
    paddingLeft: theme.spacing(3), paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(3), paddingBottom: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
  },
  formLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '4vh',
    marginBottom: '1.1vh',
  },
  formControl: {
    backgroundColor: '#F5F6F8',
    borderColor: 'rgb(255, 156, 81)',
  },
});

class FilterLaporan extends Component {
  constructor(props) {
    super(props);
    this.nowYear = new Date().getFullYear();
    this.BATAS_TAHUN_AWAL = 1999;
  }

  UNSAFE_componentWillMount() {
    this.getFilterAPI();
    const years = [];
    for (let i=this.nowYear; i> this.BATAS_TAHUN_AWAL; i--) {
      years.push(i);
    }
    this.setState({listTahun: years});
  }

  getFilterAPI = () => {
    axios.all([
      axios.get('http://ppl-berkah-backend.herokuapp.com/api/v1/institusi/'),
      axios.get('http://ppl-berkah-backend.herokuapp.com/api/v1/tema/'),
    ])
        .then(axios.spread((...responses) => {
          this.setState({
            listInstitusi: responses[0].data,
            listTema: responses[1].data,
          });
        }));
  }

  state = {
    tema: '', institusi: '', tahun: '',
    listTema: [], listInstitusi: [], listTahun: [],
    typeKelola: '', openKelola: false,
  }

  handleOpenTema = () => {
    this.setState({openKelola: true, typeKelola: 'tema'});
  }

  handleOpenInstitusi = () => {
    this.setState({openKelola: true, typeKelola: 'institusi'});
  }

  closeKelola = () => {
    this.setState({openKelola: false, typeKelola: ''});
    this.getFilterAPI();
  }

  handleChange_tema = (event) => {
    if (event.target.value === '+') {
      this.handleOpenTema();
    } else {
      this.setState({tema: event.target.value}, () => {
        this.props.temaLaporan(this.state.tema);
      });
    }
  };

  handleChange_institusi = (event) => {
    if (event.target.value === '+') {
      this.handleOpenInstitusi();
    } else {
      this.setState({institusi: event.target.value}, () => {
        this.props.institusiLaporan(this.state.institusi);
      });
    }
  };

  handleChange_tahun = (event) => {
    this.setState({tahun: event.target.value}, () => {
      this.props.tahunLaporan(this.state.tahun);
    });
  };

  render() {
    const {classes} = this.props;
    const temaItems = this.state.listTema.map((single) => {
      return <MenuItem key={single.id} value={single.id}>{single.nama}</MenuItem>;
    });
    const institusiItems = this.state.listInstitusi.map((single) => {
      return <MenuItem key={single.id} value={single.id}>{single.nama}</MenuItem>;
    });
    const tahunItems = this.state.listTahun.map((single) => {
      return <MenuItem key={single} value={single}>{single}</MenuItem>;
    });

    return (
      <div className={classes.root}>
        <div className={classes.formLabel}>Tema</div>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select id="select"
            value={this.state.tema}
            onChange={this.handleChange_tema}
            displayEmpty
            className= {classes.selectEmpty}
            inputProps={{'aria-label': 'Without label'}}
          >
            {/* daftar pilihan filter */}
            <MenuItem value="">Semua Tema</MenuItem>
            {temaItems}
            <MenuItem value="+"> Kelola <EditIcon fontSize="small"/></MenuItem>
          </Select>
        </FormControl>

        <div className={classes.formLabel}>Jenis Institusi</div>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select id="select"
            value={this.state.institusi}
            onChange={this.handleChange_institusi}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{'aria-label': 'Without label'}}
          >
            {/* daftar pilihan filter */}
            <MenuItem value="">Semua Institusi</MenuItem>
            {institusiItems}
            <MenuItem value="+">Kelola <EditIcon fontSize="small"/></MenuItem>
          </Select>
        </FormControl>

        <div className={classes.formLabel}>Tahun</div>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select id="select"
            value={this.state.tahun}
            onChange={this.handleChange_tahun}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{'aria-label': 'Without label'}}
          >
            {/* daftar pilihan filter */}
            <MenuItem value="">Semua Tahun</MenuItem>
            {tahunItems}
          </Select>
        </FormControl>
        {this.state.openKelola &&
        <KelolaDialog
          id="KelolaDialog"
          closeKelola={this.closeKelola}
          open={this.state.openKelola}
          dataKelola={{dataTema: this.state.listTema, dataInstitusi: this.state.listInstitusi}}
          type={this.state.typeKelola}
        />
        }
      </div>
    );
  }
}

export default withStyles(useStyles)(FilterLaporan);
