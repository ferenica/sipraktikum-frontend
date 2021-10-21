import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/styles';

const CustomTextField = withStyles({
  root: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: '#404852',
    },
  },
})(TextField);

function RenderTextField({input, label, meta: {touched, error}, ...custom}) {
  return (
    <>
      <CustomTextField
        placeholder=""
        label={label}
        {...input}
        {...custom}
        margin="normal"
        disabled
      />
    </>
  );
}

export default RenderTextField;
