import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/styles';

const URL = 'http://ppl-berkah-backend.herokuapp.com/api/v1/supervisor-lembaga/';

// Styles for Select Component
const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    height: 36,
    minWidth: 120,
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: '5px',
  },
});

// Class for Option Supervisor Lembaga
class OptionSupervisorLembaga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      daftarUsername: [],
      username: this.props.value,
    };
  }
  async componentDidMount() {
    axios.get(URL + this.props.namaLembaga).then((res) => {
      const daftarUsername = res.data;
      this.setState({
        daftarUsername,
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
    console.log(this.props.namaLembaga);
    const {classes, input, meta: {touched, error}} = this.props;
    const {daftarUsername, username} = this.state;

    return (
      <div>
        <h6>Username Supervisor Lembaga</h6>
        <FormControl className={classes.formControl}>
          <Select
            labelId="select-username-lembaga-label"
            id="select-username-lembaga"
            name="usernameSupervisorLembaga"
            value={username}
            onChange={this.handleChange.bind(this)}
            disableUnderline
            displayEmpty
            {...input}
          >
            <MenuItem disabled value="">
              <em>Pilih username supervisor lembaga</em>
            </MenuItem>
            {daftarUsername.map((item, index) => (
              <option key={index} value={item.nama}>
                {item.nama}
              </option>
            ))}
          </Select>
          {touched && error && <span>{error}</span>}
        </FormControl>
        <FormHelperText>
          Supervisor Lembaga akan mendapat notifikasi undangan setelah mereka dipilih
        </FormHelperText>
      </div>
    );
  }
}
OptionSupervisorLembaga.propTypes = {
  classes: PropTypes.object.isRequired,
  returnValue: PropTypes.string,
  value: PropTypes.string,
};
export default withStyles(styles)(OptionSupervisorLembaga);
