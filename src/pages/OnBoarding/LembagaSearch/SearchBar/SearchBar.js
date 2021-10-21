import React from 'react';
import PropTypes from 'prop-types';

import {styled} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {ImSearch} from 'react-icons/im';

const StyledTextField = styled(TextField)({
  width: '80%',
  backgroundColor: 'white',
  margin: '8px',
});

const StyledInputAdornment = styled(InputAdornment)({
  height: '15px',
  alignItems: 'normal',
});

const SearchBar = (props) => {
  return (
    <StyledTextField
      id="search-bar"
      variant="outlined"
      placeholder='Cari nama lembaga'
      size="small"
      value={props.value}
      onChange={props.searchHandler}
      InputProps={{
        startAdornment: <StyledInputAdornment position="start">
          <ImSearch color='#FF8326'/>
        </StyledInputAdornment>,
      }}>
    </StyledTextField>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  value: PropTypes.string,
  searchHandler: PropTypes.func,
};
