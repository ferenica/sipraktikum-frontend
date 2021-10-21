import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import {styled} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';

const StyledFormControlLabel = styled(FormControlLabel)({
  label: {
    fontSize: '14px',
  },
});

const Filter = (props) => {
  return (
    <StyledFormControlLabel
      control={
        <Checkbox
          data-testid={props.value.nama}
          name={props.value.nama}
          onChange={props.checkboxHandler}
          checked={props.value.isChecked}
        />}
      label={props.value.nama}
      key={props.index}
    />
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.object,
  checkboxHandler: PropTypes.func,
  index: PropTypes.number,
};
