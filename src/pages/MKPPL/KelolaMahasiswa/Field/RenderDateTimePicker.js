import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

function RenderDateTimePicker({
  input, label, meta: {touched, error}, ...custom}) {
  const inputDate = input.value;
  let deadline;
  if (!inputDate || inputDate === '') {
    // const now = new Date();
    deadline = null;
  } else if (typeof inputDate === 'string' || inputDate instanceof String) {
    const deadlineStrTime = 'T' + inputDate.split(' ')[1] + ':00';
    const deadlineStrDate = inputDate
        .split(' ')[0]
        .split('-')
        .reverse()
        .join('-');
    deadline = new Date(deadlineStrDate + deadlineStrTime);
  } else {
    deadline = inputDate;
  }

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          {...input}
          {...custom}
          margin="normal"
          value={deadline}
          type="text"
          onChange={input.onChange}
          label={label}
          format="dd-MM-yyyy HH:mm"
          showTodayButton
          clearable
          placeholder={!deadline ? 'Tentukan deadline' : deadline}
          // disablePast
        />
      </MuiPickersUtilsProvider>
      {touched && error && <p style={{color: '#F24848'}}>{error}</p>}
    </>
  );
}

export default RenderDateTimePicker;
