import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    height: 40,
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: '5px',
  },
}));

export default function Option(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.defaultValue);

  const handleChange = (event) => {
    setValue(event.target.value);
    alert(event.target.value);
    // this.props.defaultValue(event.target.value);
  };

  return (
    <div>
      <label>{props.label}</label>
      <FormControl className={classes.formControl}>
        <Select
          value={value}
          onChange={handleChange}
          disableUnderline
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{'aria-label': 'Without label'}}
        >
          {/* <MenuItem value="" disabled>
            <em>{props.defaultValue}</em>
          </MenuItem> */}
          {props.items.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

Option.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
};

