import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import React, {useState} from 'react';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

export default function DatePicker(props) {
  // const [handleDateChange] = useState({
  //   // new Date()
  //   date: props.deadline,
  // });
  const [selectedDate, handleDateChange] = useState(new Date(props.deadline));
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          id='deadline'
          name='deadline'
          value={selectedDate}
          onChange={handleDateChange}
          label='Deadline'
          ampm={false}
          format='dd-MM-yyyy HH:mm'
          // disablePast
          showTodayButton
        />
      </MuiPickersUtilsProvider>
    </>
  );
}
