import React, {Component} from 'react';
import axios from 'axios';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/styles';

const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/lembaga/';

// Styles for Select Component
const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    height: 40,
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: '5px',
  },
});

// Class for Option Lembaga
class OptionLembaga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      daftarLembaga: [],
      idLembaga: this.props.value,
    };
  }
  async componentDidMount() {
    axios.get(URL).then((res) => {
      const daftarLembaga = res.data;
      this.setState({
        daftarLembaga,
        isLoaded: true,
      });
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error,
      });
    },
    );
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({...this.state, [event.target.name]: event.target.value});
    this.props.returnValue(event.target.value);
  }

  render() {
    const {classes} = this.props;
    const {daftarLembaga, idLembaga} = this.state;
    return (
      <div>
        <h6>Nama Lembaga:</h6>
        <FormControl className={classes.formControl}>
          <Select
            labelId="select-nama-lembaga-label"
            id="select-nama-lembaga"
            name="idLembaga"
            value={idLembaga}
            onChange={this.handleChange.bind(this)}
            disableUnderline
            displayEmpty
          >
            <MenuItem disabled value="">
              <em>Pilih nama lembaga</em>
            </MenuItem>
            {daftarLembaga.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.nama}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(OptionLembaga);
