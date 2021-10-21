import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import '../StatistikPage.css';

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
    // backgroundColor: "#F5F6F8",
    backgroundColor: 'white',
    color: '#FF9C51',
    borderColor: '#FF9C51',
    marginBottom: '1.1vh',
  },
  tambahButton: {
    color: 'rgb(255, 156, 81)',
    fontWeight: 'bold',
    borderColor: '#FF9C51',
  },
});
/**
 *
 */
class FilterStatistik extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.nowYear = new Date().getFullYear();
    this.BATAS_TAHUN_AWAL = 2019;

    this.BATAS_TOTAL_TAHUN = 3;
  }

  /**
   *
   */
  UNSAFE_componentWillMount() {
    const years = [];
    for (let i=this.nowYear; i>=this.BATAS_TAHUN_AWAL; i--) {
      years.push(i);
    }
    this.setState({listTahun: years, chosenTahun: [this.nowYear]});
  }


  state = {
    category: 'Jenis Institusi',
    listTahun: [], chosenTahun: [],
    formTahunIdx: [],
  }

  handleChange_category = (event) => {
    this.setState({category: event.target.value}, () => {
      this.props.kategoriStatistik(this.state.category);
    });
  };

  handleChange_tahun = (event, tahunindex) => {
    const tempChosen = this.state.chosenTahun.slice();
    tempChosen[tahunindex] = event.target.value;
    this.setState({chosenTahun: tempChosen}, () => {
      this.props.tahunStatistik(this.state.chosenTahun);
    });
  };

  newTahunForm = (_event, index) => {
    // let newTahunVal = this.nowYear;
    // while (this.state.chosenTahun.includes(newTahunVal)) { newTahunVal-- }
    this.setState({
      chosenTahun: [...this.state.chosenTahun, ''],
      formTahunIdx: [...this.state.formTahunIdx, index],
    }, () => this.props.tahunStatistik(this.state.chosenTahun));
  }

  delTahunForm = (_event, index) => {
    this.setState({
      chosenTahun: this.state.chosenTahun.filter((tahun) =>
        tahun !== this.state.chosenTahun[index]),
      formTahunIdx: this.state.formTahunIdx.filter((tahunIdx) =>
        tahunIdx !== this.state.formTahunIdx[index-1]),
    }, () => this.props.tahunStatistik(this.state.chosenTahun));
  }

  /**
   *
   */
  render() {
    const {classes} = this.props;

    const tahunItems = this.state.listTahun.map((aYear) => {
      if (this.state.chosenTahun.includes(aYear)) {
        return <MenuItem disabled key={aYear} value={aYear}>{aYear}</MenuItem>;
      }
      return <MenuItem key={aYear} value={aYear}>{aYear}</MenuItem>;
    });

    return (
      <div className={classes.root}>
        <div className={classes.formLabel}>Berdasarkan</div>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select id="select"
            value={this.state.category}
            onChange={this.handleChange_category}
            displayEmpty
            className= {classes.selectEmpty}
            inputProps={{'aria-label': 'Without label'}}
          >
            {/* daftar pilihan filter */}
            <MenuItem value={'Jenis Institusi'}>Jenis Institusi</MenuItem>
            <MenuItem value={'Tema'}>Tema</MenuItem>
          </Select>
        </FormControl>

        <div className={classes.formLabel}>Tahun</div>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select id="select"
            value={this.state.chosenTahun[0]}
            onChange={(e) => this.handleChange_tahun(e, 0)}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{'aria-label': 'Without label'}}
          >
            {/* daftar pilihan filter */}
            {tahunItems}
          </Select>
        </FormControl>

        {/* tambahan filter Tahun */}
        {this.state.formTahunIdx.map((idxTahun) => {
          return (
            <FormControl variant="outlined" className={classes.formControl} key={idxTahun}>
              <Select id="selectTahun"
                value={this.state.chosenTahun[idxTahun]}
                onChange={(e) => this.handleChange_tahun(e, idxTahun)}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{'aria-label': 'Without label'}}
              >
                {/* daftar pilihan filter */}
                <MenuItem disabled value={''}>Pilih tahun..</MenuItem>
                {tahunItems}
              </Select>
            </FormControl>
          );
        })}

        <Grid container spacing={1}>
          <Grid className="MuiGrid-root MuiGrid-item btnGrid" style={{justifyContent: 'start'}}>
            {(this.state.chosenTahun.length > 1) &&
            <Button className={classes.tambahButton} id="KurangiBtn"
              onClick={(e) => this.delTahunForm(e, this.state.chosenTahun.length-1)}
            >
              <RemoveIcon />
            </Button>
            }
          </Grid>
          <Grid className="MuiGrid-root MuiGrid-item emptyGrid"/>
          <Grid className="MuiGrid-root MuiGrid-item btnGrid">
            {(this.state.chosenTahun.length < this.BATAS_TOTAL_TAHUN) &&
            <Button className={classes.tambahButton} id="TambahBtn"
              onClick={(e) => this.newTahunForm(e, this.state.chosenTahun.length)}
            >
              <AddIcon />
            </Button>
            }
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default withStyles(useStyles)(FilterStatistik);
